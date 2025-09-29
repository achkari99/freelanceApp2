export const post = {
  slug: "operating-principles",
  title: "How ACH Ships Prototypes in 48 Hours",
  excerpt: "The rituals that let our 48H prototype squad move faster than AI while maintaining production-level quality.",
  publishedAt: "2024-07-01",
  tags: ["process", "48h"]
};

export default function OperatingPrinciples() {
  return (
    <>
      <h2>Build speed with clarity</h2>
      <p>
        We never start writing code until success is defined. The first hour maps users, data sources, and safeguards so the
        prototype answers the question that matters most.
      </p>

      <h2>Work in public</h2>
      <p>
        Clients join our Figma, repos, and dedicated channels from minute one. Daily drops, Loom walkthroughs, and
        AI-generated recaps keep everyone aligned without endless meetings.
      </p>

      <h2>Leave a trail</h2>
      <p>
        Every prototype ships with docs: architecture, APIs, prompts, and a backlog. Handshakes become handoffs that new
        teammates can pick up instantly.
      </p>
    </>
  );
}
