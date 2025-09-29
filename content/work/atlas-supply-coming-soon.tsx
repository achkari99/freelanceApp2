import { withBasePath } from "@/lib/utils";
import type { Project } from "@/types/project";

export const project = {
  slug: "launchpad-workspace",
  title: "LaunchPad Partner Workspace",
  client: "LaunchPad",
  excerpt:
    "A shared workspace for venture partners to spin up experiments with ACH. Full case study is in progress.",
  services: ["48H Prototypes", "Consulting & Digital Transformation"],
  tags: ["Venture", "Collaboration"],
  categories: ["Platform"],
  timeline: "In rollout",
  status: "coming-soon",
  hero: {
    image: withBasePath("/images/projects/coming-soon-1.svg"),
    alt: "LaunchPad workspace preview"
  },
  kpis: [],
  gallery: [],
  publishedAt: "2024-09-30"
} satisfies Omit<Project, "body">;

export default function AtlasSupplyComingSoon() {
  return (
    <p>
      <em>
        A full write-up is underway. Join Lab Notes or reach out to see the prototypes and partner playbooks before
        release.
      </em>
    </p>
  );
}
