import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center gap-6 px-6 text-center">
      <p className="text-sm uppercase tracking-wide text-slate-400">404</p>
      <h1 className="font-display text-4xl text-slate-900 dark:text-white">We could not find that page.</h1>
      <p className="max-w-xl text-sm text-slate-600 dark:text-slate-300">
        The page you are looking for might have moved. Try searching our work or head back home.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Button asChild>
          <Link href="/">Return home</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/search">Search the site</Link>
        </Button>
      </div>
    </div>
  );
}
