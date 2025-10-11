import type { DetailedHTMLProps, HTMLAttributes } from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "feather-chat": DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
        "app-name"?: string;
        welcome?: string;
        theme?: "auto" | "light" | "dark";
        endpoint?: string;
      };
    }
  }
}

export {};
