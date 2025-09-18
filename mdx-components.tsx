import type { MDXComponents } from "mdx/types";
import Link from "next/link";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: (props) => <h2 className="mt-12 font-display text-3xl text-slate-900 dark:text-white" {...props} />,
    h3: (props) => <h3 className="mt-8 font-display text-2xl text-slate-900 dark:text-white" {...props} />,
    p: (props) => <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-300" {...props} />,
    a: (props) => <Link className="text-sky-600 underline-offset-2 hover:underline dark:text-sky-400" {...props} />,
    ul: (props) => <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-600 dark:text-slate-300" {...props} />,
    ol: (props) => <ol className="mt-4 list-decimal space-y-2 pl-6 text-slate-600 dark:text-slate-300" {...props} />,
    blockquote: (props) => (
      <blockquote className="mt-6 border-l-4 border-sky-500 pl-4 text-slate-700 dark:text-slate-200" {...props} />
    ),
    ...components
  };
}
