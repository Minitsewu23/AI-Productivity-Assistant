import { useState, useRef, useEffect } from "react";
import {
  MessageCircle,
  X,
  Send,
  Crown,
  Sparkles,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import { SALON_INFO, SERVICES, ALL_SERVICE_NAMES, BEAUTY_TIPS } from "@/lib/salon-data";

interface Message {
  role: "user" | "assistant";
  text: string;
}

function getAssistantReply(input: string): string {
  const q = input.toLowerCase();

  // Greetings
  if (/^(hi|hello|hey|good morning|good afternoon|good evening)/.test(q)) {
    return `Hi there! 👋 Welcome to ${SALON_INFO.name}. I'm your AI beauty assistant. I can help you with services, prices, branches, operating hours, and booking. What can I do for you today?`;
  }

  // Pricing
  if (/(price|cost|how much|pricing|rate)/.test(q)) {
    if (q.includes("braid")) {
      return `Our braids start from R250 for cornrows. Box braids from R900, knotless braids from R1,200, tribal braids from R1,000, Fulani braids from R950, soft locs from R1,600, and passion twists from R1,400. Would you like me to help you book?`;
    }
    if (q.includes("makeup") || q.includes("make up")) {
      return `Makeup pricing: Soft Glam R500, Full Glam R700, Bridal Makeup R1,500, Graduation/Birthday Makeup R650, Traditional Wedding Makeup from R1,800. Need a bridal quote?`;
    }
    if (q.includes("nail")) {
      return `Nail services: Gel Polish R250, Gel Nails R450, Acrylic Full Set R500, Luxury Manicure R300, Luxury Pedicure R400, Nail Art from R80.`;
    }
    if (q.includes("hair") && !q.includes("braid")) {
      return `Hair services: Hair Wash R120, Blow Dry R250, Ladies Cut R300, Men's Cut R180, Silk Press R450, Hair Colour from R850, Brazilian Treatment from R1,200, Keratin from R1,500, Hair Botox from R1,600, Wig Installation R700, Wig Revamp R900.`;
    }
    if (q.includes("lash")) {
      return `Lash services: Classic Lashes R500, Hybrid R650, Russian Volume R800, Mega Volume R950, Lash Lift R450.`;
    }
    if (q.includes("facial")) {
      return `Facials: Basic R450, Deep Cleansing R650, Hydrating R700, Brightening R800, Acne R850, Chemical Peel R1,200.`;
    }
    if (q.includes("wax")) {
      return `Waxing: Eyebrows R80, Lip R60, Underarms R150, Half Leg R250, Full Leg R400, Brazilian Wax R450.`;
    }
    return `You can browse our full price list on the Pricing section. Prices start from R60 (lip wax) to R1,800+ (traditional wedding makeup). Which service are you interested in?`;
  }

  // Services
  if (/(service|offer|do you|what do|menu|treatment)/.test(q)) {
    return `We offer hair services, braiding, makeup, nails, lash extensions, facials, waxing, and bridal packages. We cater to women, men, and children. Which category would you like to explore?`;
  }

  // Specific service lookup
  for (const name of ALL_SERVICE_NAMES) {
    const lowerName = name.toLowerCase();
    if (q.includes(lowerName)) {
      for (const group of SERVICES) {
        const item = group.items.find((i) => i.name === name);
        if (item) {
          return `${item.name} is priced at ${item.price} under our ${group.category} services. Would you like to book this treatment?`;
        }
      }
    }
  }

  // Branches / locations
  if (/(branch|location|where|address|find you|situated)/.test(q)) {
    return `We have two branches across Cape Town: Cape Town CBD and Bellville. Which branch is most convenient for you?`;
  }

  // Hours
  if (/(hour|open|time|when|close|operating)/.test(q)) {
    return `We're open Monday–Friday 08:00–18:00, Saturday 08:00–17:00, Sunday 09:00–15:00, and Public Holidays 09:00–14:00.`;
  }

  // Booking / appointment
  if (/(book|appointment|reserve|slot|schedule)/.test(q)) {
    return `You can book by emailing us at ${SALON_INFO.email}, calling ${SALON_INFO.phone}, or chatting on WhatsApp at ${SALON_INFO.whatsapp}. You can also fill in the booking form on this page — it will open your email app with all the details ready to send.`;
  }

  // Contact
  if (/(contact|phone|email|whatsapp|call)/.test(q)) {
    return `Reach us at ${SALON_INFO.phone}, WhatsApp ${SALON_INFO.whatsapp}, or email ${SALON_INFO.email}. We can't wait to pamper you!`;
  }

  // Bridal
  if (/(bridal|wedding|bridesmaid|bride)/.test(q)) {
    return `We offer bespoke bridal packages including bridal hair, bridal makeup, bridesmaids hair & makeup, mother-of-the-bride styling, touch-ups, and wedding consultations. Bridal makeup is R1,500 and traditional wedding makeup starts from R1,800. Email us for a custom bridal quote.`;
  }

  // Beauty tips
  if (/(tip|advice|recommend|prepare|before)/.test(q)) {
    const tip = BEAUTY_TIPS[Math.floor(Math.random() * BEAUTY_TIPS.length)];
    return tip ?? "Book your colour or chemical treatment at least 48 hours before a big event for the best results.";
  }

  // Fallback
  return `I'm happy to help with that! For the most accurate answer, feel free to email us at ${SALON_INFO.email} or call ${SALON_INFO.phone}. You can also ask me about our services, prices, branches, or hours.`;
}

export function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: `Hi, I'm your Glam House beauty assistant! 👑 I can tell you about our services, prices, branches, and hours — or help you book. How may I assist you?`,
    },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  const sendMessage = () => {
    const text = input.trim();
    if (!text) return;

    const userMsg: Message = { role: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    setTimeout(() => {
      const reply: Message = {
        role: "assistant",
        text: getAssistantReply(text),
      };
      setMessages((prev) => [...prev, reply]);
    }, 400);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 w-[90vw] max-w-sm overflow-hidden rounded-2xl border border-border bg-card shadow-2xl sm:w-96">
          <div className="flex items-center justify-between bg-primary px-5 py-4">
            <div className="flex items-center gap-2">
              <Crown className="h-5 w-5 text-primary-foreground" />
              <span className="font-semibold text-primary-foreground">
                Glam House Assistant
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-full p-1 text-primary-foreground/80 transition-colors hover:bg-primary-foreground/10 hover:text-primary-foreground"
              aria-label="Close chat"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div
            ref={scrollRef}
            className="h-80 space-y-4 overflow-y-auto bg-background/50 p-4"
          >
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "rounded-br-none bg-primary text-primary-foreground"
                      : "rounded-bl-none bg-card text-card-foreground shadow-sm"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-border bg-card p-3">
            <div className="flex items-center gap-2 rounded-xl border border-input bg-background px-3 py-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about services, prices, or booking..."
                className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
              />
              <button
                onClick={sendMessage}
                className="rounded-lg bg-primary p-2 text-primary-foreground transition-colors hover:bg-primary/90"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              <QuickChip
                icon={<Sparkles className="h-3 w-3" />}
                label="Services"
                onClick={() => {
                  setInput("What services do you offer?");
                  setMessages((prev) => [
                    ...prev,
                    { role: "user", text: "What services do you offer?" },
                    {
                      role: "assistant",
                      text: getAssistantReply("What services do you offer?"),
                    },
                  ]);
                }}
              />
              <QuickChip
                icon={<MapPin className="h-3 w-3" />}
                label="Branches"
                onClick={() => {
                  setInput("Where are your branches?");
                  setMessages((prev) => [
                    ...prev,
                    { role: "user", text: "Where are your branches?" },
                    {
                      role: "assistant",
                      text: getAssistantReply("Where are your branches?"),
                    },
                  ]);
                }}
              />
              <QuickChip
                icon={<Mail className="h-3 w-3" />}
                label="Book"
                onClick={() => {
                  setInput("How do I book an appointment?");
                  setMessages((prev) => [
                    ...prev,
                    { role: "user", text: "How do I book an appointment?" },
                    {
                      role: "assistant",
                      text: getAssistantReply("How do I book an appointment?"),
                    },
                  ]);
                }}
              />
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl shadow-primary/30 transition-transform hover:scale-105 active:scale-95"
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
      </button>
    </div>
  );
}

function QuickChip({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1 rounded-full border border-border bg-background px-2.5 py-1 text-xs font-medium text-foreground transition-colors hover:bg-secondary"
    >
      {icon}
      {label}
    </button>
  );
}
