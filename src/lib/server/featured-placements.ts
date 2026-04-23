import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "$lib/supabase/database.types";

export type FeaturedExpertDisplay = {
	id: string;
	name: string;
	title: string;
	location: string;
	href: string;
	headshotUrl: string | null;
};

type ProfileJoinRow = {
	id: string;
	display_name: string | null;
	subcategory: string | null;
	primary_category_slug: string | null;
	us_state_code: string | null;
	headshot_url: string | null;
	listing_active: boolean;
	us_states: { name: string } | null;
};

export function shuffleTake<T>(items: T[], count: number): T[] {
	const pool = [...items];
	for (let i = pool.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[pool[i], pool[j]] = [pool[j], pool[i]];
	}
	return pool.slice(0, Math.min(count, pool.length));
}

function formatLocation(
	stateName: string | null,
	stateCode: string | null,
): string {
	if (stateName) return stateName;
	if (stateCode) return stateCode;
	return "";
}

function resolveTitle(
	p: ProfileJoinRow,
	categoryNameBySlug: Record<string, string> | undefined,
): string {
	const sub = p.subcategory?.trim();
	if (sub) return sub;
	const slug = p.primary_category_slug?.trim();
	if (slug && categoryNameBySlug?.[slug]) return categoryNameBySlug[slug];
	if (slug) return slug;
	return "Expert witness";
}

export async function fetchFeaturedExpertsForPagePath(
	supabase: SupabaseClient<Database>,
	pagePath: string,
	limit: number,
	categoryNameBySlug?: Record<string, string>,
): Promise<{ experts: FeaturedExpertDisplay[]; error: string | null }> {
	const { data, error } = await supabase
		.from("profile_featured_placements")
		.select(
			`
			profile_id,
			profiles!inner (
				id,
				display_name,
				subcategory,
				primary_category_slug,
				us_state_code,
				headshot_url,
				listing_active,
				us_states ( name )
			)
		`,
		)
		.eq("page_path", pagePath);

	if (error) {
		console.error(error);
		return { experts: [], error: error.message };
	}

	const mapped: FeaturedExpertDisplay[] = (data ?? [])
		.map((row) => {
			const p = row.profiles as unknown as ProfileJoinRow | null;
			if (!p?.listing_active) return null;
			const name = p.display_name?.trim() || "Expert witness";
			const loc = formatLocation(
				p.us_states?.name ?? null,
				p.us_state_code,
			);
			return {
				id: p.id,
				name,
				title: resolveTitle(p, categoryNameBySlug),
				location: loc || "United States",
				href: `/experts/${p.id}`,
				headshotUrl: p.headshot_url?.trim() || null,
			};
		})
		.filter((x): x is FeaturedExpertDisplay => x !== null);

	return { experts: shuffleTake(mapped, limit), error: null };
}
