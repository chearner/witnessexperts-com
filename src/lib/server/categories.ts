import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "$lib/supabase/database.types";
import type { Category } from "$lib/data/categories";

export async function fetchCategories(
	supabase: SupabaseClient<Database>,
): Promise<{ categories: Category[]; error: string | null }> {
	const { data, error } = await supabase
		.from("categories")
		.select(
			`
			slug,
			name,
			description,
			expert_count,
			sort_order,
			subcategories ( name, sort_order )
		`,
		)
		.order("sort_order");

	if (error) {
		console.error(error);
		return { categories: [], error: error.message };
	}

	const categories: Category[] = (data ?? []).map((row) => ({
		slug: row.slug,
		name: row.name,
		description: row.description ?? undefined,
		expertCount: row.expert_count ?? undefined,
		subcategories: [...(row.subcategories ?? [])]
			.sort((a, b) => a.sort_order - b.sort_order)
			.map((s) => s.name),
	}));

	return { categories, error: null };
}
