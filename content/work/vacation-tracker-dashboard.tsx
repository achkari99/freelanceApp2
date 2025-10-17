import { withBasePath } from "@/lib/utils";
import type { Project } from "@/types/project";

export const project = {
  slug: "vacation-tracker-dashboard",
  title: "Vacation Tracker Dashboard",
  client: "Acme HR",
  excerpt:
    "A sleek HR dashboard prototype that visualises employee leave, upcoming holidays, and remaining PTO across teams.",
  services: ["UI/UX Design", "Web Development"],
  tags: ["HR Tech", "Dashboard", "Data visualisation"],
  categories: ["Product", "SaaS"],
  timeline: "4-day interface sprint",
  status: "case-study",
  featured: false,
  hero: {
    image: withBasePath("/images/projects/vacation-tracker-dashboard.png"),
    alt: "Vacation tracker dashboard highlighting employee leave metrics"
  },
  kpis: [
    { label: "Modules prototyped", value: "Dashboard • Calendar • Profile" },
    { label: "Teams covered", value: "All departments" },
    { label: "Delivery", value: "4 days" }
  ],
  gallery: [],
  publishedAt: "2025-10-15"
} satisfies Omit<Project, "body">;

export default function VacationTrackerDashboard() {
  return (
    <>
      <h2>Problem</h2>
      <p>
        The HR team lacked a unified view of leave requests and public holidays. Their spreadsheets could not highlight
        which teammates were off today, how much PTO remained, or which holidays were around the corner.
      </p>

      <h2>Approach</h2>
      <p>
        We mapped the essential HR insights—team availability, upcoming holidays, PTO breakdown—and designed an interface
        that surfaces them in a single glance. The prototype uses modular cards, donut charts, and calendar microinteractions
        so future back-end integrations can slot in with minimal rework.
      </p>

      <p>
        Explore the front-end prototype at{" "}
        <a href="https://vacation-detector-4nhi.vercel.app" target="_blank" rel="noreferrer">
          vacation-detector-4nhi.vercel.app
        </a>
        . This is a UI showcase only; it is not connected to production HR systems.
      </p>

      <h2>Outcome</h2>
      <p>
        The dashboard prototype aligned leadership on the data model for the upcoming HR SaaS rollout. Stakeholders can now
        validate workflows for leave approvals, calendar sync, and employee profiles before committing to integrations.
      </p>
    </>
  );
}
