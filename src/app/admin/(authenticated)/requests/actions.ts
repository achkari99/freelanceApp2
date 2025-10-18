"use server";

import { revalidatePath } from "next/cache";
import { createServiceSupabaseClient } from "@/lib/supabase/service";

export async function deleteRequest(id: string) {
  if (!id) {
    return { error: "Missing request id." };
  }

  const supabase = createServiceSupabaseClient();
  const { error } = await supabase.from("clients requests data").delete().eq("id", id);

  if (error) {
    console.error("Failed to delete client request", error);
    return { error: "Could not delete request. Try again." };
  }

  revalidatePath("/admin/requests");
  revalidatePath("/admin");
  return { success: true };
}
