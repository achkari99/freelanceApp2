"use server";

import { redirect } from "next/navigation";
import { createServerActionSupabaseClient } from "@/lib/supabase/server";

export type LoginState = {
  error?: string;
};

export async function login(_: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  const supabase = createServerActionSupabaseClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { error: "Sorry, those credentials didn’t work." };
  }

  redirect("/admin");
  return { error: undefined };
}
