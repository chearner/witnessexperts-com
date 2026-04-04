import type { Session, SupabaseClient } from "@supabase/supabase-js";
import type { Category } from "$lib/data/categories";
import type { Database } from "$lib/supabase/database.types";

// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			supabase: SupabaseClient<Database>;
			session: Session | null;
		}
		interface PageData {
			session: Session | null;
			categories: Category[];
			categoriesError: string | null;
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
