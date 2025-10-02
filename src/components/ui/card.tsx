"use client";

import * as React from "react";
import {
  motion,
  useAnimationControls,
  type PanInfo,
  type Transition
} from "framer-motion";

import { cn } from "@/lib/utils";

const DURATIONS = {
  hover: 0.18,
  active: 0.1,
  drag: 0.12,
  settle: 0.22
} as const;

const EASING_STANDARD: Transition["ease"] = [0.22, 1, 0.36, 1];
const EASING_SETTLE: Transition["ease"] = [0.33, 1, 0.68, 1];

type MotionDivProps = React.ComponentPropsWithoutRef<typeof motion.div>;

type CardState = "idle" | "hover" | "focus" | "active" | "drag" | "settle";

const animationTargets: Record<
  CardState,
  { scale: number | number[]; y: number | number[]; transition: Transition }
> = {
  idle: { scale: 1, y: 0, transition: { duration: DURATIONS.hover, ease: EASING_STANDARD } },
  hover: { scale: 1.015, y: -4, transition: { duration: DURATIONS.hover, ease: EASING_STANDARD } },
  focus: { scale: 1.015, y: -4, transition: { duration: DURATIONS.hover, ease: EASING_STANDARD } },
  active: { scale: 1.03, y: -6, transition: { duration: DURATIONS.active, ease: EASING_STANDARD } },
  drag: { scale: 1.035, y: -8, transition: { duration: DURATIONS.drag, ease: EASING_STANDARD } },
  settle: {
    scale: [1.035, 0.98, 1],
    y: [-8, 3, 0],
    transition: { duration: DURATIONS.settle, ease: EASING_SETTLE }
  }
};

const shadowByState: Record<CardState, string> = {
  idle: "var(--card-shadow-rest)",
  hover: "var(--card-shadow-lift)",
  focus: "var(--card-shadow-lift)",
  active: "var(--card-shadow-active)",
  drag: "var(--card-shadow-drag)",
  settle: "var(--card-shadow-rest)"
};

const motionVariables = {
  "--dur-hover": `${Math.round(DURATIONS.hover * 1000)}ms`,
  "--dur-active": `${Math.round(DURATIONS.active * 1000)}ms`,
  "--dur-drag": `${Math.round(DURATIONS.drag * 1000)}ms`,
  "--dur-settle": `${Math.round(DURATIONS.settle * 1000)}ms`,
  "--easing-standard": "cubic-bezier(0.22, 1, 0.36, 1)",
  "--easing-spring": "cubic-bezier(0.33, 1, 0.68, 1)"
} as const satisfies Record<`--${string}`, string>;

export type CardProps = MotionDivProps & {
  /**
   * Enables motion interactions. Disable when the card is only decorative.
   */
  interactive?: boolean;
  /**
   * Set to `true`, `"x"`, or `"y"` to enable drag gestures.
   */
  drag?: MotionDivProps["drag"];
};

