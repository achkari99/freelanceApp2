"use client";

import * as React from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { AnimatePresence, motion } from "framer-motion";

const icons = {
  light: Sun,
  dark: Moon,
  system: Monitor
};

export function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();
  const current = theme === "system" ? systemTheme ?? "system" : theme ?? "system";

  return (
    <div className="flex items-center gap-2" role="group" aria-label="Toggle theme">
      {(["light", "dark", "system"] as const).map((name) => {
        const Icon = icons[name];
        const isActive = current === name;
        return (
          <button
            key={name}
            type="button"
            onClick={() => setTheme(name)}
            className={`relative flex h-10 w-10 items-center justify-center rounded-full border border-slate-200/40 bg-white/10 text-slate-700 shadow-sm backdrop-blur transition hover:border-slate-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 dark:border-slate-800/60 dark:bg-slate-900/40 dark:text-slate-100`}
            aria-pressed={isActive}
          >
            <AnimatePresence initial={false} mode="popLayout">
              {isActive ? (
                <motion.span
                  key={name}
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.6, opacity: 0 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  <span className="sr-only">Switch to {name} theme</span>
                </motion.span>
              ) : (
                <motion.span
                  key={`${name}-inactive`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  <span className="sr-only">Switch to {name} theme</span>
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        );
      })}
    </div>
  );
}
