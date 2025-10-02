import * as React from "react";

import { cn } from "@/lib/utils";

export type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  children: React.ReactNode;
};

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ children, className, ...props }, forwardedRef) => {
    return (
      <span
        ref={forwardedRef}
        className={cn(
          "inline-flex items-center rounded-full border border-slate-200 px-3 py-1 text-xs font-medium uppercase tracking-wide text-slate-600 dark:border-slate-700 dark:text-slate-300",
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";
