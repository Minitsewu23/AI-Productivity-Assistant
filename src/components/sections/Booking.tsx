import { useState } from "react";
import { SALON_INFO, SERVICES } from "@/lib/salon-data";
import { Calendar, Mail, User, Phone, MessageSquare, MapPin, Sparkles } from "lucide-react";

export function Booking() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    branch: "",
    service: "",
    date: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent("Booking Request - Ponxo's Glam House");
    const body = encodeURIComponent(
      `Hi Ponxo's Glam House team,\n\nI would like to book an appointment. Here are my details:\n\n` +
        `Name: ${form.name}\n` +
        `Email: ${form.email}\n` +
        `Phone: ${form.phone}\n` +
        `Preferred branch: ${form.branch}\n` +
        `Service: ${form.service}\n` +
        `Preferred date: ${form.date}\n\n` +
        `Additional notes:\n${form.message}\n\n` +
        `Looking forward to my royal treatment!`
    );
    window.location.href = `mailto:${SALON_INFO.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="book" className="bg-secondary/30 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Book an Appointment
            </p>
            <h2 className="mt-3 text-4xl font-bold text-foreground sm:text-5xl">
              Ready for your royal treatment?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Fill in the form and we'll prepare your appointment details. Your
              request will be sent directly to our booking team via email.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-4 rounded-xl bg-card p-4 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email us</p>
                  <a
                    href={`mailto:${SALON_INFO.email}`}
                    className="font-medium text-card-foreground hover:text-primary"
                  >
                    {SALON_INFO.email}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-xl bg-card p-4 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Call us</p>
                  <a
                    href={`tel:${SALON_INFO.phone.replace(/\s/g, "")}`}
                    className="font-medium text-card-foreground hover:text-primary"
                  >
                    {SALON_INFO.phone}
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-8 overflow-hidden rounded-2xl">
              <img
                src="/images/hair-model.jpg"
                alt="Styled braided hair at Ponxo's Glam House"
                className="h-80 w-full object-cover"
                width={1024}
                height={1024}
                loading="lazy"
              />
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="flex items-center gap-2 text-sm font-medium text-card-foreground"
                >
                  <User className="h-4 w-4 text-primary" />
                  Full name
                </label>
                <input
                  id="name"
                  required
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground outline-none ring-offset-background transition-all focus:ring-2 focus:ring-ring"
                  placeholder="Jane Doe"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="flex items-center gap-2 text-sm font-medium text-card-foreground"
                >
                  <Mail className="h-4 w-4 text-primary" />
                  Email address
                </label>
                <input
                  id="email"
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground outline-none ring-offset-background transition-all focus:ring-2 focus:ring-ring"
                  placeholder="jane@example.com"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="phone"
                  className="flex items-center gap-2 text-sm font-medium text-card-foreground"
                >
                  <Phone className="h-4 w-4 text-primary" />
                  Phone number
                </label>
                <input
                  id="phone"
                  required
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground outline-none ring-offset-background transition-all focus:ring-2 focus:ring-ring"
                  placeholder="+27 82 123 4567"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="branch"
                  className="flex items-center gap-2 text-sm font-medium text-card-foreground"
                >
                  <MapPin className="h-4 w-4 text-primary" />
                  Preferred branch
                </label>
                <select
                  id="branch"
                  required
                  value={form.branch}
                  onChange={(e) => setForm({ ...form, branch: e.target.value })}
                  className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground outline-none ring-offset-background transition-all focus:ring-2 focus:ring-ring"
                >
                  <option value="">Select a branch</option>
                  {SALON_INFO.branches.map((b) => (
                    <option key={b.name} value={b.name}>
                      {b.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2 sm:col-span-2">
                <label
                  htmlFor="service"
                  className="flex items-center gap-2 text-sm font-medium text-card-foreground"
                >
                  <Sparkles className="h-4 w-4 text-primary" />
                  Service requested
                </label>
                <select
                  id="service"
                  required
                  value={form.service}
                  onChange={(e) =>
                    setForm({ ...form, service: e.target.value })
                  }
                  className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground outline-none ring-offset-background transition-all focus:ring-2 focus:ring-ring"
                >
                  <option value="">Select a service</option>
                  {SERVICES.map((group) => (
                    <optgroup key={group.category} label={group.category}>
                      {group.items.map((item) => (
                        <option key={item.name} value={item.name}>
                          {item.name} — {item.price}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>

              <div className="space-y-2 sm:col-span-2">
                <label
                  htmlFor="date"
                  className="flex items-center gap-2 text-sm font-medium text-card-foreground"
                >
                  <Calendar className="h-4 w-4 text-primary" />
                  Preferred date
                </label>
                <input
                  id="date"
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground outline-none ring-offset-background transition-all focus:ring-2 focus:ring-ring"
                />
              </div>

              <div className="space-y-2 sm:col-span-2">
                <label
                  htmlFor="message"
                  className="flex items-center gap-2 text-sm font-medium text-card-foreground"
                >
                  <MessageSquare className="h-4 w-4 text-primary" />
                  Additional notes
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground outline-none ring-offset-background transition-all focus:ring-2 focus:ring-ring"
                  placeholder="Tell us about your hair type, preferred time, or any special requests..."
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-6 w-full rounded-xl bg-primary px-6 py-4 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 hover:shadow-xl"
            >
              Send Booking Request
            </button>

            <p className="mt-4 text-center text-xs text-muted-foreground">
              This will open your default email app with a pre-filled booking
              request.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
