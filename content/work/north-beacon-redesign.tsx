import { withBasePath } from "@/lib/utils";

export const project = {
  slug: "super-ai-orchestrator",
  title: "Super AI Orchestrator Control Room",
  client: "RightMind Super AI",
  excerpt:
    "A realtime control room for agent operations that gives leadership instant visibility into missions, spend, and escalations.",
  services: ["AI Solutions", "Web & Mobile Development", "Consulting & Digital Transformation"],
  tags: ["Agent ops", "AI orchestration", "Control room"],
  categories: ["AI", "Platform"],
  timeline: "48 hours to prototype, 5 weeks to production rollout",
  status: "case-study",
  featured: true,
  hero: {
    image: withBasePath("/images/projects/north-beacon-hero.svg"),
    alt: "Super AI control room dashboards"
  },
  kpis: [
    { label: "Escalation resolution", value: "-57%" },
    { label: "Executive engagement", value: "+3.4x" },
    { label: "Ops efficiency", value: "+42%" }
  ],
  gallery: [],
  publishedAt: "2024-07-18"
};

export default function NorthBeaconRedesign() {
  return (
    <>
      <h2>Problem</h2>
      <p>
        RightMind Super AI orchestrates dozens of autonomous agents for enterprise clients. Leaders lacked a unified view
        into mission status, compliance checks, and cost spikes, forcing the team to stitch together spreadsheets and alerts
        across tools.
      </p>

      <h2>Approach</h2>
      <p>
        ACH embedded with the ops squad for a 48 hour discovery sprint, mapping every escalation ritual and data source. We
        prototyped a modular control room that blended telemetry streams, AI summarisation, and human override workflows. The
        squad validated the design live, then we hardened the build with access controls and audit logging for production.
      </p>

      <h2>Outcome</h2>
      <p>
        The Super AI Orchestrator now powers daily standups and executive reviews. Escalations resolve in minutes instead of
        hours, leadership sees spend trends before they spike, and clients trust the transparency of the agent network. The
        platform continues to expand with customer-facing views built on the same architecture.
      </p>
    </>
  );
}
