export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "ACH shipped a working AI prototype in 48 hours that our board demoed the same week. The follow-on build launched to customers in under a month.",
    name: "Imene Rahmani",
    role: "Director of Innovation",
    company: "RightMind Lab"
  },
  {
    quote:
      "Their lab management portal replaced three legacy systems. The team anticipated compliance needs and designed workflows my staff adopted instantly.",
    name: "Zayd El Amrani",
    role: "Operations Lead",
    company: "Atlas Research Clinic"
  },
  {
    quote:
      "The ACH squad nailed the vision faster than any agency we have tried: pixel-perfect UI, clean architecture, and documentation that made handoff seamless.",
    name: "Amelia Khoury",
    role: "Founder",
    company: "StockFlow"
  }
];
