"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

import { siteConfig } from "@/lib/site-config";
import { cn, withBasePath } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [isOpen, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const mobileNavRef = React.useRef<HTMLDivElement | null>(null);
  const mobileTriggerRef = React.useRef<HTMLButtonElement | null>(null);
  const previousFocusRef = React.useRef<HTMLElement | null>(null);
  const previousBodyOverflowRef = React.useRef<string>("");

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

  React.useEffect(() => {
    if (!isOpen) {
      return;
    }

    previousFocusRef.current = document.activeElement as HTMLElement;
    previousBodyOverflowRef.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusableSelectors =
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

    const menu = mobileNavRef.current;
    const focusable = menu?.querySelectorAll<HTMLElement>(focusableSelectors) ?? [];

    const firstFocusable = focusable[0];
    const lastFocusable = focusable[focusable.length - 1];

    firstFocusable?.focus({ preventScroll: true });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        return;
      }

      if (event.key === "Tab" && focusable.length > 0) {
        if (event.shiftKey) {
          if (document.activeElement === firstFocusable) {
            event.preventDefault();
            lastFocusable?.focus({ preventScroll: true });
          }
        } else if (document.activeElement === lastFocusable) {
          event.preventDefault();
          firstFocusable?.focus({ preventScroll: true });
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousBodyOverflowRef.current;
      previousFocusRef.current?.focus({ preventScroll: true });
      previousFocusRef.current = null;
    };
  }, [isOpen]);

  const headerClasses = cn(
    "sticky top-0 z-40 border-b border-slate-200/70 bg-[rgb(var(--background)/0.92)] backdrop-blur supports-[backdrop-filter]:bg-[rgb(var(--background)/0.8)] transition-shadow duration-300 dark:border-slate-800/60",
    scrolled && "shadow-[0_14px_40px_-25px_rgba(15,23,42,0.45)]"
  );

  const CTA = siteConfig.actions[0];
  const isCTAActive = pathname === CTA?.href;

  return (
    <header className={headerClasses}>
      <div className="flex w-full items-center gap-4 px-safe pb-4 pt-4 pt-safe sm:px-6 md:px-10 lg:px-12">
        <div className="flex flex-shrink-0 items-center gap-3">
          <Link href="/" className="flex items-center gap-2 font-display text-lg tracking-tight">
            <Image
              src={withBasePath("/logo.png")}
              alt="ACH"
              width={120}
              height={120}
              priority
              className="h-10 w-auto"
            />
            <span className="leading-none">{siteConfig.name}</span>
            <span className="sr-only">Return home</span>
          </Link>
        </div>

        <nav className="hidden flex-1 flex-wrap items-center justify-center gap-3 md:flex" aria-label="Primary">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(`${item.href}/`));
            const isLabNotes = item.href === "/backstage";
            const linkClasses = cn(
              "relative inline-flex min-h-[2.75rem] items-center justify-center rounded-full px-5 py-2 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500",
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

        <div className="ml-auto flex flex-shrink-0 items-center gap-3">
          {CTA ? (
            <Link
              href={CTA.href}
              className={cn(
                "hidden min-h-[2.75rem] items-center justify-center rounded-full px-5 py-2 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 md:inline-flex",
                isCTAActive
                  ? "bg-sky-600 text-white shadow-[0_18px_55px_-28px_rgba(37,99,235,0.55)] hover:bg-sky-500 dark:bg-sky-500 dark:hover:bg-sky-400"
                  : "bg-slate-900 text-white shadow-sm hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
              )}
              aria-current={isCTAActive ? "page" : undefined}
            >
              {CTA.label}
            </Link>
          ) : null}
          <button
            type="button"
            ref={mobileTriggerRef}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:hover:text-white md:hidden"
            onClick={() => setOpen((prev) => !prev)}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            aria-haspopup="dialog"
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
            role="dialog"
            aria-modal="true"
            aria-label="Primary"
            id="mobile-navigation"
          >
            <div
              ref={mobileNavRef}
              className="flex flex-col gap-2 border-t border-slate-200 bg-[rgb(var(--background))]/98 px-5 pb-safe pt-4 shadow-[0_25px_50px_-35px_rgba(15,23,42,0.45)] backdrop-blur dark:border-slate-800"
            >
              <span className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-400 dark:text-slate-500">
                Navigate
              </span>
              <ul className="flex flex-col gap-1" data-focus-region>
                {navigationItems.map((item) => {
                  const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(`${item.href}/`));
                  const isLabNotes = item.href === "/backstage";
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          "block rounded-2xl px-4 py-3 text-base font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500",
                          "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-200 dark:hover:bg-white/10 dark:hover:text-white",
                          isActive &&
                            (isLabNotes
                              ? "bg-sky-600 text-white dark:bg-sky-500"
                              : "bg-slate-900/5 text-slate-900 dark:bg-white/10 dark:text-white")
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
                        "mt-1 block rounded-2xl px-4 py-3 text-base font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500",
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
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}






