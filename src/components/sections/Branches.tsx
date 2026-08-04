import { SALON_INFO } from "@/lib/salon-data";
import { MapPin, Clock, Phone } from "lucide-react";

export function Branches() {
  return (
    <section id="branches" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Visit Us
          </p>
          <h2 className="mt-3 text-4xl font-bold text-foreground sm:text-5xl">
            Three convenient Cape Town branches
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Choose the location closest to you and enjoy the same royal
            treatment at every Your Majesty salon.
          </p>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {SALON_INFO.branches.map((branch) => (
            <div
              key={branch.name}
              className="relative overflow-hidden rounded-2xl border border-border bg-card p-8 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-secondary">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground">
                {branch.name}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {branch.address}
              </p>
              <a
                href={`tel:${SALON_INFO.phone.replace(/\s/g, "")}`}
                className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
              >
                <Phone className="h-4 w-4" />
                {SALON_INFO.phone}
              </a>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-2xl border border-border bg-card p-8 shadow-sm lg:p-12">
          <div className="flex items-center gap-3">
            <Clock className="h-6 w-6 text-primary" />
            <h3 className="text-2xl font-semibold text-card-foreground">
              Operating Hours
            </h3>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Object.values(SALON_INFO.hours).map((slot) => (
              <div
                key={slot.label}
                className="rounded-xl bg-secondary/50 p-4"
              >
                <p className="text-sm font-medium text-muted-foreground">
                  {slot.label}
                </p>
                <p className="mt-1 text-lg font-semibold text-card-foreground">
                  {slot.hours}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
