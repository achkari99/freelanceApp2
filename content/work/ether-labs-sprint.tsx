import { withBasePath } from "@/lib/utils";
import type { Project } from "@/types/project";

export const project = {
  slug: "labops-portal",
  title: "LabOps Management Portal",
  client: "Atlas Research Clinic",
  excerpt:
    "Digitising lab requests, compliance, and instrumentation logs in a single portal delivered from prototype to production in weeks.",
  services: ["48H Prototypes", "Web & Mobile Development", "Consulting & Digital Transformation"],
  tags: ["Healthcare", "Compliance", "Operations"],
  categories: ["Platform"],
  timeline: "48 hours to prototype, 7 weeks to rollout",
  status: "case-study",
  hero: {
    image: withBasePath("/images/projects/ether-labs-hero.svg"),
    alt: "Lab operations management interface"
  },
  kpis: [
    { label: "Ticket resolution", value: "-58%" },
    { label: "Audit prep time", value: "-72%" }
  ],
  gallery: [],
  publishedAt: "2024-02-28"
} satisfies Omit<Project, "body">;

export default function EtherLabsSprint() {
  return (
    <>
      <h2>Problem</h2>
      <p>
        Atlas Research Clinic coordinated experiments through email threads, clipboards, and ad hoc spreadsheets. Compliance
        risk mounted and technicians spent more time updating logs than running assays.
      </p>

      <h2>Approach</h2>
      <p>
        During a 48H sprint ACH mapped every lab ritual, prototyped a consolidated portal, and validated it with technicians.
        We connected to instrument APIs, designed SOP-driven workflows, and automated audit trails with immutable histories
        and access control.
      </p>

      <h2>Outcome</h2>
      <p>
        The clinic now runs on LabOps: fewer manual updates, instant compliance exports, and happier teams. The product
        continues to expand with modules for inventory, reagent forecasting, and partner reporting—all built on the same
        foundation from our first prototype.
      </p>
    </>
  );
}
