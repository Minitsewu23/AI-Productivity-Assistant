import { SALON_INFO } from "@/lib/salon-data";

export function Hero() {
  const subject = encodeURIComponent("Booking Request - Ponxo's Glam House");
  const body = encodeURIComponent(
    `Hi Ponxo's Glam House team,\n\nI'd like to book an appointment. Please see my details below:\n\nName: \nPhone: \nPreferred branch: \nService: \nPreferred date/time: \n\nThank you!`
  );

  return (
    <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero-salon.jpg"
          alt="Luxury interior of Ponxo's Glam House"
          className="h-full w-full object-cover"
          width={1920}
          height={1080}
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-background/30" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Cape Town's Luxury Beauty Destination
          </p>
          <h1 className="text-5xl font-bold leading-[1.1] text-foreground sm:text-6xl lg:text-7xl">
            {SALON_INFO.name}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground sm:text-xl">
            {SALON_INFO.tagline} Premium hair, beauty, makeup, skincare, and
            nail services for women, men, and children — now with three
            convenient branches across Cape Town.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={`mailto:${SALON_INFO.email}?subject=${subject}&body=${body}`}
              className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30"
            >
              Book by Email
            </a>
            <a
              href={`https://wa.me/${SALON_INFO.whatsapp.replace(/\D/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-primary/30 bg-background/80 px-8 py-4 text-sm font-semibold text-foreground backdrop-blur-sm transition-all hover:bg-secondary"
            >
              Chat on WhatsApp
            </a>
            <Link
              to="/slides"
              search={{ slide: 1 }}
              className="inline-flex items-center justify-center rounded-full border border-border bg-background/80 px-8 py-4 text-sm font-semibold text-foreground backdrop-blur-sm transition-all hover:bg-secondary"
            >
              View Presentation
            </Link>
          </div>


          <div className="mt-10 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-accent" />
              Walk-ins welcome
            </span>
            <span className="flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-accent" />
              Two branches
            </span>
            <span className="flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-accent" />
              Open 7 days
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
