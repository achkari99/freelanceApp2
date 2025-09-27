import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MapPin, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact ACH",
  description: "Reach the ACH 48H Prototype team at RightMind Lab to start your next build or ask a question."
};

const offices = [
  {
    city: "Casablanca",
    time: "48H prototype window",
    address: "Remote lab HQ (GMT+1)"
  },
  {
    city: "Global partners",
    time: "Always-on collaboration",
    address: "Distributed across North America & Europe"
  }
];

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20 lg:px-8">
      <header className="space-y-6">
        <Badge>Contact ACH</Badge>
        <h1 className="font-display text-4xl tracking-tight text-slate-900 dark:text-white">Let&apos;s kick off your 48H prototype.</h1>
        <p className="max-w-2xl text-lg text-slate-600 dark:text-slate-300">
          Tell us what you are building, who will use it, and what success looks like. We respond within a few hours to align
          on scope and schedule your 48-hour sprint.
        </p>
        <div className="flex flex-wrap gap-3 text-sm text-slate-600 dark:text-slate-300">
          <span className="inline-flex items-center gap-2">
            <Mail className="h-4 w-4" aria-hidden /> {siteConfig.links.email}
          </span>
          <span className="inline-flex items-center gap-2">
            <Clock className="h-4 w-4" aria-hidden /> Rapid response · 7 days a week
          </span>
        </div>
        <Button asChild size="lg">
          <Link href="/start-a-project">Request your 48H prototype</Link>
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


