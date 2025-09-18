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

  return (
    <header className={headerClasses}>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-display text-lg tracking-tight">
          <span aria-hidden className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-sky-500 text-sm font-semibold text-white shadow-[0_10px_30px_-20px_rgba(14,165,233,0.8)]">
            RS
          </span>
          <span className="leading-none">Resonant Studio</span>
          <span className="sr-only">Return home</span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {siteConfig.navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition hover:text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 dark:text-slate-300 dark:hover:text-white",
                  isActive && "text-slate-900 dark:text-white"
                )}
                aria-current={isActive ? "page" : undefined}
              >
                <span>{item.label}</span>
                {isActive ? (
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
        <div className="flex items-center gap-3">
          <Link
            href={siteConfig.actions[0]?.href ?? "/start-a-project"}
            className="hidden rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200 md:inline-flex"
          >
            {siteConfig.actions[0]?.label ?? "Start a project"}
          </Link>
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
            <ul className="flex flex-col gap-1 border-t border-slate-200 bg-[rgb(var(--background))] px-6 py-4 dark:border-slate-800">
              {siteConfig.navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "block rounded-lg px-4 py-2 text-base font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white",
                        isActive && "bg-slate-900/5 text-slate-900 dark:bg-white/10 dark:text-white"
                      )}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
              <li>
                <Link
                  href={siteConfig.actions[0]?.href ?? "/start-a-project"}
                  className="block rounded-lg bg-slate-900 px-4 py-2 text-base font-semibold text-white hover:bg-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-300"
                >
                  {siteConfig.actions[0]?.label ?? "Start a project"}
                </Link>
              </li>
            </ul>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
