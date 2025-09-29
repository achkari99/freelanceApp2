import { withBasePath } from "@/lib/utils";

export const project = {
  slug: "founderflow-crm",
  title: "FounderFlow Capital CRM",
  client: "FounderFlow",
  excerpt:
    "A fundraising command center prototyped in 48 hours to help founders manage investors, pipelines, and updates from one place.",
  services: ["48H Prototypes", "Consulting & Digital Transformation", "UI/UX Design"],
  tags: ["Fundraising", "CRM", "Automation"],
  categories: ["Product", "Growth"],
  timeline: "48 hours to prototype, 4 weeks to full release",
  status: "case-study",
  hero: {
    image: withBasePath("/images/projects/voyage-fund-hero.svg"),
    alt: "FounderFlow CRM interface"
  },
  kpis: [
    { label: "Time saved on updates", value: "-60%" },
    { label: "Investor response rate", value: "+48%" }
  ],
  gallery: [],
  publishedAt: "2024-06-18"
};

export default function VoyageFundStory() {
  return (
    <>
      <h2>Problem</h2>
      <p>
        Early-stage founders track investor conversations across docs, spreadsheets, and inboxes. Opportunity slipped through
        the cracks, and weekly updates stole time from shipping product.
      </p>

      <h2>Approach</h2>
      <p>
        We co-designed FounderFlow's CRM in a two-day sprint: Kanban-style investor tracking, AI-generated update drafts, and
        smart reminders that sync with founders' calendars. The prototype resonated so strongly that we built the production
        app on top of it with the same design system.
      </p>

      <h2>Outcome</h2>
      <p>
        FounderFlow teams now manage every investor touchpoint in one workspace. Updates that used to take hours are drafted in
        minutes, and founders have clear signal on who is leaning in, who needs nurturing, and what to send next.
      </p>
    </>
  );
}
