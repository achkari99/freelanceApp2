import type { BackstagePost, BackstagePostSummary } from "@/types/post";

import OperatingPrinciples, { post as operatingPrinciples } from "./operating-principles.mdx";
import StorytellingFramework, { post as storytellingFramework } from "./storytelling-framework.mdx";
import WeeklyFieldNotes, { post as weeklyFieldNotes } from "./weekly-field-notes.mdx";

const modules = [
  { post: operatingPrinciples, body: OperatingPrinciples },
  { post: storytellingFramework, body: StorytellingFramework },
  { post: weeklyFieldNotes, body: WeeklyFieldNotes }
] satisfies { post: Omit<BackstagePost, "body">; body: BackstagePost["body"] }[];

export const backstagePosts: BackstagePost[] = modules
  .map(({ post, body }) => ({ ...post, body }))
  .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));

export const backstageSummaries: BackstagePostSummary[] = backstagePosts.map(({ body, ...post }) => post);

export function getPostBySlug(slug: string) {
  return backstagePosts.find((entry) => entry.slug === slug);
}
