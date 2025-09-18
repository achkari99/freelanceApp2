import type { Metadata } from "next";
import { WorkGrid } from "@/components/work/work-grid";
import { projectSummaries, projectFilters } from "content/work";

export const metadata: Metadata = {
  title: "Our Work",
  description: "Filter case studies across product, brand, and growth to see how Resonant Studio drives measurable outcomes."
};

export default function WorkPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
      <WorkGrid
        projects={projectSummaries}
        categories={projectFilters.categories}
        services={projectFilters.services}
        tags={projectFilters.tags}
      />
    </div>
  );
}

