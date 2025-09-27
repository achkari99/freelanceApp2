import Link from "next/link";
import { Mail, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-[rgb(var(--background))] py-16 text-slate-600 dark:border-slate-800 dark:text-slate-300">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[1.8fr_1fr] lg:px-8">
        <div className="space-y-6">
          <div className="space-y-3">
            <p className="font-display text-2xl text-slate-900 dark:text-white">Build the thing the room needs to see.</p>
            <p className="max-w-xl text-base">
              ACH delivers 48 hour prototypes, AI copilots, and launch-ready platforms with the documentation your team needs to scale.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <Link
              href={`mailto:${siteConfig.links.email}`}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 font-medium transition hover:border-slate-300 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:hover:border-slate-600"
            >
              <Mail className="h-4 w-4" aria-hidden />
              {siteConfig.links.email}
            </Link>
            <Link
              href="/start-a-project"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:border-slate-300 hover:text-sky-600 dark:border-slate-700 dark:text-white dark:hover:border-slate-500 dark:hover:text-sky-300"
            >
              Start a project
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8 text-sm">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-400">Navigation</h3>
            <ul className="mt-4 space-y-2">
              {siteConfig.navigation.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition hover:text-sky-600 dark:hover:text-sky-400">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-400">Connect</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href={siteConfig.links.twitter} className="transition hover:text-sky-600 dark:hover:text-sky-400">
                  Twitter
                </Link>
              </li>
              <li>
                <Link href={siteConfig.links.linkedin} className="transition hover:text-sky-600 dark:hover:text-sky-400">
                  LinkedIn
                </Link>
              </li>
              <li>
                <Link href="/contact" className="transition hover:text-sky-600 dark:hover:text-sky-400">
                  Contact the lab
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-16 px-6 text-sm text-slate-500 dark:text-slate-500 lg:px-8">
        <p>&copy; {year} {siteConfig.name}. All rights reserved.</p>
      </div>
    </footer>
  );
}
