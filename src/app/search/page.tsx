import type { Metadata } from "next";
import { SearchClient } from "./search-client";
import { projectSummaries } from "content/work";
import { backstageSummaries } from "content/backstage";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Search",
  description: "Search prototypes, services, and lab notes across ACH."
};

type SearchItem = {
  type: "Build story" | "Service" | "Backstage";
  title: string;
  href: string;
  excerpt: string;
  tags?: string[];
};

export default function SearchPage() {
  const items: SearchItem[] = [
    ...projectSummaries.map<SearchItem>((project) => ({
      type: "Build story",
      title: project.title,
      href: `/work/${project.slug}`,
      excerpt: project.excerpt,
      tags: [...project.tags, ...project.services]
    })),
    ...services.map<SearchItem>((service) => ({
      type: "Service",
      title: service.name,
      href: `/services#${service.slug}`,
      excerpt: service.teaser,
      tags: service.deliverables
    })),
    ...backstageSummaries.map<SearchItem>((post) => ({
      type: "Backstage",
      title: post.title,
      href: `/backstage/${post.slug}`,
      excerpt: post.excerpt,
      tags: post.tags
    }))
  ];

  return <SearchClient items={items} />;
}
