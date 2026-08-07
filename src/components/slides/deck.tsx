import { SlideLayout } from "@/components/slides/ScaledSlide";
import { SALON_INFO, SERVICES } from "@/lib/salon-data";

const HERO = "/images/hero-salon.jpg";
const HAIR = "/images/hair-model.jpg";
const NAILS = "/images/nails-model.jpg";

function Kicker({ children }: { children: React.ReactNode }) {
  return <p className="slide-kicker font-semibold text-primary">{children}</p>;
}

function TitleSlide() {
  return (
    <SlideLayout footer={false}>
      <div className="absolute inset-0">
        <img src={HERO} alt="Ponxo's Glam House salon interior" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/20" />
      </div>
      <div className="absolute inset-0 flex flex-col justify-center px-32">
        <Kicker>Cape Town&apos;s Luxury Beauty Destination</Kicker>
        <h1 className="slide-title-lg mt-10 max-w-[1100px] font-bold text-foreground">
          {SALON_INFO.name}
        </h1>
        <p className="slide-subtitle mt-10 max-w-[900px] text-muted-foreground">
          {SALON_INFO.tagline}
        </p>
        <div className="mt-16 flex gap-6">
          <span className="slide-badge rounded-full bg-primary px-8 py-4 font-semibold text-primary-foreground">
            {SALON_INFO.phone}
          </span>
          <span className="slide-badge rounded-full border border-border bg-card px-8 py-4 font-semibold text-card-foreground">
            {SALON_INFO.email}
          </span>
        </div>
      </div>
    </SlideLayout>
  );
}

function AboutSlide() {
  return (
    <SlideLayout>
      <div className="absolute inset-0 grid grid-cols-2">
        <div className="flex flex-col justify-center px-24">
          <Kicker>Who We Are</Kicker>
          <h2 className="slide-title mt-8 font-bold text-foreground">
            Premium beauty for
            <br />
            the whole family
          </h2>
          <p className="slide-body mt-10 max-w-[850px] text-muted-foreground">
            Ponxo&apos;s Glam House delivers hair, makeup, skincare, and nail
            services for women, men, and children — with the same royal standard
            at every branch.
          </p>
          <ul className="slide-body mt-10 space-y-5 text-foreground">
            <li>Walk-ins welcome, open 7 days a week</li>
            <li>Two convenient Cape Town branches</li>
            <li>Specialists across seven service categories</li>
          </ul>
        </div>
        <div className="relative">
          <img src={HAIR} alt="Client styled at Ponxo's Glam House" className="h-full w-full object-cover" />
        </div>
      </div>
    </SlideLayout>
  );
}

