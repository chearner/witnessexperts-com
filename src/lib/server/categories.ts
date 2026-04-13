import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "$lib/supabase/database.types";
import type { Category } from "$lib/data/categories";

function toCountMap(
	rows: { slug: string; expert_count: number | string }[] | null,
): Map<string, number> {
	const map = new Map<string, number>();
	for (const r of rows ?? []) {
		const n =
			typeof r.expert_count === "string"
				? Number(r.expert_count)
				: r.expert_count;
		if (Number.isFinite(n) && n > 0) map.set(r.slug, n);
	}
	return map;
}

export async function fetchCategories(
	supabase: SupabaseClient<Database>,
): Promise<{ categories: Category[]; error: string | null }> {
	const [catRes, countRes] = await Promise.all([
		supabase
			.from("categories")
			.select(
				`
			slug,
			name,
			description,
			sort_order,
			subcategories ( name, sort_order )
		`,
			)
			.order("sort_order"),
		supabase.rpc("category_expert_counts"),
	]);

	if (catRes.error) {
		console.error(catRes.error);
		return { categories: [], error: catRes.error.message };
	}

	if (countRes.error) {
		console.error(countRes.error);
		return { categories: [], error: countRes.error.message };
	}

	const counts = toCountMap(countRes.data);

	const categories: Category[] = (catRes.data ?? []).map((row) => ({
		slug: row.slug,
		name: row.name,
		description: row.description ?? undefined,
		expertCount: counts.get(row.slug),
		subcategories: [...(row.subcategories ?? [])]
			.sort((a, b) => a.sort_order - b.sort_order)
			.map((s) => s.name),
	}));

	return { categories, error: null };
}
