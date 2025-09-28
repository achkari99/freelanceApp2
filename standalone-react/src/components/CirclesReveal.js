import React from "react";
import { loadScript } from "../utils/loadScript";

const RINGS_CORE_SRC = "/animations/animation2.js";
const RINGS_EFFECT_SRC = "/animations/animation3.js";

export function CirclesReveal({ active = false, className = "" }) {
  const containerRef = React.useRef(null);
  const effectRef = React.useRef(null);

  React.useEffect(() => {
    let cancelled = false;

    if (!active || effectRef.current || !containerRef.current) {
      return undefined;
    }

    const init = async () => {
      try {
        await loadScript(RINGS_CORE_SRC);
        await loadScript(RINGS_EFFECT_SRC);

        if (cancelled || !containerRef.current) {
          return;
        }

        const vanta = window.VANTA;
        if (!vanta?.RINGS) {
          return;
        }

        effectRef.current = vanta.RINGS({
          el: containerRef.current,
          mouseControls: false,
          touchControls: false,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.4,
          scaleMobile: 1.1,
          backgroundAlpha: 0.0,
          color: 0x43a5ff,
          shininess: 75,
          waveHeight: 16,
          waveSpeed: 0.35,
          zoom: 0.85
        });
      } catch (error) {
        console.error("Failed to initialise Vanta rings", error);
      }
    };

    init();

    return () => {
      cancelled = true;
    };
  }, [active]);

  React.useEffect(() => () => {
    if (effectRef.current?.destroy) {
      effectRef.current.destroy();
      effectRef.current = null;
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className={`circles-reveal ${active ? "circles-reveal--active" : ""} ${className}`.trim()}
    />
  );
}

export default CirclesReveal;
