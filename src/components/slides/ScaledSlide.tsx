import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Renders slide children on a fixed 1920x1080 canvas and scales it
 * proportionally to fit the parent container.
 */
export function ScaledSlide({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.4);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const update = () => {
      const { width, height } = el.getBoundingClientRect();
      setScale(Math.min(width / 1920, height / 1080));
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full overflow-hidden"
    >
      <div
        className="slide-wrapper"
        style={{ ["--slide-scale" as string]: String(scale) }}
      >
        {children}
      </div>
    </div>
  );
}

export function SlideLayout({
  children,
  className = "",
  footer = true,
}: {
  children: ReactNode;
  className?: string;
  footer?: boolean;
}) {
  return (
    <div className={`slide-content bg-background ${className}`}>
      {children}
      {footer && (
        <div className="slide-footer absolute bottom-10 left-20 right-20 flex items-center justify-between text-muted-foreground">
          <span>Ponxo&apos;s Glam House · Cape Town</span>
          <span>Experience beauty fit for royalty</span>
        </div>
      )}
    </div>
  );
}