function ServicesSlide() {
  return (
    <SlideLayout>
      <div className="absolute inset-0 px-24 pt-24">
        <Kicker>Our Services</Kicker>
        <h2 className="slide-title mt-6 font-bold text-foreground">
          Seven categories, one standard
        </h2>
        <div className="mt-16 grid grid-cols-3 gap-8">
          {SERVICES.slice(0, 6).map((group) => (
            <div
              key={group.category}
              className="rounded-3xl border border-border bg-card p-10"
            >
              <h3 className="slide-subtitle font-semibold text-card-foreground">
                {group.category}
              </h3>
              <p className="slide-caption mt-5 text-muted-foreground">
                {group.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </SlideLayout>
  );
}

const HIGHLIGHTS = [
  { name: "Silk Press", price: "R450" },
  { name: "Knotless Braids", price: "From R1,200" },
  { name: "Full Glam Makeup", price: "R700" },
  { name: "Acrylic Full Set", price: "R500" },
  { name: "Russian Volume Lashes", price: "R800" },
  { name: "Chemical Peel", price: "R1,200" },
];

function PricingSlide() {
  return (
    <SlideLayout>
      <div className="absolute inset-0 grid grid-cols-[1.2fr_1fr]">
        <div className="flex flex-col justify-center px-24">
          <Kicker>Price List</Kicker>
          <h2 className="slide-title mt-6 font-bold text-foreground">
            Transparent pricing
          </h2>
          <div className="mt-12 divide-y divide-border rounded-3xl border border-border bg-card">
            {HIGHLIGHTS.map((item) => (
              <div
                key={item.name}
                className="slide-body flex items-center justify-between px-10 py-6"
              >
                <span className="text-card-foreground">{item.name}</span>
                <span className="font-semibold text-primary">{item.price}</span>
              </div>
            ))}
          </div>
          <p className="slide-caption mt-8 text-muted-foreground">
            Starting prices — final quote depends on length, product, and styling.
          </p>
        </div>
        <div className="relative">
          <img src={NAILS} alt="Nail art at Ponxo's Glam House" className="h-full w-full object-cover" />
        </div>
      </div>
    </SlideLayout>
  );
}

function BranchesSlide() {
  return (
    <SlideLayout>
      <div className="absolute inset-0 px-24 pt-28">
        <Kicker>Visit Us</Kicker>
        <h2 className="slide-title mt-6 font-bold text-foreground">
          Two Cape Town branches
        </h2>
        <div className="mt-16 grid grid-cols-2 gap-10">
          {SALON_INFO.branches.map((branch) => (
            <div key={branch.name} className="rounded-3xl bg-gradient-royal p-12">
              <h3 className="slide-subtitle font-semibold text-foreground">
                {branch.name}
              </h3>
              <p className="slide-body mt-5 text-muted-foreground">
                {branch.address}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-14 grid grid-cols-4 gap-6">
          {Object.values(SALON_INFO.hours).map((slot) => (
            <div key={slot.label} className="rounded-2xl border border-border bg-card p-8">
              <p className="slide-caption text-muted-foreground">{slot.label}</p>
              <p className="slide-body-lg mt-3 font-semibold text-card-foreground">
                {slot.hours}
              </p>
            </div>
          ))}
        </div>
      </div>
    </SlideLayout>
  );
}

function AiSlide() {
  const tools = [
    { title: "Client Chat Assistant", copy: "Answers pricing and booking questions around the clock." },
    { title: "Meeting Notes Summarizer", copy: "Turns staff meeting notes into clear action points." },
    { title: "Task Planner", copy: "Plans salon operations and campaign checklists." },
    { title: "Beauty Research", copy: "Researches trends, products, and treatments on demand." },
  ];
  return (
    <SlideLayout>
      <div className="absolute inset-0 px-24 pt-28">
        <Kicker>Built-in AI Suite</Kicker>
        <h2 className="slide-title mt-6 font-bold text-foreground">
          Technology that sells for us
        </h2>
        <div className="mt-16 grid grid-cols-2 gap-10">
          {tools.map((tool) => (
            <div key={tool.title} className="rounded-3xl border border-border bg-card p-12">
              <h3 className="slide-subtitle font-semibold text-card-foreground">
                {tool.title}
              </h3>
              <p className="slide-body mt-5 text-muted-foreground">{tool.copy}</p>
            </div>
          ))}
        </div>
      </div>
    </SlideLayout>
  );
}

function WhyUsSlide() {
  const stats = [
    { value: "7", label: "Service categories" },
    { value: "2", label: "Cape Town branches" },
    { value: "7 days", label: "Open every week" },
  ];
  return (
    <SlideLayout>
      <div className="absolute inset-0 flex flex-col justify-center px-24">
        <Kicker>Why Clients Choose Us</Kicker>
        <h2 className="slide-title mt-6 max-w-[1300px] font-bold text-foreground">
          Royal treatment, every single visit
        </h2>
        <div className="mt-20 grid grid-cols-3 gap-10">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex min-h-[260px] flex-col justify-center rounded-3xl bg-gradient-gold p-12"
            >
              <p className="font-bold text-accent-foreground" style={{ fontSize: 110, lineHeight: 1 }}>
                {stat.value}
              </p>
              <p className="slide-body-lg mt-6 text-accent-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </SlideLayout>
  );
}

function CtaSlide() {
  return (
    <SlideLayout footer={false} className="bg-espresso">
      <div className="absolute inset-0 flex flex-col justify-center px-32 text-cream">
        <p className="slide-kicker font-semibold text-accent">Book Today</p>
        <h2 className="slide-title-lg mt-10 max-w-[1300px] font-bold">
          Let us help you look and feel your best
        </h2>
        <div className="slide-body-lg mt-16 space-y-6">
          <p>Phone: {SALON_INFO.phone}</p>
          <p>WhatsApp: {SALON_INFO.whatsapp}</p>
          <p className="break-all">Email: {SALON_INFO.email}</p>
          <p>Two convenient branches across Cape Town</p>
        </div>
      </div>
    </SlideLayout>
  );
}

export interface DeckSlide {
  id: string;
  title: string;
  Component: () => React.ReactElement;
}

export const SLIDES: DeckSlide[] = [
  { id: "title", title: "Ponxo's Glam House", Component: TitleSlide },
  { id: "about", title: "About Us", Component: AboutSlide },
  { id: "services", title: "Services", Component: ServicesSlide },
  { id: "pricing", title: "Pricing", Component: PricingSlide },
  { id: "branches", title: "Branches & Hours", Component: BranchesSlide },
  { id: "ai", title: "AI Suite", Component: AiSlide },
  { id: "why-us", title: "Why Us", Component: WhyUsSlide },
  { id: "book", title: "Book Today", Component: CtaSlide },
];
