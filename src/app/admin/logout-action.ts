"use server";

import { createServerActionSupabaseClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function logout() {
  const supabase = createServerActionSupabaseClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
