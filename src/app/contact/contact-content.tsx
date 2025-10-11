'use client';

import { useEffect, useRef, type RefObject } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";

const GradualBlur = dynamic(() => import("~/gradual_blur"), {
  ssr: false
});

function useSilkyScroll(parallaxRef: RefObject<HTMLElement>, parallaxFactor = -0.05) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotionQuery.matches) {
      const parallaxNode = parallaxRef.current;
      if (parallaxNode) {
        parallaxNode.style.transform = "translate3d(0, 0, 0)";
      }
      return;
    }

    let target = window.scrollY;
    let current = window.scrollY;
    let frame = 0;
    const ease = 0.1;
    const snapThreshold = 0.22;
    const scrollingElement = document.scrollingElement ?? document.documentElement;

    const applyParallax = (scrollPosition: number) => {
      const parallaxNode = parallaxRef.current;
      if (parallaxNode) {
        parallaxNode.style.transform = `translate3d(0, ${scrollPosition * parallaxFactor}px, 0)`;
      }
    };

    const clamp = (value: number) => {
      const maxScroll = scrollingElement.scrollHeight - window.innerHeight;
      return Math.max(0, Math.min(value, maxScroll >= 0 ? maxScroll : 0));
    };

    const update = () => {
      const clampedTarget = clamp(target);
      current += (clampedTarget - current) * ease;

      if (Math.abs(clampedTarget - current) < snapThreshold) {
        current = clampedTarget;
      }

      window.scrollTo(0, current);
      applyParallax(current);

      if (Math.abs(clampedTarget - current) > snapThreshold) {
        frame = window.requestAnimationFrame(update);
      } else {
        frame = 0;
      }
    };

    const requestUpdate = () => {
      if (frame === 0) {
        frame = window.requestAnimationFrame(update);
      }
    };

    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey) return;

      const baseDelta =
        event.deltaMode === WheelEvent.DOM_DELTA_PIXEL
          ? event.deltaY
          : event.deltaMode === WheelEvent.DOM_DELTA_LINE
            ? event.deltaY * 16
            : event.deltaY * window.innerHeight;

      event.preventDefault();

      const velocityBoost = Math.abs(baseDelta) > 32 ? 1.12 : 0.74;
      target = clamp(target + baseDelta * velocityBoost);
      requestUpdate();
    };

    const onScroll = () => {
      if (frame !== 0) return;
      target = current = window.scrollY;
      applyParallax(current);
    };

    const onResize = () => {
      target = clamp(target);
      requestUpdate();
    };

    applyParallax(window.scrollY);
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (frame !== 0) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, [parallaxRef, parallaxFactor]);
}

export default function ContactContent() {
  const emailHref = `mailto:${siteConfig.links.email}`;
  const gradientPanelRef = useRef<HTMLDivElement>(null);

  useSilkyScroll(gradientPanelRef, -0.05);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#09031a] text-[#f1f3ff]">
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-90"
          style={{
            backgroundImage: "radial-gradient(rgba(112, 98, 219, 0.14) 1px, transparent 0)",
            backgroundPosition: "0 0, 12px 12px",
            backgroundSize: "28px 28px"
          }}
        />
        <div className="absolute left-[-15%] top-[-20%] h-[460px] w-[460px] rounded-full bg-sky-500/25 blur-[160px]" />
        <div className="absolute right-[-8%] top-[30%] h-[420px] w-[420px] rounded-full bg-indigo-500/30 blur-[180px]" />
        <div className="absolute bottom-[-20%] left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[#05010f] blur-[200px]" />
      </div>

      <GradualBlur
        target="page"
        preset="page-footer"
        height="5rem"
        strength={3}
        divCount={12}
        animated
        duration="0.8s"
        className="pointer-events-none hidden lg:block"
      />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col items-center px-6 py-24 lg:px-8">
        <div className="flex max-w-3xl flex-col items-center gap-6 text-center">
          <Badge className="border-white/20 bg-white/10 text-white/90 backdrop-blur">Contact ACH</Badge>
          <h1 className="font-display text-5xl tracking-tight text-white sm:text-6xl">Scroll Down.</h1>
          <p className="max-w-xl text-base text-white/70 sm:text-lg">
            Drop the context for your next build and we&apos;ll slot the squad into a 48-hour runway. The lab replies in hours\u2014not days.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg" className="bg-sky-500 text-white hover:bg-sky-400">
              <Link href="/start-a-project">Start your 48H prototype</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white/30 bg-white/5 text-white hover:border-sky-400">
              <a href={emailHref}>Email the lab</a>
            </Button>
          </div>
        </div>

        <section className="relative mt-20 w-full max-w-5xl">
          <div
            ref={gradientPanelRef}
            className="relative min-h-[160vh] overflow-hidden rounded-[56px] border border-white/10 shadow-[0_140px_280px_-140px_rgba(206,40,184,0.55)]"
            style={{
              backgroundImage: "url('/images/neon.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center 18%",
              backgroundRepeat: "no-repeat",
              backgroundColor: "#05000E",
              willChange: "transform",
              transform: "translate3d(0, 0, 0)"
            }}
          />
        </section>

        <section className="relative mt-24 w-full max-w-3xl">
          <div
            className="relative overflow-hidden rounded-[44px] border border-white/10 bg-white/5 px-10 py-14 text-center text-white/80"
            style={{
              background:
                "linear-gradient(150deg, rgba(255, 255, 255, 0.06) 0%, rgba(103, 69, 187, 0.12) 48%, rgba(23, 43, 123, 0.18) 100%)"
            }}
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-70"
              style={{
                backgroundImage: "radial-gradient(80% 120% at 20% 10%, rgba(255, 135, 250, 0.3), transparent 70%)"
              }}
            />
            <div
              className="pointer-events-none absolute inset-0 opacity-60"
              style={{
                backgroundImage: "radial-gradient(85% 120% at 82% 90%, rgba(90, 162, 255, 0.25), transparent 65%)"
              }}
            />
            <div className="relative space-y-5">
              <p className="text-xs uppercase tracking-[0.4em] text-white/60">Launch the signal</p>
              <h2 className="font-display text-3xl text-white">
                Every prototype is a rallying cry for the future you see before anyone else.
              </h2>
              <p className="text-base leading-relaxed text-white/70">
                Bring your vision, your friction, your sleepless-night idea. We&apos;ll turn it into a momentum wave that shows your team the future is already here.
              </p>
              <p className="text-sm text-white/60">Paint the destination. We&apos;ll build the first mile in 48 hours.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
