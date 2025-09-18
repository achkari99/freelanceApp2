import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { backstagePosts, getPostBySlug } from "content/backstage";

interface BackstageEntryProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return backstagePosts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: BackstageEntryProps): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) {
    return {};
  }
  return {
    title: post.title,
    description: post.excerpt
  };
}

export default function BackstageEntry({ params }: BackstageEntryProps) {
  const post = getPostBySlug(params.slug);
  if (!post) {
    notFound();
  }
  const Body = post.body;

  return (
    <article className="mx-auto max-w-3xl px-6 py-16 lg:px-0">
      <Link href="/backstage" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">
        <ArrowLeft className="h-4 w-4" aria-hidden /> Back to backstage
      </Link>
      <header className="mt-8 space-y-4">
        <Badge>{new Date(post.publishedAt).toLocaleDateString()}</Badge>
        <h1 className="font-display text-4xl tracking-tight text-slate-900 dark:text-white">{post.title}</h1>
        <p className="text-lg text-slate-600 dark:text-slate-300">{post.excerpt}</p>
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Badge key={tag}>#{tag}</Badge>
          ))}
        </div>
      </header>
      <section className="prose prose-slate mt-10 dark:prose-invert">
        <Body />
      </section>
    </article>
  );
}

