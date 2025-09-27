import type { Metadata } from "next";
import { WorkGrid } from "@/components/work/work-grid";
import { projectSummaries, projectFilters } from "content/work";

export const metadata: Metadata = {
  title: "Results",
  description: "Explore ACH prototypes that became production platforms across AI, SaaS, and operations."
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

