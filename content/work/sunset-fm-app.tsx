import { withBasePath } from "@/lib/utils";

export const project = {
  slug: "super-ai-mobile",
  title: "Super AI Mobile Companion",
  client: "RightMind Lab",
  excerpt: "A mobile control surface that keeps leadership informed on agent health, spend, and escalations in real time.",
  services: ["Web & Mobile Development", "UI/UX Design"],
  tags: ["Mobile", "AI", "Executive dashboards"],
  categories: ["Product"],
  timeline: "48 hours to prototype, 8 weeks to ship v1",
  status: "case-study",
  hero: {
    image: withBasePath("/images/projects/sunset-fm-hero.svg"),
    alt: "Mobile dashboards for Super AI"
  },
  kpis: [
    { label: "Executive engagement", value: "+3.2x" },
    { label: "Critical escalations", value: "-54%" }
  ],
  gallery: [],
  publishedAt: "2024-07-05"
};

export default function SunsetFmApp() {
  return (
    <>
      <h2>Problem</h2>
      <p>
        Super AI's control room lived on desktop. Leaders on the go lacked visibility into agent missions, cost spikes, or
        human escalation queues.
      </p>

      <h2>Approach</h2>
      <p>
        We crafted a card-based mobile experience in 48 hours, blending push notifications, AI-generated summaries, and quick
        actions. Native-feel gestures and typography made the complex data delightful on any screen.
      </p>

      <h2>Outcome</h2>
      <p>
        Leadership now monitors Super AI from anywhere. Escalations surface instantly, cost anomalies auto-flag, and
        confidence in the agent network climbed dramatically.
      </p>
    </>
  );
}
