import type { MetadataRoute } from "next";
import { projects } from "content/work";
import { backstagePosts } from "content/backstage";
import { siteConfig } from "@/lib/site-config";

const baseUrl = siteConfig.url.replace(/\/$/, "");

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/our-work",
    "/services",
    "/about",
    "/backstage",
    "/contact",
    "/start-a-project",
    "/search"
  ].map((path) => ({
    url: `${baseUrl}${path || "/"}`,
    lastModified: new Date().toISOString()
  }));

  const projectRoutes = projects.map((project) => ({
    url: `${baseUrl}/work/${project.slug}`,
    lastModified: project.publishedAt
  }));

  const backstageRoutes = backstagePosts.map((post) => ({
    url: `${baseUrl}/backstage/${post.slug}`,
    lastModified: post.publishedAt
  }));

  return [...staticRoutes, ...projectRoutes, ...backstageRoutes];
}
