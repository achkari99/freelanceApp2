import { describe, expect, it } from "vitest";
import { projects, projectFilters } from "content/work";
import { backstagePosts } from "content/backstage";
import { services } from "@/data/services";
import { startProjectSchema } from "@/lib/validation";

const toDate = (value: string) => new Date(value).getTime();

describe("content integrity", () => {
  it("orders projects by published date desc", () => {
    const published = projects.map((project) => project.publishedAt);
    const sorted = [...published].sort((a, b) => toDate(b) - toDate(a));
    expect(published).toEqual(sorted);
  });

  it("provides at least six live case studies and two coming soon", () => {
    const live = projects.filter((project) => project.status === "case-study");
    const comingSoon = projects.filter((project) => project.status === "coming-soon");
    expect(live.length).toBeGreaterThanOrEqual(6);
    expect(comingSoon.length).toBeGreaterThanOrEqual(2);
  });

  it("exposes filters for categories, services, and tags", () => {
    expect(projectFilters.categories.length).toBeGreaterThan(0);
    expect(projectFilters.services.length).toBeGreaterThan(0);
    expect(projectFilters.tags.length).toBeGreaterThan(0);
  });

  it("sorts backstage posts by published date desc", () => {
    const published = backstagePosts.map((post) => post.publishedAt);
    const sorted = [...published].sort((a, b) => toDate(b) - toDate(a));
    expect(published).toEqual(sorted);
  });

  it("matches services referenced in filters", () => {
    services.forEach((service) => {
      expect(projectFilters.services).toContain(service.name);
    });
  });

  it("validates a sample start project submission", () => {
    const result = startProjectSchema.safeParse({
      name: "Jordan Rivera",
      email: "jordan@example.com",
      company: "Example Co",
      timeline: "June",
      services: [services[0]?.name ?? "Product Strategy"],
      budget: "$60k--$90k",
      description: "Launching a new product line and need strategy through launch.",
      hear: "Referral",
      slackChannel: "#launch",
      slackInvite: true
    });

    expect(result.success).toBe(true);
  });
});
