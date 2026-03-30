import { createBrowserClient } from "@supabase/ssr";
import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from "$env/static/public";
import type { Database } from "$lib/supabase/database.types";
import type { SupabaseClient } from "@supabase/supabase-js";

let browserClient: SupabaseClient<Database> | undefined;

/** Browser-only Supabase client (singleton). Use in components after mount. */
export function getSupabaseBrowserClient(): SupabaseClient<Database> {
  browserClient ??= createBrowserClient<Database>(
    PUBLIC_SUPABASE_URL,
    PUBLIC_SUPABASE_ANON_KEY,
  );
  return browserClient;
}
