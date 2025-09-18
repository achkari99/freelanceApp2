import type { ComponentType } from "react";

export type ProjectStatus = "case-study" | "coming-soon";

export type ProjectMetric = {
  label: string;
  value: string;
};

export type ProjectGalleryItem = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
};

export type Project = {
  slug: string;
  title: string;
  client: string;
  excerpt: string;
  services: string[];
  tags: string[];
  categories: string[];
  timeline: string;
  status: ProjectStatus;
  featured?: boolean;
  hero: {
    image: string;
    alt: string;
  };
  kpis: ProjectMetric[];
  gallery: ProjectGalleryItem[];
  publishedAt: string;
  body: ComponentType;
};

export type ProjectSummary = Omit<Project, "body">;
