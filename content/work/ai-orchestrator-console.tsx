import { withBasePath } from "@/lib/utils";
import type { Project } from "@/types/project";

export const project = {
  slug: "ai-orchestrator-console",
  title: "AI Orchestrator Console",
  client: "Internal Lab Initiative",
  excerpt:
    "A conversational console that routes user prompts to the best-fit foundation model and illustrates multi-model orchestration in real time.",
  services: ["AI Solutions", "UI/UX Design", "Web Development"],
  tags: ["AI orchestration", "LLM router", "Chat UI"],
  categories: ["Product", "AI"],
  timeline: "5-day prototype sprint",
  status: "coming-soon",
  featured: false,
  hero: {
    image: withBasePath("/images/projects/ai-orchestrator.png"),
    alt: "AI Orchestrator conversational console interface"
  },
  kpis: [
    { label: "Model providers", value: "4 routed" },
    { label: "Latency reduction", value: "-37% vs single model" },
    { label: "Delivery", value: "5 days" }
  ],
  gallery: [],
  publishedAt: "2025-10-16"
} satisfies Omit<Project, "body">;

export default function AIOrchestratorConsole() {
  return (
    <>
      <h2>Problem</h2>
      <p>
        Product leadership needed a tangible demo that showed how ACH orchestrates multiple large language models. They
        wanted a single chat experience that could swap between providers based on latency, cost, or quality without users
        noticing the change.
      </p>

      <h2>Approach</h2>
      <p>
        We mapped common enterprise use cases, defined routing policies, and then designed a clean chat interface that
        highlights which model handled each turn. The console ships with a settings drawer for weight adjustments, live
        status indicators, and soft gradients that reinforce the orchestration theme.
      </p>

      <p>
        The prototype runs as a front-end experience that highlights provider selection, execution logs, and graceful
        fallbacks. Because it is wired to internal sandbox APIs, the public link is shared privately with stakeholders
        rather than published as a production endpoint.
      </p>

      <h2>Outcome</h2>
      <p>
        The prototype helped stakeholders validate routing heuristics and gave sales teams a clear demo for enterprise
        conversations. Engineering now has a shared blueprint for the logging, fallback, and provider-selection logic that
        will power the production orchestrator.
      </p>
    </>
  );
}
