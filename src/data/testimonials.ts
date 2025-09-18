export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Resonant rebuilt our product narrative and homepage. Within a quarter we doubled demo conversions and aligned the entire GTM team around a single story.",
    name: "Riya Desai",
    role: "Head of Marketing",
    company: "Brightwave"
  },
  {
    quote:
      "They operate like an extension of our product org--rapid discovery, thoughtful craft, and stakeholder management that keeps projects moving.",
    name: "Andre Morales",
    role: "VP Product",
    company: "North Beacon"
  },
  {
    quote:
      "From research to launch week, Resonant translated complex ideas into a brand and experience that investors and customers immediately understood.",
    name: "Hannah Lee",
    role: "Founder",
    company: "Nova Commerce"
  }
];
