import { createClient } from "@supabase/supabase-js";
import { PUBLIC_SUPABASE_URL } from "$env/static/public";
import { env } from "$env/dynamic/private";
import type { Database } from "$lib/supabase/database.types";

/** Server-only admin client (delete user, etc.). Returns null if the service role key is not configured. */
export function getServiceSupabase() {
  const key = env.SUPABASE_SERVICE_ROLE_KEY;
  if (!key) return null;
  return createClient<Database>(PUBLIC_SUPABASE_URL, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
