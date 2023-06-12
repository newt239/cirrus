import { cookies, headers } from "next/headers";

import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";

import type { Database } from "~/libs/database.types";

export const createClient = () =>
  createServerComponentSupabaseClient<Database>({
    headers,
    cookies,
  });
