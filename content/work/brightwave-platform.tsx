import { withBasePath } from "@/lib/utils";
import type { Project } from "@/types/project";

export const project = {
  slug: "rightmind-model-recommender",
  title: "RightMind AI Model Recommendation",
  client: "RightMind Lab",
  excerpt:
    "A 48H prototype that guides analysts to the best-performing AI model, now powering production workflows across the lab.",
  services: ["48H Prototypes", "AI Solutions", "UI/UX Design"],
  tags: ["AI", "Decision support", "Workflow automation"],
  categories: ["Product", "AI"],
  timeline: "48 hours to prototype, 3 weeks to production",
  status: "case-study",
  featured: true,
  hero: {
    image: withBasePath("/images/projects/brightwave-hero.svg"),
    alt: "RightMind AI model recommendation dashboard"
  },
  kpis: [
    { label: "Prototype delivery", value: "48h" },
    { label: "Analyst adoption", value: "92%" },
    { label: "Selection time", value: "-63%" }
  ],
  gallery: [
    {
      src: withBasePath("/images/projects/brightwave-dashboard.svg"),
      alt: "Recommendation matrix highlighting best-fit models",
      width: 1400,
      height: 880,
      caption: "The orchestrator scores latency, cost, and compliance to surface the right model per request."
    }
  ],
  publishedAt: "2024-05-10"
} satisfies Omit<Project, "body">;

export default function BrightwavePlatform() {
  return (
    <>
      <h2>Problem</h2>
      <p>
        Research teams at RightMind Lab test dozens of foundation models weekly. Model selection lived in spreadsheets, with
        context scattered across Slack and notebooks—slow, opaque, and impossible to audit.
      </p>

      <h2>Approach</h2>
      <p>
        ACH interviewed data scientists on Monday morning and mapped every decision point. By Tuesday night the squad
        delivered a fully interactive prototype: a heat-map explorer, conversation-driven comparisons, and guardrails for
        regulated datasets. We orchestrated OpenAI, Anthropic, and custom models behind a single API with smart defaults.
      </p>

      <h2>Outcome</h2>
      <p>
        The prototype became the production tool still in use today. Analysts cut evaluation time by 63%, compliance teams
        gained a transparent audit trail, and leadership finally saw model spend in real time. The same architecture now
        powers client-facing recommendation workflows across RightMind Lab.
      </p>
    </>
  );
}
