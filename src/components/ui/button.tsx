import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group/button relative inline-flex items-center justify-center overflow-hidden rounded-full text-sm font-semibold transition duration-200 focus-visible:outline [&>svg]:transition-transform [&>svg]:duration-200 group-hover/button:[&>svg]:translate-x-1 group-hover/button:[&>svg]:rotate-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[underline=true]:after:absolute data-[underline=true]:after:inset-x-5 data-[underline=true]:after:bottom-1.5 data-[underline=true]:after:h-[2px] data-[underline=true]:after:origin-left data-[underline=true]:after:scale-x-0 data-[underline=true]:after:rounded-full data-[underline=true]:after:bg-current data-[underline=true]:after:opacity-0 data-[underline=true]:after:transition-all data-[underline=true]:after:duration-200 hover:data-[underline=true]:after:opacity-80 hover:data-[underline=true]:after:scale-x-100",
  {
    variants: {
      variant: {
        default: "bg-slate-900 text-white hover:bg-slate-700 focus-visible:outline-sky-500 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200",
        subtle: "bg-slate-100 text-slate-900 hover:bg-slate-200 focus-visible:outline-sky-500 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700",
        outline: "border border-slate-300 bg-transparent text-slate-700 hover:bg-slate-100 focus-visible:outline-sky-500 dark:border-slate-600 dark:text-slate-100 dark:hover:bg-slate-800",
        ghost: "text-slate-700 hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-sky-500 dark:text-slate-100 dark:hover:bg-white/10"
      },
      size: {
        default: "h-11 px-6",
        sm: "h-9 px-4 text-xs",
        lg: "h-12 px-8 text-base",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    const underline = size !== "icon";

    return (
      <Comp
        ref={ref}
        data-underline={underline ? "true" : "false"}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
