import { withBasePath } from "@/lib/utils";

export const project = {
  slug: "insight-copilot",
  title: "Insight Copilot for Healthcare",
  client: "RightMind Lab",
  excerpt:
    "An AI assistant for clinicians reviewing lab results, built with privacy-first data orchestration. Full case study releasing soon.",
  services: ["AI Solutions", "UI/UX Design"],
  tags: ["Healthcare", "AI", "Copilot"],
  categories: ["AI"],
  timeline: "In validation",
  status: "coming-soon",
  hero: {
    image: withBasePath("/images/projects/coming-soon-2.svg"),
    alt: "Insight Copilot preview"
  },
  kpis: [],
  gallery: [],
  publishedAt: "2024-10-12"
};

export default function GlacierBioComingSoon() {
  return (
    <p>
      <em>Sign up for Lab Notes to see the prototypes, safety reviews, and pilot outcomes as they drop.</em>
    </p>
  );
}
