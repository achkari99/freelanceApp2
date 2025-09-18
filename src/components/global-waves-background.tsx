"use client";

import * as React from "react";
import { preferReducedMotion } from "@/lib/utils";

const WAVES_THREE_SRC = "/animations/waves-three.js";
const WAVES_EFFECT_SRC = "/animations/waves-effect.js";

type VantaWavesInstance = {
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

export function GlobalWavesBackground() {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const shouldReduceMotion = preferReducedMotion();

  React.useEffect(() => {
    if (shouldReduceMotion) {
      return;
    }

    let effect: VantaWavesInstance | undefined;
    let isCancelled = false;

    const init = async () => {
      try {
        await loadScript(WAVES_THREE_SRC);
        await loadScript(WAVES_EFFECT_SRC);

        if (isCancelled || !containerRef.current) {
          return;
        }

        const vanta = (window as unknown as { VANTA?: { WAVES?: (options: Record<string, unknown>) => VantaWavesInstance } }).VANTA;
        if (vanta?.WAVES) {
          effect = vanta.WAVES({
            el: containerRef.current,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.0,
            minWidth: 200.0,
            scale: 1.0,
            scaleMobile: 1.0,
            color: 0x021117
          });
        }
      } catch (error) {
        console.error("Failed to initialize global Vanta background", error);
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

  return <div ref={containerRef} className="pointer-events-none fixed inset-0 -z-10" aria-hidden />;
}
