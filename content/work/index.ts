import type { Project, ProjectSummary } from "@/types/project";

import BrightwavePage, { project as brightwave } from "./brightwave-platform.mdx";
import NorthBeaconPage, { project as northBeacon } from "./north-beacon-redesign.mdx";
import NovaCommercePage, { project as novaCommerce } from "./nova-commerce-launch.mdx";
import EtherLabsPage, { project as etherLabs } from "./ether-labs-sprint.mdx";
import VoyageFundPage, { project as voyageFund } from "./voyage-fund-story.mdx";
import SunsetFmPage, { project as sunsetFm } from "./sunset-fm-app.mdx";
import AtlasSupplyPage, { project as atlasSupply } from "./atlas-supply-coming-soon.mdx";
import GlacierBioPage, { project as glacierBio } from "./glacier-bio-coming-soon.mdx";

const modules = [
  { project: brightwave, body: BrightwavePage },
  { project: northBeacon, body: NorthBeaconPage },
  { project: novaCommerce, body: NovaCommercePage },
  { project: etherLabs, body: EtherLabsPage },
  { project: voyageFund, body: VoyageFundPage },
  { project: sunsetFm, body: SunsetFmPage },
  { project: atlasSupply, body: AtlasSupplyPage },
  { project: glacierBio, body: GlacierBioPage }
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
