export const post = {
  slug: "weekly-lab-notes",
  title: "Lab Notes: What We Shipped This Week",
  excerpt: "A quick hit of experiments, prototypes, and lessons from the ACH 48H squad.",
  publishedAt: "2024-07-19",
  tags: ["lab", "experiments"]
};

export default function WeeklyFieldNotes() {
  return (
    <>
      <h3>Experiment 01: Multi-model guardrails</h3>
      <p>
        We paired anthropic, open-source, and in-house LLMs behind a single API with dynamic routing. A/B tests proved hybrid
        stacks deliver accuracy without runaway cost.
      </p>

      <h3>Experiment 02: Fast lane handoff</h3>
      <p>
        We piloted a Notion + Linear handoff pack that compresses the gap between prototype demo and production backlog to
        under 48 hours.
      </p>

      <h3>Experiment 03: Voice interface kit</h3>
      <p>
        ACH is packaging a reusable voice UI for founders exploring audio copilots. Expect a downloadable starter in Lab
        Notes next month.
      </p>
    </>
  );
}
