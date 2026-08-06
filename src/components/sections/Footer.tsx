import { SALON_INFO } from "@/lib/salon-data";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold text-card-foreground">
              {SALON_INFO.name}
            </h3>
            <p className="mt-3 max-w-md text-muted-foreground">
              {SALON_INFO.tagline} Two branches across Cape Town delivering
              premium hair, beauty, makeup, skincare, and nail services.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-card-foreground">
              Contact
            </h4>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href={`tel:${SALON_INFO.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
                >
                  <Phone className="h-4 w-4" />
                  {SALON_INFO.phone}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${SALON_INFO.whatsapp.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
                >
                  <Phone className="h-4 w-4" />
                  WhatsApp: {SALON_INFO.whatsapp}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SALON_INFO.email}`}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
                >
                  <Mail className="h-4 w-4" />
                  {SALON_INFO.email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-card-foreground">
              Hours
            </h4>
            <ul className="mt-4 space-y-2">
              {Object.values(SALON_INFO.hours).map((slot) => (
                <li
                  key={slot.label}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <Clock className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>
                    {slot.label}: {slot.hours}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {SALON_INFO.name}. All rights
            reserved.
          </p>
          <p className="mt-2 text-xs text-muted-foreground">
            Two Convenient Branches Across Cape Town ·{" "}
            {SALON_INFO.phone} · {SALON_INFO.email}
          </p>
        </div>
      </div>
    </footer>
  );
}
