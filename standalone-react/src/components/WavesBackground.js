import React from "react";
import { loadScript } from "../utils/loadScript";

const WAVES_CORE_SRC = "/animations/animation0.js";
const WAVES_EFFECT_SRC = "/animations/animation1.js";

export function WavesBackground({ className = "" }) {
  const containerRef = React.useRef(null);
  const effectRef = React.useRef(null);

  React.useEffect(() => {
    let cancelled = false;

    const init = async () => {
      if (!containerRef.current || typeof window === "undefined") {
        return;
      }

      try {
        await loadScript(WAVES_CORE_SRC);
        await loadScript(WAVES_EFFECT_SRC);

        if (cancelled || !containerRef.current) {
          return;
        }

        const vanta = window.VANTA;

        if (!vanta?.WAVES) {
          return;
        }

        effectRef.current = vanta.WAVES({
          el: containerRef.current,
          mouseControls: false,
          touchControls: false,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.1,
          scaleMobile: 1.0,
          color: 0x021118,
          shininess: 45,
          waveHeight: 12,
          waveSpeed: 0.0,
          zoom: 0.85
        });
      } catch (error) {
        console.error("Failed to initialise Vanta waves", error);
      }
    };

    init();

    return () => {
      cancelled = true;
      if (effectRef.current?.destroy) {
        effectRef.current.destroy();
        effectRef.current = null;
      }
    };
  }, []);

  return <div ref={containerRef} className={`waves-background ${className}`} aria-hidden />;
}

export default WavesBackground;
