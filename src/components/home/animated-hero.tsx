"use client";

import * as React from "react";
import { cn, preferReducedMotion, withBasePath } from "@/lib/utils";

const VANTA_EFFECTS = {
  rings: {
    threeSrc: withBasePath("/animations/animation2.js"),
    effectSrc: withBasePath("/animations/animation3.js"),
    factory: "RINGS" as const,
    baseOptions: {
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.0,
      minWidth: 200.0,
      scale: 1.0,
      scaleMobile: 1.0,
      backgroundAlpha: 0,
      color: 0x1f9ef5
    }
  },
  waves: {
    threeSrc: withBasePath("/animations/waves-three.js"),
    effectSrc: withBasePath("/animations/waves-effect.js"),
    factory: "WAVES" as const,
    baseOptions: {
      mouseControls: false,
      touchControls: false,
      gyroControls: false,
      minHeight: 200.0,
      minWidth: 200.0,
      scale: 1.0,
      scaleMobile: 1.0,
      backgroundAlpha: 0,
      color: 0x0ea5e9,
      shininess: 30.0,
      waveHeight: 18.0,
      waveSpeed: 0.75,
      zoom: 0.8
    }
  }
} satisfies Record<string, {
  threeSrc: string;
  effectSrc: string;
  factory: string;
  baseOptions: Record<string, unknown>;
}>;

type VantaEffectKey = keyof typeof VANTA_EFFECTS;

type VantaInstance = {
  destroy?: () => void;
};

type AnimatedHeroProps = {
  className?: string;
  options?: Record<string, unknown>;
  effect?: VantaEffectKey;
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

export function AnimatedHero({ className, options, effect = "rings" }: AnimatedHeroProps = {}) {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const effectRef = React.useRef<VantaInstance | null>(null);
  const shouldReduceMotion = preferReducedMotion();
  const [hasEnteredView, setHasEnteredView] = React.useState(false);
  const effectConfig = VANTA_EFFECTS[effect] ?? VANTA_EFFECTS.rings;

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
    if (shouldReduceMotion || !hasEnteredView || !containerRef.current) {
      return;
    }

    let isCancelled = false;

    const init = async () => {
      try {
        await loadScript(effectConfig.threeSrc);
        await loadScript(effectConfig.effectSrc);

        if (isCancelled || !containerRef.current) {
          return;
        }

        const vanta = (window as unknown as {
          VANTA?: Record<string, (config: Record<string, unknown>) => VantaInstance>;
        }).VANTA;

        const initializer = vanta?.[effectConfig.factory];

        if (initializer) {
          const baseOptions = {
            ...effectConfig.baseOptions,
            el: containerRef.current
          } satisfies Record<string, unknown>;

          effectRef.current = initializer({ ...baseOptions, ...(options ?? {}) });
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
  }, [effect, effectConfig.effectSrc, effectConfig.factory, effectConfig.threeSrc, effectConfig.baseOptions, hasEnteredView, options, shouldReduceMotion]);

  return <div ref={containerRef} className={cn("pointer-events-none relative h-full w-full", className)} aria-hidden />;
}

