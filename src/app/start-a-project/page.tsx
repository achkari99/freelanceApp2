import type { Metadata } from "next";
import { StartProjectForm } from "@/components/forms/start-project-form";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Start a project",
  description: "Share what you&apos;re building and we&apos;ll craft a tailored engagement across strategy, design, and growth."
};

export default function StartAProjectPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20 lg:px-8">
      <header className="space-y-6">
        <Badge>Start a project</Badge>
        <h1 className="font-display text-4xl tracking-tight text-slate-900 dark:text-white">Tell us about your next initiative.</h1>
        <p className="max-w-2xl text-lg text-slate-600 dark:text-slate-300">
          Fill out the quick brief below. We will review and respond with a tailored approach, including a Slack channel and kickoff call invite.
        </p>
      </header>
      <div className="mt-12">
        <StartProjectForm />
      </div>
    </div>
  );
}


