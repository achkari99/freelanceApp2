import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-[rgb(var(--background))] py-16 dark:border-slate-800">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[2fr_1fr] lg:px-8">
        <div className="space-y-6">
          <div>
            <p className="font-display text-2xl font-semibold tracking-tight">Let&apos;s build what&apos;s next.</p>
            <p className="mt-3 max-w-xl text-base text-slate-600 dark:text-slate-300">
              Resonant Studio partners with founders and marketing leaders to ship digital products, purposeful brands, and campaigns that move audiences.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-slate-600 dark:text-slate-300">
            <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4" aria-hidden />Remote, global</span>
            <Link href={`mailto:${siteConfig.links.email}`} className="inline-flex items-center gap-2 hover:text-sky-600 dark:hover:text-sky-400">
              <Mail className="h-4 w-4" aria-hidden />
              {siteConfig.links.email}
            </Link>
            <Link href="tel:+16475551234" className="inline-flex items-center gap-2 hover:text-sky-600 dark:hover:text-sky-400">
              <Phone className="h-4 w-4" aria-hidden />
              +1 (647) 555-1234
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6 text-sm text-slate-600 dark:text-slate-300">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-400">Company</h3>
            <ul className="mt-4 space-y-2">
              {siteConfig.navigation.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-sky-600 dark:hover:text-sky-400">
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
                <Link href={siteConfig.links.twitter} className="hover:text-sky-600 dark:hover:text-sky-400">
                  Twitter
                </Link>
              </li>
              <li>
                <Link href={siteConfig.links.linkedin} className="hover:text-sky-600 dark:hover:text-sky-400">
                  LinkedIn
                </Link>
              </li>
              <li>
                <Link href="/start-a-project" className="hover:text-sky-600 dark:hover:text-sky-400">
                  Start a project
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-16 px-6 text-sm text-slate-500 dark:text-slate-500 lg:px-8">
        <p>&copy; {new Date().getFullYear()} Resonant Studio. All rights reserved.</p>
      </div>
    </footer>
  );
}


