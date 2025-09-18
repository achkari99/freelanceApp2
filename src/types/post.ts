import type { ComponentType } from "react";

export type BackstagePost = {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  tags: string[];
  body: ComponentType;
};

export type BackstagePostSummary = Omit<BackstagePost, "body">;
