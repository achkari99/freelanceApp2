"use client";

import * as React from "react";
import { preferReducedMotion } from "@/lib/utils";

const VANTA_THREE_SRC = "/animations/animation2.js";
const VANTA_RINGS_SRC = "/animations/animation3.js";

type VantaInstance = {
  destroy?: () => void;
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

      const onLoad = () => {
        existing.dataset.loaded = "true";
        existing.removeEventListener("load", onLoad);
        resolve();
      };

      existing.addEventListener("load", onLoad, { once: true });
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

export function AnimatedHero() {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const shouldReduceMotion = preferReducedMotion();

  React.useEffect(() => {
    if (shouldReduceMotion) {
      return;
    }

    let isCancelled = false;
    let effect: VantaInstance | undefined;

    const init = async () => {
      try {
        await loadScript(VANTA_THREE_SRC);
        await loadScript(VANTA_RINGS_SRC);

        if (isCancelled || !containerRef.current) {
          return;
        }

        const vanta = (window as unknown as { VANTA?: { RINGS?: (options: Record<string, unknown>) => VantaInstance } }).VANTA;
        if (vanta?.RINGS) {
          effect = vanta.RINGS({
            el: containerRef.current,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.0,
            minWidth: 200.0,
            scale: 1.0,
            scaleMobile: 1.0
          });
        }
      } catch (error) {
        console.error("Failed to initialize Vanta background", error);
      }
    };

    init();

    return () => {
      isCancelled = true;
      if (effect?.destroy) {
        effect.destroy();
      }
    };
  }, [shouldReduceMotion]);

  return (
    <div ref={containerRef} className="pointer-events-none relative h-full w-full">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/0 via-slate-900/20 to-slate-950/50" />
    </div>
  );
}
