'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";

type Listener = (scrollY: number) => void;

type SilkyScrollContextValue = {
  addListener: (listener: Listener) => () => void;
  acquireHold: () => () => void;
  isEnabled: boolean;
};

const SilkyScrollContext = createContext<SilkyScrollContextValue | null>(null);

export function SilkyScrollProvider({ children }: { children: React.ReactNode }) {
  const listenersRef = useRef(new Set<Listener>());
  const [isEnabled, setIsEnabled] = useState(true);
  const holdCountRef = useRef(0);
  const reduceMotionRef = useRef(false);
  const targetRef = useRef(0);
  const currentRef = useRef(0);
  const frameRef = useRef(0);
  const requestUpdateRef = useRef<(() => void) | null>(null);
  const syncRef = useRef<(() => void) | null>(null);
  const stopAndSyncRef = useRef<(() => void) | null>(null);

  const updateEnabledState = useCallback(() => {
    setIsEnabled(!reduceMotionRef.current && holdCountRef.current === 0);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const listeners = listenersRef.current;
    const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const scrollingElement = document.scrollingElement ?? document.documentElement;

    const notify = (value: number) => {
      listeners.forEach((listener) => listener(value));
    };

    const setup = (preferReducedMotion: boolean) => {
      reduceMotionRef.current = preferReducedMotion;
      updateEnabledState();

      if (preferReducedMotion) {
        requestUpdateRef.current = null;
        syncRef.current = null;
        stopAndSyncRef.current = null;
        const handleScroll = () => notify(window.scrollY);
        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        window.addEventListener("resize", handleScroll, { passive: true });
        return () => {
          window.removeEventListener("scroll", handleScroll);
          window.removeEventListener("resize", handleScroll);
        };
      }

      const syncState = () => {
        const currentScroll = window.scrollY;
        targetRef.current = currentScroll;
        currentRef.current = currentScroll;
        notify(currentScroll);
      };

      const stopAndSync = () => {
        syncState();
        if (frameRef.current !== 0) {
          window.cancelAnimationFrame(frameRef.current);
          frameRef.current = 0;
        }
      };

      syncRef.current = syncState;
      stopAndSyncRef.current = stopAndSync;

      targetRef.current = window.scrollY;
      currentRef.current = window.scrollY;
      frameRef.current = 0;
      const ease = 0.1;
      const snapThreshold = 0.22;

      const clamp = (value: number) => {
        const maxScroll = scrollingElement.scrollHeight - window.innerHeight;
        return Math.max(0, Math.min(value, maxScroll >= 0 ? maxScroll : 0));
      };

      const update = () => {
        if (holdCountRef.current > 0) {
          frameRef.current = 0;
          return;
        }

        const clampedTarget = clamp(targetRef.current);
        const next = currentRef.current + (clampedTarget - currentRef.current) * ease;

        if (Math.abs(clampedTarget - next) < snapThreshold) {
          currentRef.current = clampedTarget;
        } else {
          currentRef.current = next;
        }

        window.scrollTo(0, currentRef.current);
        notify(currentRef.current);

        if (Math.abs(clampedTarget - currentRef.current) > snapThreshold) {
          frameRef.current = window.requestAnimationFrame(update);
        } else {
          frameRef.current = 0;
        }
      };

      const requestUpdate = () => {
        if (frameRef.current === 0 && holdCountRef.current === 0) {
          frameRef.current = window.requestAnimationFrame(update);
        }
      };

      requestUpdateRef.current = requestUpdate;

      const onWheel = (event: WheelEvent) => {
        if (holdCountRef.current > 0 || event.defaultPrevented) {
          return;
        }

        if (event.ctrlKey) return;

        const baseDelta =
          event.deltaMode === WheelEvent.DOM_DELTA_PIXEL
            ? event.deltaY
            : event.deltaMode === WheelEvent.DOM_DELTA_LINE
              ? event.deltaY * 16
              : event.deltaY * window.innerHeight;

        event.preventDefault();

        const velocityBoost = Math.abs(baseDelta) > 32 ? 1.12 : 0.74;
        targetRef.current = clamp(targetRef.current + baseDelta * velocityBoost);
        requestUpdate();
      };

      const onScroll = () => {
        if (frameRef.current !== 0 || holdCountRef.current > 0) return;
        const currentScroll = window.scrollY;
        targetRef.current = currentScroll;
        currentRef.current = currentScroll;
        notify(currentScroll);
      };

      const onResize = () => {
        targetRef.current = clamp(targetRef.current);
        requestUpdate();
      };

      notify(currentRef.current);
      window.addEventListener("wheel", onWheel, { passive: false });
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onResize, { passive: true });

      return () => {
        window.removeEventListener("wheel", onWheel);
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onResize);
        if (frameRef.current !== 0) {
          window.cancelAnimationFrame(frameRef.current);
          frameRef.current = 0;
        }
        requestUpdateRef.current = null;
        syncRef.current = null;
        stopAndSyncRef.current = null;
      };
    };

    let cleanup = setup(reduceMotionQuery.matches);

    const handlePreferenceChange = (event: MediaQueryListEvent) => {
      cleanup?.();
      cleanup = setup(event.matches);
    };

    if (reduceMotionQuery.addEventListener) {
      reduceMotionQuery.addEventListener("change", handlePreferenceChange);
    } else {
      reduceMotionQuery.addListener(handlePreferenceChange);
    }

    return () => {
      cleanup?.();
      if (reduceMotionQuery.removeEventListener) {
        reduceMotionQuery.removeEventListener("change", handlePreferenceChange);
      } else {
        reduceMotionQuery.removeListener(handlePreferenceChange);
      }
    };
  }, [updateEnabledState]);

  const addListener = useCallback((listener: Listener) => {
    listenersRef.current.add(listener);
    return () => {
      listenersRef.current.delete(listener);
    };
  }, []);

  const acquireHold = useCallback(() => {
    holdCountRef.current += 1;
    stopAndSyncRef.current?.();
    updateEnabledState();

    let released = false;

    return () => {
      if (released) return;
      released = true;
      holdCountRef.current = Math.max(0, holdCountRef.current - 1);
      syncRef.current?.();
      updateEnabledState();
      if (holdCountRef.current === 0 && !reduceMotionRef.current) {
        requestUpdateRef.current?.();
      }
    };
  }, [updateEnabledState]);

  const value = useMemo<SilkyScrollContextValue>(
    () => ({
      addListener,
      acquireHold,
      isEnabled
    }),
    [addListener, acquireHold, isEnabled]
  );

  return <SilkyScrollContext.Provider value={value}>{children}</SilkyScrollContext.Provider>;
}

export function useSilkyScrollListener(callback: Listener) {
  const context = useContext(SilkyScrollContext);

  useEffect(() => {
    if (!context) return;
    return context.addListener(callback);
  }, [context, callback]);

  return context?.isEnabled ?? false;
}

const noopRelease = () => {};
const noopAcquire = () => noopRelease;

export function useSilkyScrollControl() {
  const context = useContext(SilkyScrollContext);
  return {
    acquireHold: context?.acquireHold ?? noopAcquire,
    isEnabled: context?.isEnabled ?? false
  };
}
