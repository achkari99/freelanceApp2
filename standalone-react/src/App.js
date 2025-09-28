import React, { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";
import { WavesBackground } from "./components/WavesBackground";
import { CirclesReveal } from "./components/CirclesReveal";
import { HeadlineBlock } from "./components/HeadlineBlock";
import { ClientStrip } from "./sections/ClientStrip";
import { ServicesShowcase } from "./sections/ServicesShowcase";
import { TestimonialsPanel } from "./sections/TestimonialsPanel";

const STAGE_THRESHOLDS = [120, 220, 280];

function App() {
  const [stage, setStage] = useState(0);
  const [scrollLocked, setScrollLocked] = useState(true);
  const progressRef = useRef(0);
  const touchStartRef = useRef(null);

  const requestNextStage = useCallback(() => {
    setStage((prev) => {
      if (prev >= 3) {
        return prev;
      }
      const next = prev + 1;
      if (next >= 3) {
        setScrollLocked(false);
        touchStartRef.current = null;
      }
      return next;
    });
    progressRef.current = 0;
  }, []);

  useEffect(() => {
    if (!scrollLocked) {
      document.body.style.overflow = "";
      return undefined;
    }

    document.body.style.overflow = "hidden";

    const handleProgress = (delta) => {
      if (!scrollLocked || delta === 0) {
        return;
      }

      progressRef.current += delta;
      const thresholdIndex = Math.min(stage, STAGE_THRESHOLDS.length - 1);
      const threshold = STAGE_THRESHOLDS[thresholdIndex];

      if (Math.abs(progressRef.current) >= threshold) {
        requestNextStage();
      }
    };

    const handleWheel = (event) => {
      event.preventDefault();
      handleProgress(event.deltaY);
    };

    const handleTouchStart = (event) => {
      touchStartRef.current = event.touches[0]?.clientY ?? null;
    };

    const handleTouchMove = (event) => {
      if (touchStartRef.current == null) {
        return;
      }
      const currentY = event.touches[0]?.clientY ?? touchStartRef.current;
      const delta = touchStartRef.current - currentY;
      if (delta !== 0) {
        event.preventDefault();
        handleProgress(delta * 1.8);
      }
    };

    const handleTouchEnd = () => {
      touchStartRef.current = null;
    };

    const handleKeyDown = (event) => {
      const keys = ["ArrowDown", "ArrowUp", "PageDown", "PageUp", " ", "Spacebar"];
      if (!keys.includes(event.key)) {
        return;
      }
      event.preventDefault();
      const direction = event.key === "ArrowUp" || event.key === "PageUp" ? -1 : 1;
      handleProgress(direction * 140);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    window.addEventListener("keydown", handleKeyDown, { passive: false });

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [requestNextStage, scrollLocked, stage]);

  const heroComplete = stage >= 3;

  return (
    <div className="app-shell">
      <section className="hero-stage">
        <WavesBackground />
        <div className="hero-stage__content">
          <div className="hero-stage__headline">
            <HeadlineBlock visible={stage >= 2} />
          </div>
          <div className="hero-stage__visual">
            <CirclesReveal active={stage >= 1} />
          </div>
        </div>
        <div className={`scroll-hint ${heroComplete ? "scroll-hint--done" : ""}`}>
          {heroComplete ? "Scroll to explore the rest" : "Scroll to unveil"}
        </div>
      </section>
      <main className={`page-content ${heroComplete ? "page-content--visible" : ""}`}>

        <ClientStrip />
        <ServicesShowcase />
        <TestimonialsPanel />
      </main>
    </div>
  );
}

export default App;







