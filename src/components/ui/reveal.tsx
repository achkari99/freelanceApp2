"use client";

import * as React from "react";
import type { ComponentPropsWithoutRef } from "react";
import { motion } from "@/components/motion";
import { cn } from "@/lib/utils";

type Direction = "up" | "down" | "left" | "right";

type MotionDivProps = ComponentPropsWithoutRef<typeof motion.div>;

export interface RevealProps
  extends Omit<MotionDivProps, "initial" | "whileInView" | "viewport" | "transition"> {
  delay?: number;
  duration?: number;
  direction?: Direction;
  offset?: number;
  blur?: boolean;
}

const ease = [0.16, 1, 0.3, 1];

export const Reveal = React.forwardRef<HTMLDivElement, RevealProps>(function Reveal(
  {
    className,
    children,
    delay = 0,
    duration = 0.7,
    direction = "up",
    offset = 32,
    blur = true,
    style,
    ...props
  },
  ref
) {
  const initial: Record<string, unknown> = { opacity: 0 };
  if (direction === "up") initial.y = offset;
  if (direction === "down") initial.y = -offset;
  if (direction === "left") initial.x = offset;
  if (direction === "right") initial.x = -offset;
  if (blur) initial.filter = "blur(12px)";

  return (
    <motion.div
      ref={ref}
      initial={initial}
      whileInView={{ opacity: 1, x: 0, y: 0, filter: blur ? "blur(0px)" : undefined }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration, delay, ease }}
      className={cn("will-change-transform", className)}
      style={{ transformOrigin: "var(--reveal-origin, center)", ...style }}
      {...props}
    >
      {children}
    </motion.div>
  );
});

Reveal.displayName = "Reveal";

