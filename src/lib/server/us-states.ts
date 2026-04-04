import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "$lib/supabase/database.types";
import type { UsState } from "$lib/data/us-states";

export async function fetchUsStates(
	supabase: SupabaseClient<Database>,
): Promise<{ usStates: UsState[]; error: string | null }> {
	const { data, error } = await supabase
		.from("us_states")
		.select("code, name, sort_order")
		.order("sort_order");

	if (error) {
		console.error(error);
		return { usStates: [], error: error.message };
	}

	const usStates: UsState[] = (data ?? []).map(({ code, name }) => ({
		code: code.trim(),
		name,
	}));

	return { usStates, error: null };
}
