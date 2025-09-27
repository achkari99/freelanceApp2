import type { Project, ProjectSummary } from "@/types/project";

import RightMindModelPage, { project as rightmindModel } from "./brightwave-platform.mdx";
import SuperAIPage, { project as superAI } from "./north-beacon-redesign.mdx";
import StockFlowPage, { project as stockFlow } from "./nova-commerce-launch.mdx";
import LabOpsPage, { project as labOps } from "./ether-labs-sprint.mdx";
import FounderFlowPage, { project as founderFlow } from "./voyage-fund-story.mdx";
import SuperAIMobilePage, { project as superAiMobile } from "./sunset-fm-app.mdx";
import LaunchPadPage, { project as launchPad } from "./atlas-supply-coming-soon.mdx";
import InsightCopilotPage, { project as insightCopilot } from "./glacier-bio-coming-soon.mdx";

const modules = [
  { project: rightmindModel, body: RightMindModelPage },
  { project: superAI, body: SuperAIPage },
  { project: stockFlow, body: StockFlowPage },
  { project: labOps, body: LabOpsPage },
  { project: founderFlow, body: FounderFlowPage },
  { project: superAiMobile, body: SuperAIMobilePage },
  { project: launchPad, body: LaunchPadPage },
  { project: insightCopilot, body: InsightCopilotPage }
] satisfies { project: Omit<Project, "body">; body: Project["body"] }[];

export const projects: Project[] = modules
  .map(({ project, body }) => ({ ...project, body }))
  .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));

export const projectSummaries: ProjectSummary[] = projects.map(({ body, ...project }) => project);

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getAdjacentProjects(slug: string) {
  const index = projects.findIndex((project) => project.slug === slug);
  return {
    next: index > 0 ? projects[index - 1] : null,
    previous: index < projects.length - 1 ? projects[index + 1] : null
  };
}

export const projectFilters = {
  categories: Array.from(new Set(projects.flatMap((project) => project.categories))).sort(),
  services: Array.from(new Set(projects.flatMap((project) => project.services))).sort(),
  tags: Array.from(new Set(projects.flatMap((project) => project.tags))).sort()
};
