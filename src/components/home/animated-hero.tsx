"use client";

import * as React from "react";
import { cn, preferReducedMotion, withBasePath } from "@/lib/utils";

const VANTA_THREE_SRC = withBasePath("/animations/animation2.js");
const VANTA_RINGS_SRC = withBasePath("/animations/animation3.js");

type VantaInstance = {
  destroy?: () => void;
};

type AnimatedHeroProps = {
  className?: string;
  options?: Record<string, unknown>;
};

const loadScript = (src: string) => {
  return new Promise<void>((resolve, reject) => {
    if (typeof document === "undefined") {
      resolve();
      return;
    }

    const existing = document.querySelector<HTMLScriptElement>(`script[src="${src}"]`);
    if (existing) {
      if (existing.dataset.loaded === "true") {
        resolve();
        return;
      }

      const handleLoad = () => {
        existing.dataset.loaded = "true";
        existing.removeEventListener("load", handleLoad);
        resolve();
      };

      existing.addEventListener("load", handleLoad, { once: true });
      existing.addEventListener("error", reject, { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = src;
    script.async = true;

    const handleLoad = () => {
      script.dataset.loaded = "true";
      resolve();
    };

    script.addEventListener("load", handleLoad, { once: true });
    script.addEventListener("error", reject, { once: true });

    document.body.appendChild(script);
  });
};

export function AnimatedHero({ className, options }: AnimatedHeroProps = {}) {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const effectRef = React.useRef<VantaInstance | null>(null);
  const shouldReduceMotion = preferReducedMotion();
  const [hasEnteredView, setHasEnteredView] = React.useState(false);

  React.useEffect(() => {
    const element = containerRef.current;
    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const isIntersecting = entries.some((entry) => entry.isIntersecting);
        if (isIntersecting) {
          setHasEnteredView(true);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  React.useEffect(() => {
    if (shouldReduceMotion || !hasEnteredView || effectRef.current || !containerRef.current) {
      return;
    }

    let isCancelled = false;

    const init = async () => {
      try {
        await loadScript(VANTA_THREE_SRC);
        await loadScript(VANTA_RINGS_SRC);

        if (isCancelled || !containerRef.current) {
          return;
        }

        const vanta = (window as unknown as {
          VANTA?: { RINGS?: (options: Record<string, unknown>) => VantaInstance };
        }).VANTA;

        if (vanta?.RINGS) {
          const baseOptions: Record<string, unknown> = {
            el: containerRef.current,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.0,
            minWidth: 200.0,
            scale: 1.0,
            scaleMobile: 1.0,
            backgroundColor: 0x0b1526,
            color: 0x1f9ef5
          };

          effectRef.current = vanta.RINGS({ ...baseOptions, ...(options ?? {}) });
        }
      } catch (error) {
        console.error("Failed to initialize Vanta background", error);
      }
    };

    init();

    return () => {
      isCancelled = true;
      if (effectRef.current?.destroy) {
        effectRef.current.destroy();
        effectRef.current = null;
      }
    };
  }, [hasEnteredView, options, shouldReduceMotion]);

  return (
    <div ref={containerRef} className={cn("pointer-events-none relative h-full w-full", className)} aria-hidden>
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/0 via-slate-900/25 to-slate-950/60" />
    </div>
  );
}
