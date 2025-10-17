import { withBasePath } from "@/lib/utils";
import type { Project } from "@/types/project";

export const project = {
  slug: "boulangerie-ordering-experience",
  title: "Boulangerie Ordering Experience",
  client: "Maison du Levain",
  excerpt:
    "A component-driven front-end experience that prototypes online ordering and loyalty flows for an upscale boulangerie.",
  services: ["UI/UX Design", "Web Development"],
  tags: ["Bakery", "Ordering flow", "Design system"],
  categories: ["Product", "Ecommerce"],
  timeline: "5-day UI prototype",
  status: "case-study",
  featured: false,
  hero: {
    image: withBasePath("/images/projects/bakeryPhoto2.png"),
    alt: "Ordering interface for a boulangerie website"
  },
  kpis: [
    { label: "Reusable components", value: "24" },
    { label: "Device breakpoints", value: "3" },
    { label: "Design handoff", value: "Figma + Storybook" }
  ],
  gallery: [],
  publishedAt: "2025-10-12"
} satisfies Omit<Project, "body">;

export default function BoulangerieOrderingExperience() {
  return (
    <>
      <h2>Problem</h2>
      <p>
        Maison du Levain plans to launch click-and-collect services but needed to validate the end-to-end guest experience
        before investing in POS integrations. They requested a front-end prototype to test in-store with real customers.
      </p>

      <h2>Approach</h2>
      <p>
        We storyboarded the journey from daily specials through loyalty rewards, then built a modular design system in
        Next.js. The experience includes dynamic menus, cart interactions, and loyalty sign-in states, each backed by mock
        data so tests feel authentic without depending on production services.
      </p>

      <p>
        View the front-end handoff at{" "}
        <a href="https://bakery1-topaz.vercel.app" target="_blank" rel="noreferrer">
          bakery1-topaz.vercel.app
        </a>
        . The link is a UI prototype only and does not represent the live production ordering system.
      </p>

      <h2>Outcome</h2>
      <p>
        Usability sessions confirmed that guests could complete orders in less than two minutes, and the component library
        now seeds the production build. The work also informed loyalty requirements, reducing the scope for the eventual
        POS integration.
      </p>
    </>
  );
}
