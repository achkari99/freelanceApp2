import { withBasePath } from "@/lib/utils";
import type { Project } from "@/types/project";

export const project = {
  slug: "artisan-bakery-showcase",
  title: "Artisan Bakery Showcase",
  client: "Independent Patisserie Collective",
  excerpt:
    "A visually rich, front-end-only website that spotlights seasonal pastries and store locations for a boutique bakery brand.",
  services: ["UI/UX Design", "Web Development"],
  tags: ["Bakery", "Marketing site", "Responsive UI"],
  categories: ["Product", "Marketing"],
  timeline: "3-day front-end sprint",
  status: "case-study",
  featured: false,
  hero: {
    image: withBasePath("/images/projects/bakeryPhoto1.png"),
    alt: "Artisan bakery storefront with featured pastries"
  },
  kpis: [
    { label: "Screens prototyped", value: "8" },
    { label: "Delivery", value: "72h" },
    { label: "Framework", value: "Next.js + Tailwind" }
  ],
  gallery: [],
  publishedAt: "2025-10-10"
} satisfies Omit<Project, "body">;

export default function ArtisanBakeryShowcase() {
  return (
    <>
      <h2>Problem</h2>
      <p>
        The bakery collective wanted a rapid facelift to preview their new brand identity before investing in a full
        ecommerce build. They needed a responsive experience that could be shared with stakeholders and partners without
        back-end complexity.
      </p>

      <h2>Approach</h2>
      <p>
        We mapped user journeys around discovery—signature pastries, chef spotlights, and store locations—and translated
        them into an immersive one-page narrative. Using Next.js and Tailwind, we layered motion flourishes, seasonal
        callouts, and reusable card systems so the marketing team can extend the layout later.
      </p>

      <p>
        Explore the front-end prototype at{" "}
        <a href="https://bakery2-self.vercel.app" target="_blank" rel="noreferrer">
          bakery2-self.vercel.app
        </a>
        . This link showcases the UI only—it is not wired to production inventory or ordering systems.
      </p>

      <h2>Outcome</h2>
      <p>
        Stakeholders approved the direction within days, and the prototype now anchors the brief for the full omnichannel
        rollout. Photography and messaging can be swapped via simple JSON config, giving the bakery team a lightweight way
        to preview promotions while the back end is developed.
      </p>
    </>
  );
}
