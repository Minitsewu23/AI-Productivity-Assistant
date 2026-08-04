export const SALON_INFO = {
  name: "Your Majesty Hair & Beauty Salon",
  tagline: "Experience beauty fit for royalty.",
  phone: "+27 21 555 1234",
  whatsapp: "+27 82 123 4567",
  email: "bookings@yourmajestyhair.co.za",
  branches: [
    {
      name: "Cape Town CBD",
      address: "Cape Town CBD, Western Cape, South Africa",
    },
    {
      name: "Bellville",
      address: "Bellville, Western Cape, South Africa",
    },
    {
      name: "Khayelitsha",
      address: "Khayelitsha, Western Cape, South Africa",
    },
  ],
  hours: {
    weekdays: { label: "Monday – Friday", hours: "08:00 – 18:00" },
    saturday: { label: "Saturday", hours: "08:00 – 17:00" },
    sunday: { label: "Sunday", hours: "09:00 – 15:00" },
    holidays: { label: "Public Holidays", hours: "09:00 – 14:00" },
  },
} as const;

export type ServiceCategory =
  | "Hair"
  | "Braids"
  | "Makeup"
  | "Nails"
  | "Lashes"
  | "Facials"
  | "Waxing";

export interface ServiceItem {
  name: string;
  price: string;
}

export interface ServiceGroup {
  category: ServiceCategory;
  description: string;
  items: ServiceItem[];
}

export const SERVICES: ServiceGroup[] = [
  {
    category: "Hair",
    description: "Cuts, colour, treatments, and styling for every texture and occasion.",
    items: [
      { name: "Hair Wash", price: "R120" },
      { name: "Blow Dry", price: "R250" },
      { name: "Ladies Cut", price: "R300" },
      { name: "Men's Cut", price: "R180" },
      { name: "Silk Press", price: "R450" },
      { name: "Hair Colour", price: "From R850" },
      { name: "Brazilian Treatment", price: "From R1,200" },
      { name: "Keratin Treatment", price: "From R1,500" },
      { name: "Hair Botox", price: "From R1,600" },
      { name: "Deep Conditioning", price: "R350" },
      { name: "Wig Installation", price: "R700" },
      { name: "Wig Revamp", price: "R900" },
    ],
  },
  {
    category: "Braids",
    description: "Protective styles crafted with precision and care.",
    items: [
      { name: "Cornrows", price: "R250" },
      { name: "Box Braids", price: "From R900" },
      { name: "Knotless Braids", price: "From R1,200" },
      { name: "Tribal Braids", price: "From R1,000" },
      { name: "Fulani Braids", price: "From R950" },
      { name: "Soft Locs", price: "From R1,600" },
      { name: "Passion Twists", price: "From R1,400" },
    ],
  },
  {
    category: "Makeup",
    description: "Flawless looks for everyday glamour and life's biggest moments.",
    items: [
      { name: "Soft Glam", price: "R500" },
      { name: "Full Glam", price: "R700" },
      { name: "Bridal Makeup", price: "R1,500" },
      { name: "Graduation Makeup", price: "R650" },
      { name: "Birthday Makeup", price: "R650" },
      { name: "Traditional Wedding Makeup", price: "From R1,800" },
    ],
  },
  {
    category: "Nails",
    description: "Manicures, pedicures, extensions, and custom nail art.",
    items: [
      { name: "Gel Polish", price: "R250" },
      { name: "Gel Nails", price: "R450" },
      { name: "Acrylic Full Set", price: "R500" },
      { name: "Luxury Manicure", price: "R300" },
      { name: "Luxury Pedicure", price: "R400" },
      { name: "Nail Art", price: "From R80" },
    ],
  },
  {
    category: "Lashes",
    description: "Custom lash extensions and lifts for every eye shape.",
    items: [
      { name: "Classic Lashes", price: "R500" },
      { name: "Hybrid Lashes", price: "R650" },
      { name: "Russian Volume", price: "R800" },
      { name: "Mega Volume", price: "R950" },
      { name: "Lash Lift", price: "R450" },
    ],
  },
  {
    category: "Facials",
    description: "Targeted skin treatments for a radiant, healthy complexion.",
    items: [
      { name: "Basic Facial", price: "R450" },
      { name: "Deep Cleansing", price: "R650" },
      { name: "Hydrating Facial", price: "R700" },
      { name: "Brightening Facial", price: "R800" },
      { name: "Acne Facial", price: "R850" },
      { name: "Chemical Peel", price: "R1,200" },
    ],
  },
  {
    category: "Waxing",
    description: "Smooth, professional hair removal for face and body.",
    items: [
      { name: "Eyebrows", price: "R80" },
      { name: "Lip", price: "R60" },
      { name: "Underarms", price: "R150" },
      { name: "Half Leg", price: "R250" },
      { name: "Full Leg", price: "R400" },
      { name: "Brazilian Wax", price: "R450" },
    ],
  },
];

export const ALL_SERVICE_NAMES = SERVICES.flatMap((group) =>
  group.items.map((item) => item.name)
);

export const BRIDAL_SERVICES = [
  "Bridal Hair",
  "Bridal Makeup",
  "Bridesmaids Hair",
  "Bridesmaids Makeup",
  "Mother of the Bride",
  "Touch-Up Services",
  "Wedding Consultation",
];

export const BEAUTY_TIPS = [
  "Book colour or chemical treatments at least 48 hours before a big event.",
  "Arrive with clean, product-free hair for the best braiding results.",
  "Avoid caffeine before waxing to reduce sensitivity.",
  "Hydrate well the day before a facial for enhanced glow.",
  "Bring reference photos to your makeup appointment for quicker alignment.",
];
