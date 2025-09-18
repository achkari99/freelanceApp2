import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact",
  description: "Reach the Resonant Studio team by email, phone, or Slack for new project inquiries."
};

const offices = [
  {
    city: "Toronto",
    time: "9am--5pm ET",
    address: "Remote-first (Eastern Time)"
  },
  {
    city: "Amsterdam",
    time: "9am--5pm CET",
    address: "Satellite team (Central Europe)"
  }
];

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20 lg:px-8">
      <header className="space-y-6">
        <Badge>Contact</Badge>
        <h1 className="font-display text-4xl tracking-tight text-slate-900 dark:text-white">Let&apos;s begin with a conversation.</h1>
        <p className="max-w-2xl text-lg text-slate-600 dark:text-slate-300">
          Tell us about your upcoming initiative, timeline, and what winning looks like. We typically respond within one business day.
        </p>
        <div className="flex flex-wrap gap-3 text-sm text-slate-600 dark:text-slate-300">
          <span className="inline-flex items-center gap-2"><Mail className="h-4 w-4" aria-hidden /> {siteConfig.links.email}</span>
          <span className="inline-flex items-center gap-2"><Phone className="h-4 w-4" aria-hidden /> +1 (647) 555-1234</span>
          <span className="inline-flex items-center gap-2"><Clock className="h-4 w-4" aria-hidden /> 24-hour response</span>
        </div>
        <Button asChild size="lg">
          <Link href="/start-a-project">Share your project</Link>
        </Button>
      </header>
      <section className="mt-16 grid gap-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:grid-cols-2">
        {offices.map((office) => (
          <div key={office.city} className="space-y-3">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">{office.city}</h2>
            <p className="inline-flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
              <MapPin className="h-4 w-4" aria-hidden /> {office.address}
            </p>
            <p className="inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <Clock className="h-4 w-4" aria-hidden /> {office.time}
            </p>
          </div>
        ))}
      </section>
    </div>
  );
}


