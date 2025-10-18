"use server";

import { revalidatePath } from "next/cache";
import { createServerActionSupabaseClient } from "@/lib/supabase/server";
import { createServiceSupabaseClient } from "@/lib/supabase/service";

type ComponentState = {
  error?: string;
  success?: boolean;
};

export async function addComponent(_: ComponentState, formData: FormData): Promise<ComponentState> {
  const name = String(formData.get("name") ?? "").trim();
  const targetPage = String(formData.get("page") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const code = String(formData.get("code") ?? "").trim();

  if (!name || !targetPage || !description || !code) {
    return { error: "Fill in all fields before publishing." };
  }

  const [sessionClient, serviceClient] = await Promise.all([
    createServerActionSupabaseClient(),
    Promise.resolve().then(() => createServiceSupabaseClient())
  ]);

  const {
    data: { user }
  } = await sessionClient.auth.getUser();

  const { error } = await serviceClient.from("ach_page_components").insert({
    name,
    page: targetPage,
    description,
    code,
    created_by: user?.id ?? null
  });

  if (error) {
    console.error("Component library insert failed", error);
    return {
      error:
        "Supabase rejected the insert. Ensure the `ach_page_components` table exists with columns (name, page, description, code, created_by UUID, created_at)."
    };
  }

  revalidatePath("/admin/components");
  return { success: true };
}
