declare module "*.mdx" {
  import type { ComponentType } from "react";
  import type { Project } from "@/types/project";
  import type { BackstagePostSummary } from "@/types/post";

  const MDXComponent: ComponentType<Record<string, unknown>>;
  export default MDXComponent;

  export const project: Omit<Project, "body">;
  export const post: BackstagePostSummary;
  export const metadata: Record<string, unknown>;
}

declare module "mdx/types" {
  import type { ComponentType } from "react";

  export type MDXComponents = {
    [key in keyof JSX.IntrinsicElements]?: ComponentType<any> | keyof JSX.IntrinsicElements;
  } & {
    [key: string]: ComponentType<any> | keyof JSX.IntrinsicElements;
  };
}

declare module "nodemailer";

