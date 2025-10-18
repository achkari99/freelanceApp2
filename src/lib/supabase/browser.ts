"use client";

import { useMemo } from "react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";

export function useBrowserSupabaseClient() {
  return useMemo(() => createBrowserSupabaseClient(), []);
}
