import { useState } from "react";
import { SERVICES, SALON_INFO } from "@/lib/salon-data";

export function Pricing() {
  const [activeCategory, setActiveCategory] = useState(SERVICES[0].category);
  const activeGroup = SERVICES.find((g) => g.category === activeCategory);

  return (
    <section id="pricing" className="bg-secondary/30 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Price List
          </p>
          <h2 className="mt-3 text-4xl font-bold text-foreground sm:text-5xl">
            Transparent, royal-standard pricing
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            All prices are starting points and may vary based on hair length,
            product choice, and styling complexity. Contact{" "}
            {SALON_INFO.name} for a personalised quote.
          </p>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-2">
          {SERVICES.map((group) => (
            <button
              key={group.category}
              onClick={() => setActiveCategory(group.category)}
              className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all ${
                activeCategory === group.category
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-background text-foreground hover:bg-card"
              }`}
            >
              {group.category}
            </button>
          ))}
        </div>

        {activeGroup && (
          <div className="mx-auto mt-12 max-w-3xl overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
            <div className="border-b border-border bg-secondary/50 px-6 py-4">
              <h3 className="text-xl font-semibold text-card-foreground">
                {activeGroup.category}
              </h3>
              <p className="text-sm text-muted-foreground">
                {activeGroup.description}
              </p>
            </div>
            <ul className="divide-y divide-border">
              {activeGroup.items.map((item) => (
                <li
                  key={item.name}
                  className="flex items-center justify-between px-6 py-4 transition-colors hover:bg-secondary/30"
                >
                  <span className="font-medium text-card-foreground">
                    {item.name}
                  </span>
                  <span className="font-semibold text-primary">
                    {item.price}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mx-auto mt-8 max-w-3xl rounded-xl border border-border bg-background p-6 text-center">
          <p className="text-sm text-muted-foreground">
            Bridal packages, group bookings, and custom treatments are quoted
            individually. Email us for a detailed package breakdown.
          </p>
        </div>
      </div>
    </section>
  );
}
