import { cookies } from "next/headers";
import {
  createRouteHandlerClient,
  createServerActionClient,
  createServerComponentClient
} from "@supabase/auth-helpers-nextjs";

export const createServerSupabaseClient = () =>
  createServerComponentClient({
    cookies: () => cookies()
  });

export const createServerActionSupabaseClient = () =>
  createServerActionClient({
    cookies: () => cookies()
  });

export const createRouteHandlerSupabaseClient = () =>
  createRouteHandlerClient({
    cookies
  });