export const Card = React.forwardRef<HTMLDivElement, CardProps>(function Card(
  props,
  forwardedRef
) {
  const {
    children,
    className,
    style,
    interactive = true,
    drag: dragProp = false,
    layout = true,
    onPointerEnter: userPointerEnter,
    onPointerLeave: userPointerLeave,
    onPointerDown: userPointerDown,
    onPointerUp: userPointerUp,
    onPointerCancel: userPointerCancel,
    onFocus: userFocus,
    onBlur: userBlur,
    onDragStart: userDragStart,
    onDragEnd: userDragEnd,
    ...rest
  } = props;

  const controls = useAnimationControls();
  const shouldAnimate = interactive;

  const internalRef = React.useRef<HTMLDivElement | null>(null);
  const pointerWithinRef = React.useRef(false);
  const focusWithinCountRef = React.useRef(0);
  const latestStateRef = React.useRef<CardState>("idle");
  const dropzoneRef = React.useRef<HTMLElement | null>(null);
  const settleTimerRef = React.useRef<number | null>(null);

  const [state, setState] = React.useState<CardState>("idle");
  const [hasFocusWithin, setHasFocusWithin] = React.useState(false);

  const setRefs = React.useCallback(
    (node: HTMLDivElement | null) => {
      internalRef.current = node;
      if (typeof forwardedRef === "function") {
        forwardedRef(node);
      } else if (forwardedRef) {
        forwardedRef.current = node;
      }
    },
    [forwardedRef]
  );

  React.useEffect(() => {
    latestStateRef.current = state;
  }, [state]);

  React.useEffect(() => {
    controls.set({ scale: animationTargets.idle.scale, y: animationTargets.idle.y });
  }, [controls]);

  React.useEffect(() => {
    if (!shouldAnimate) {
      controls.set({ scale: animationTargets.idle.scale, y: animationTargets.idle.y });
      setState("idle");
      return;
    }

    const target = animationTargets[state];
    const { transition, ...values } = target;
    controls.start({ ...values, transition }).catch(() => {
      // no-op – controller may be stopped when unmounted
    });
  }, [controls, shouldAnimate, state]);

  React.useEffect(() => {
    return () => {
      if (settleTimerRef.current) {
        window.clearTimeout(settleTimerRef.current);
      }
      if (dropzoneRef.current) {
        delete dropzoneRef.current.dataset.cardDropzoneActive;
      }
    };
  }, []);

  const getRestState = React.useCallback((): CardState => {
    if (!interactive) {
      return "idle";
    }

    if (pointerWithinRef.current) {
      return "hover";
    }

    if (focusWithinCountRef.current > 0) {
      return "focus";
    }

    return "idle";
  }, [interactive]);

  const handlePointerEnter = React.useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      pointerWithinRef.current = true;
      if (shouldAnimate && latestStateRef.current !== "drag") {
        setState(focusWithinCountRef.current > 0 ? "focus" : "hover");
      }
      userPointerEnter?.(event);
    },
    [shouldAnimate, userPointerEnter]
  );

  const handlePointerLeave = React.useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      pointerWithinRef.current = false;
      if (shouldAnimate && latestStateRef.current !== "drag") {
        setState(focusWithinCountRef.current > 0 ? "focus" : "idle");
      }
      userPointerLeave?.(event);
    },
    [shouldAnimate, userPointerLeave]
  );

  const handlePointerDown = React.useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (shouldAnimate) {
        setState("active");
      }
      userPointerDown?.(event);
    },
    [shouldAnimate, userPointerDown]
  );

  const handlePointerUp = React.useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (shouldAnimate && latestStateRef.current !== "drag") {
        setState(getRestState());
      }
      userPointerUp?.(event);
    },
    [getRestState, shouldAnimate, userPointerUp]
  );

  const handlePointerCancel = React.useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (shouldAnimate && latestStateRef.current !== "drag") {
        setState(getRestState());
      }
      userPointerCancel?.(event);
    },
    [getRestState, shouldAnimate, userPointerCancel]
  );

  const handleFocus = React.useCallback(
    (event: React.FocusEvent<HTMLDivElement>) => {
      focusWithinCountRef.current += 1;
      if (focusWithinCountRef.current === 1) {
        setHasFocusWithin(true);
        if (shouldAnimate && latestStateRef.current !== "drag") {
          setState("focus");
        }
      }
      userFocus?.(event);
    },
    [shouldAnimate, userFocus]
  );

  const handleBlur = React.useCallback(
    (event: React.FocusEvent<HTMLDivElement>) => {
      focusWithinCountRef.current = Math.max(0, focusWithinCountRef.current - 1);
      if (focusWithinCountRef.current === 0) {
        setHasFocusWithin(false);
        if (shouldAnimate && latestStateRef.current !== "drag") {
          setState(pointerWithinRef.current ? "hover" : "idle");
        }
      }
      userBlur?.(event);
    },
    [shouldAnimate, userBlur]
  );

  const handleDragStart = React.useCallback(
    (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      if (shouldAnimate) {
        setState("drag");
        const dropzone = internalRef.current?.closest<HTMLElement>('[data-card-dropzone]');
        if (dropzone) {
          dropzone.dataset.cardDropzoneActive = "true";
          dropzoneRef.current = dropzone;
        }
      }
      userDragStart?.(event, info);
    },
    [shouldAnimate, userDragStart]
  );

  const handleDragEnd = React.useCallback(
    (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      if (dropzoneRef.current) {
        delete dropzoneRef.current.dataset.cardDropzoneActive;
        dropzoneRef.current = null;
      }

      if (shouldAnimate) {
        setState("settle");
        if (settleTimerRef.current) {
          window.clearTimeout(settleTimerRef.current);
        }
        settleTimerRef.current = window.setTimeout(() => {
          setState(getRestState());
          settleTimerRef.current = null;
        }, Math.round(DURATIONS.settle * 1000));
      }

      userDragEnd?.(event, info);
    },
    [getRestState, shouldAnimate, userDragEnd]
  );

  const resolvedDrag: MotionDivProps["drag"] = React.useMemo(() => {
    if (!interactive || !dragProp) {
      return false;
    }

    return dragProp === true ? "y" : dragProp;
  }, [dragProp, interactive]);

  const effectiveState: CardState = shouldAnimate ? state : "idle";
  const shadowKey: CardState =
    effectiveState === "settle"
      ? pointerWithinRef.current
        ? "hover"
        : hasFocusWithin
          ? "focus"
          : "idle"
      : effectiveState;
  const currentShadow = shadowByState[shadowKey] ?? shadowByState.idle;

  const combinedStyle = {
    ...motionVariables,
    ...(style ?? {}),
    boxShadow: style?.boxShadow ?? currentShadow
  } as React.CSSProperties;

  const isDragging = effectiveState === "drag";

  return (
    <motion.div
      ref={setRefs}
      className={cn(
        "Card group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-sm will-change-transform dark:border-slate-800 dark:bg-slate-900",
        interactive ? "cursor-grab touch-pan-y" : "",
        "focus-visible:outline-none",
        className
      )}
      layout={layout}
      animate={controls}
      initial={false}
      drag={resolvedDrag}
      dragMomentum={false}
      dragTransition={{ bounceDamping: 32, bounceStiffness: 520 }}
      data-card-state={effectiveState}
      data-card-motion={shouldAnimate ? "standard" : "reduced"}
      data-card-focus={hasFocusWithin ? "true" : "false"}
      aria-grabbed={isDragging ? true : undefined}
      style={combinedStyle}
      transition={{ layout: { duration: 0.12, ease: [0.4, 0, 0.2, 1] } }}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      {...rest}
    >
      {children}
    </motion.div>
  );
});

Card.displayName = "Card";
