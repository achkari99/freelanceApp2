"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Search, X } from "lucide-react";

export function RequestsSearch() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const defaultValue = useMemo(() => searchParams.get("q") ?? "", [searchParams]);
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const navigateWithValue = (nextValue: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const normalized = nextValue.trim();
    normalized ? params.set("q", normalized) : params.delete("q");
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
  };

  return (
    <form
      className="flex w-full items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white focus-within:border-sky-400/70 focus-within:ring-2 focus-within:ring-sky-500/40 md:max-w-sm"
      onSubmit={(event) => {
        event.preventDefault();
        navigateWithValue(value);
      }}
    >
      <Search className="h-4 w-4 text-white/50" aria-hidden />
      <input
        type="search"
        name="q"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Search by name..."
        className="flex-1 bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none"
      />
      {defaultValue ? (
        <button
          type="button"
          onClick={() => {
            setValue("");
            navigateWithValue("");
          }}
          className="rounded-full p-1 text-white/50 transition hover:bg-white/10 hover:text-white"
          aria-label="Clear search"
        >
          <X className="h-3.5 w-3.5" aria-hidden />
        </button>
      ) : null}
    </form>
  );
}
