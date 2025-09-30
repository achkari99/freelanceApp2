"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

import { siteConfig } from "@/lib/site-config";
import { ThemeToggle } from "./theme-toggle";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [isOpen, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  const navigationItems = React.useMemo(() => [{ href: "/", label: "Main" }, ...siteConfig.navigation], []);

  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 8);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const headerClasses = cn(
    "sticky top-0 z-40 border-b border-slate-200/70 bg-[rgb(var(--background)/0.92)] backdrop-blur supports-[backdrop-filter]:bg-[rgb(var(--background)/0.8)] transition-shadow duration-300 dark:border-slate-800/60",
    scrolled && "shadow-[0_14px_40px_-25px_rgba(15,23,42,0.45)]"
  );

  const CTA = siteConfig.actions[0];
  const isCTAActive = pathname === CTA?.href;

  return (
    <header className={headerClasses}>
      <div className="flex w-full items-center gap-4 px-6 py-4 md:px-10 lg:px-12">
        <div className="flex flex-shrink-0 items-center gap-3">
          <Link href="/" className="flex items-center gap-2 font-display text-lg tracking-tight">
            <span
              aria-hidden
              className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-sky-500 text-sm font-semibold text-white shadow-[0_10px_30px_-20px_rgba(14,165,233,0.8)]"
            >
              ACH
            </span>
            <span className="leading-none">{siteConfig.name}</span>
            <span className="sr-only">Return home</span>
          </Link>
        </div>

        <nav className="hidden flex-1 flex-wrap items-center justify-center gap-2 md:flex" aria-label="Primary">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(`${item.href}/`));
            const isLabNotes = item.href === "/backstage";
            const linkClasses = cn(
              "relative inline-flex min-h-[2.5rem] items-center justify-center rounded-full px-4 py-2 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500",
              "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white",
              isActive &&
                (isLabNotes
                  ? "bg-sky-600 text-white shadow-[0_18px_50px_-30px_rgba(37,99,235,0.6)] dark:bg-sky-500"
                  : "text-slate-900 dark:text-white")
            );

            return (
              <Link key={item.href} href={item.href} className={linkClasses} aria-current={isActive ? "page" : undefined}>
                <span>{item.label}</span>
                {isActive && !isLabNotes ? (
                  <motion.span
                    layoutId="header-active-pill"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 420, damping: 28, mass: 0.8 }}
                    className="absolute inset-0 -z-10 rounded-full bg-sky-100/90 shadow-[0_18px_50px_-30px_rgba(56,189,248,0.75)] dark:bg-sky-500/25 dark:shadow-[0_18px_50px_-32px_rgba(56,189,248,0.6)]"
                    aria-hidden
                  />
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="flex flex-shrink-0 items-center gap-3">
          {CTA ? (
            <Link
              href={CTA.href}
              className={cn(
                "hidden rounded-full px-4 py-2 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 md:inline-flex",
                isCTAActive
                  ? "bg-sky-600 text-white shadow-[0_18px_55px_-28px_rgba(37,99,235,0.55)] hover:bg-sky-500 dark:bg-sky-500 dark:hover:bg-sky-400"
                  : "bg-slate-900 text-white shadow-sm hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
              )}
              aria-current={isCTAActive ? "page" : undefined}
            >
              {CTA.label}
            </Link>
          ) : null}
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:hover:text-white md:hidden"
            onClick={() => setOpen((prev) => !prev)}
            aria-expanded={isOpen}
            aria-label="Toggle navigation"
          >
            <AnimatePresence initial={false} mode="wait">
              <motion.span
                key={isOpen ? "close" : "open"}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.18 }}
              >
                {isOpen ? <X className="h-4 w-4" aria-hidden /> : <Menu className="h-4 w-4" aria-hidden />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen ? (
          <motion.nav
            key="mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden"
          >
            <ul className="flex flex-col gap-1 border-t border-slate-200 bg-[rgb(var(--background))] px-6 py-4 dark:border-slate-800 md:px-10 lg:px-12">
              {navigationItems.map((item) => {
                const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(`${item.href}/`));
                const isLabNotes = item.href === "/backstage";
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "block rounded-lg px-4 py-2 text-base font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500",
                        "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white",
                        isActive && (isLabNotes ? "bg-sky-600 text-white dark:bg-sky-500" : "bg-slate-900/5 text-slate-900 dark:bg-white/10 dark:text-white")
                      )}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
              <li>
                {CTA ? (
                  <Link
                    href={CTA.href}
                    className={cn(
                      "block rounded-lg px-4 py-2 text-base font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500",
                      isCTAActive
                        ? "bg-sky-600 text-white hover:bg-sky-500 dark:bg-sky-500 dark:hover:bg-sky-400"
                        : "bg-slate-900 text-white hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
                    )}
                    aria-current={isCTAActive ? "page" : undefined}
                  >
                    {CTA.label}
                  </Link>
                ) : null}
              </li>
            </ul>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
