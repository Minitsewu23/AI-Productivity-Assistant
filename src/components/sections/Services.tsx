import { SERVICES, SALON_INFO } from "@/lib/salon-data";

const categoryEmoji: Record<string, string> = {
  Hair: "✂️",
  Braids: "🪢",
  Makeup: "💄",
  Nails: "💅",
  Lashes: "👁️",
  Facials: "🧖🏽‍♀️",
  Waxing: "✨",
};

export function Services() {
  return (
    <section id="services" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Our Services
          </p>
          <h2 className="mt-3 text-4xl font-bold text-foreground sm:text-5xl">
            Beauty services fit for royalty
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            From precision cuts to bridal glamour, {SALON_INFO.name} offers a
            full menu of premium treatments for every member of the family.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((group) => (
            <div
              key={group.category}
              className="group rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-2xl">
                {categoryEmoji[group.category] || "✨"}
              </div>
              <h3 className="text-2xl font-semibold text-card-foreground">
                {group.category}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {group.description}
              </p>
              <ul className="mt-5 space-y-2">
                {group.items.slice(0, 5).map((item) => (
                  <li
                    key={item.name}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="text-card-foreground">{item.name}</span>
                    <span className="font-medium text-primary">
                      {item.price}
                    </span>
                  </li>
                ))}
                {group.items.length > 5 && (
                  <li className="text-xs font-medium text-muted-foreground">
                    + {group.items.length - 5} more
                  </li>
                )}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
