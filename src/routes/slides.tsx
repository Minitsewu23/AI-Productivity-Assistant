import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect } from "react";
import { z } from "zod";
import { ScaledSlide } from "@/components/slides/ScaledSlide";
import { SLIDES } from "@/components/slides/deck";

export const Route = createFileRoute("/slides")({
  validateSearch: z.object({
    slide: z.number().int().min(1).catch(1),
    print: z.boolean().optional().catch(undefined),
  }),
  head: () => ({
    meta: [
      { title: "Ponxo's Glam House | Business Presentation" },
      {
        name: "description",
        content:
          "An eight-slide presentation covering Ponxo's Glam House services, pricing, branches, and booking details in Cape Town.",
      },
      { property: "og:title", content: "Ponxo's Glam House | Business Presentation" },
      {
        property: "og:description",
        content:
          "Services, pricing, branches, and booking details for Ponxo's Glam House, Cape Town's luxury beauty destination.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Ponxo's Glam House | Business Presentation" },
      {
        name: "twitter:description",
        content: "An eight-slide overview of Ponxo's Glam House in Cape Town.",
      },
    ],
  }),
  component: SlidesPage,
});

function SlidesPage() {
  const { slide, print } = Route.useSearch();
  const navigate = Route.useNavigate();
  const total = SLIDES.length;
  const index = Math.min(Math.max(slide, 1), total) - 1;
  const current = SLIDES[index]!;

  const go = useCallback(
    (next: number) => {
      const clamped = Math.min(Math.max(next, 1), total);
      navigate({ search: { slide: clamped }, replace: true });
    },
    [navigate, total]
  );

  useEffect(() => {
    document.title = `${index + 1}/${total} — ${current.title} | Ponxo's Glam House`;
  }, [index, total, current.title]);

  useEffect(() => {
    if (print) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") go(index + 2);
      if (e.key === "ArrowLeft") go(index);
      if (e.key === "f" || e.key === "F") {
        if (document.fullscreenElement) void document.exitFullscreen();
        else void document.documentElement.requestFullscreen();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, index, print]);

  if (print) {
    return (
      <div className="bg-background">
        {SLIDES.map(({ id, Component }) => (
          <div key={id} className="print-slide" style={{ width: 1920, height: 1080 }}>
            <Component />
          </div>
        ))}
      </div>
    );
  }

  const Current = current.Component;

  return (
    <div className="flex h-screen flex-col bg-secondary/40">
      <header className="print-hide flex items-center justify-between border-b border-border bg-card px-6 py-3">
        <Link to="/" className="text-sm font-semibold text-primary hover:underline">
          ← Back to site
        </Link>
        <p className="text-sm text-muted-foreground">
          {current.title} · {index + 1} of {total}
        </p>
        <div className="flex items-center gap-2">
          <Link
            to="/slides"
            search={{ slide: index + 1, print: true }}
            className="rounded-full border border-border px-4 py-1.5 text-sm font-medium text-foreground hover:bg-secondary"
          >
            Print / PDF
          </Link>
          <button
            onClick={() => void document.documentElement.requestFullscreen()}
            className="rounded-full bg-primary px-4 py-1.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
          >
            Present
          </button>
        </div>
      </header>

      <div className="flex min-h-0 flex-1">
        <aside className="print-hide hidden w-52 shrink-0 overflow-y-auto border-r border-border bg-card p-3 lg:block">
          {SLIDES.map((s, i) => {
            const Thumb = s.Component;
            return (
              <button
                key={s.id}
                onClick={() => go(i + 1)}
                className={`mb-3 block w-full overflow-hidden rounded-lg border text-left transition-colors ${
                  i === index ? "border-primary" : "border-border hover:border-primary/40"
                }`}
              >
                <div className="relative h-[102px] w-full bg-background">
                  <ScaledSlide>
                    <Thumb />
                  </ScaledSlide>
                </div>
                <p className="px-2 py-1.5 text-xs text-muted-foreground">
                  {i + 1}. {s.title}
                </p>
              </button>
            );
          })}
        </aside>

        <main className="relative min-w-0 flex-1 p-6">
          <div className="relative h-full w-full">
            <ScaledSlide>
              <Current />
            </ScaledSlide>
          </div>

          <div className="print-hide absolute bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-border bg-card/90 px-3 py-2 shadow-lg backdrop-blur">
            <button
              onClick={() => go(index)}
              className="rounded-full px-4 py-1.5 text-sm font-medium text-foreground hover:bg-secondary"
            >
              Prev
            </button>
            <span className="text-sm text-muted-foreground">
              {index + 1} / {total}
            </span>
            <button
              onClick={() => go(index + 2)}
              className="rounded-full px-4 py-1.5 text-sm font-medium text-foreground hover:bg-secondary"
            >
              Next
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
