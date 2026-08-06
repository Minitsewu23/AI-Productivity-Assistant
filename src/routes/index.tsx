import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Pricing } from "@/components/sections/Pricing";
import { Branches } from "@/components/sections/Branches";
import { Booking } from "@/components/sections/Booking";
import { Footer } from "@/components/sections/Footer";
import { AiTools } from "@/components/sections/AiTools";
import { ChatAssistant } from "@/components/ChatAssistant";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Ponxo's Glam House | Cape Town",
      },
      {
        name: "description",
        content:
          "Book premium hair, beauty, makeup, skincare, and nail services at Ponxo's Glam House. Two branches in Cape Town CBD and Bellville.",
      },
      {
        property: "og:title",
        content: "Ponxo's Glam House | Cape Town",
      },
      {
        property: "og:description",
        content:
          "Luxury hair, beauty, makeup, skincare, and nail services across three Cape Town branches.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://id-preview--8e457f32-1839-4078-9d5d-1d580dc19686.lovable.app/images/hero-salon.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Ponxo's Glam House | Cape Town" },
      { name: "twitter:description", content: "Luxury hair, beauty, makeup, skincare, and nail services across three Cape Town branches." },
      { name: "twitter:image", content: "https://id-preview--8e457f32-1839-4078-9d5d-1d580dc19686.lovable.app/images/hero-salon.jpg" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <Services />
      <Pricing />
      <Branches />
      <AiTools />
      <Booking />
      <Footer />
      <ChatAssistant />
    </main>
  );
}
