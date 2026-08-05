import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useServerFn } from "@tanstack/react-start";
import {
  FileText,
  ListChecks,
  BookOpen,
  MessageCircle,
  Send,
  Loader2,
  Crown,
} from "lucide-react";
import { generateSalonToolOutput } from "@/lib/salon-ai.functions";

type TabKey = "meeting" | "planner" | "research" | "chat";

const TABS: {
  key: TabKey;
  label: string;
  icon: React.ReactNode;
  blurb: string;
  placeholder: string;
}[] = [
  {
    key: "meeting",
    label: "Meeting Notes Summarizer",
    icon: <FileText className="h-4 w-4" />,
    blurb:
      "Paste raw notes from a staff or branch meeting and get a clean summary with decisions and action items.",
    placeholder:
      "e.g. Monday branch meeting, Bellville. Thandi says knotless braid bookings up. Need more braiding hair stock. Lash tech off next week...",
  },
  {
    key: "planner",
    label: "AI Task Planner",
    icon: <ListChecks className="h-4 w-4" />,
    blurb:
      "Describe your goal or dump your to-do list and receive a prioritised salon operations plan.",
    placeholder:
      "e.g. Prepare all three branches for matric ball season in 6 weeks — staffing, stock, promos and bridal packages.",
  },
  {
    key: "research",
    label: "AI Research Assistant",
    icon: <BookOpen className="h-4 w-4" />,
    blurb:
      "Ask about beauty trends, treatments, products or the Cape Town market and see how to apply it in-salon.",
    placeholder:
      "e.g. What is hair botox, who is it best for, and how should we position it against keratin?",
  },
  {
    key: "chat",
    label: "AI Chatbot Interface",
    icon: <MessageCircle className="h-4 w-4" />,
    blurb:
      "Chat live with the Majesty business assistant about services, prices, branches and bookings.",
    placeholder: "Ask about services, prices, branches or booking...",
  },
];

export function AiTools() {
  const [active, setActive] = useState<TabKey>("meeting");
  const activeTab = TABS.find((t) => t.key === active)!;

  return (
    <section id="ai-tools" className="bg-background py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            AI Suite
          </p>
          <h2 className="mt-3 text-4xl font-bold text-foreground sm:text-5xl">
            Your Majesty AI assistants
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Four intelligent assistants built for the salon — for the team
            behind the chair and the clients in it.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActive(tab.key)}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                active === tab.key
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                  : "border border-border bg-card text-card-foreground hover:bg-secondary"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
          <p className="mb-6 text-sm text-muted-foreground">
            {activeTab.blurb}
          </p>
          {active === "chat" ? (
            <SalonChat placeholder={activeTab.placeholder} />
          ) : (
            <ToolPanel
              key={active}
              tool={active}
              placeholder={activeTab.placeholder}
            />
          )}
        </div>
      </div>
    </section>
  );
}

function ToolPanel({
  tool,
  placeholder,
}: {
  tool: "meeting" | "planner" | "research";
  placeholder: string;
}) {
  const run = useServerFn(generateSalonToolOutput);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRun = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setLoading(true);
    setError("");
    setOutput("");
    try {
      const result = (await run({ data: { tool, input: text } })) as {
        text: string;
        error?: string;
      };
      if (result.error) setError(result.error);
      else setOutput(result.text);
    } catch {
      setError("Something went wrong reaching the assistant. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div>
        <textarea
          rows={12}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeholder}
          className="w-full resize-none rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition-all focus:ring-2 focus:ring-ring"
        />
        <button
          onClick={handleRun}
          disabled={loading || !input.trim()}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Working on it...
            </>
          ) : (
            "Generate with AI"
          )}
        </button>
      </div>

      <div className="min-h-64 rounded-xl border border-border bg-background/60 p-5">
        {error ? (
          <p className="text-sm text-destructive">{error}</p>
        ) : output ? (
          <div className="prose prose-sm max-w-none text-foreground prose-headings:text-foreground prose-strong:text-foreground prose-a:text-primary">
            <ReactMarkdown>{output}</ReactMarkdown>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            Your AI result will appear here.
          </p>
        )}
      </div>
    </div>
  );
}

function SalonChat({ placeholder }: { placeholder: string }) {
  const [input, setInput] = useState("");
  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });
  const busy = status === "submitted" || status === "streaming";

  const handleSend = async () => {
    const text = input.trim();
    if (!text || busy) return;
    setInput("");
    await sendMessage({ text });
  };

  return (
    <div>
      <div className="max-h-96 min-h-64 space-y-4 overflow-y-auto rounded-xl border border-border bg-background/60 p-5">
        {messages.length === 0 && (
          <div className="flex items-start gap-3 text-sm text-muted-foreground">
            <Crown className="mt-0.5 h-4 w-4 text-primary" />
            <p>
              Hi, I&apos;m your Majesty business assistant. Ask me about
              services, prices, branches, hours or how to book.
            </p>
          </div>
        )}
        {messages.map((message) => {
          const text = message.parts
            .map((part) => (part.type === "text" ? part.text : ""))
            .join("");
          if (!text) return null;
          return (
            <div
              key={message.id}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {message.role === "user" ? (
                <div className="max-w-[85%] rounded-2xl rounded-br-none bg-primary px-4 py-3 text-sm text-primary-foreground">
                  {text}
                </div>
              ) : (
                <div className="prose prose-sm max-w-none text-foreground prose-headings:text-foreground prose-strong:text-foreground prose-a:text-primary">
                  <ReactMarkdown>{text}</ReactMarkdown>
                </div>
              )}
            </div>
          );
        })}
        {status === "submitted" && (
          <p className="animate-pulse text-sm text-muted-foreground">
            Thinking...
          </p>
        )}
        {error && (
          <p className="text-sm text-destructive">
            The assistant is unavailable right now. Please try again shortly.
          </p>
        )}
      </div>

      <div className="mt-4 flex items-center gap-2 rounded-xl border border-input bg-background px-4 py-2.5">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              void handleSend();
            }
          }}
          placeholder={placeholder}
          className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
        />
        <button
          onClick={() => void handleSend()}
          disabled={busy || !input.trim()}
          aria-label="Send message"
          className="rounded-lg bg-primary p-2 text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
        >
          {busy ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </button>
      </div>
    </div>
  );
}
