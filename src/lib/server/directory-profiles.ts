import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "$lib/supabase/database.types";

export type DirectoryProfileListItem = {
	id: string;
	display_name: string | null;
	bio: string | null;
	primary_category_slug: string | null;
	subcategory: string | null;
	us_state_code: string | null;
	state_name: string | null;
	headshot_url: string | null;
};

export type DirectoryProfilePublic = DirectoryProfileListItem & {
	phone: string | null;
};

function mapListRow(row: {
	id: string;
	display_name: string | null;
	bio: string | null;
	primary_category_slug: string | null;
	subcategory: string | null;
	us_state_code: string | null;
	headshot_url: string | null;
	us_states: { name: string } | null;
}): DirectoryProfileListItem {
	return {
		id: row.id,
		display_name: row.display_name,
		bio: row.bio,
		primary_category_slug: row.primary_category_slug,
		subcategory: row.subcategory,
		us_state_code: row.us_state_code,
		state_name: row.us_states?.name ?? null,
		headshot_url: row.headshot_url?.trim() || null,
	};
}

export async function fetchDirectoryProfilesForCategory(
	supabase: SupabaseClient<Database>,
	categorySlug: string,
	subcategory: string | null,
): Promise<{ profiles: DirectoryProfileListItem[]; error: string | null }> {
	let q = supabase
		.from("profiles")
		.select(
			"id, display_name, bio, primary_category_slug, subcategory, us_state_code, headshot_url, us_states(name)",
		)
		.eq("listing_active", true)
		.eq("primary_category_slug", categorySlug)
		.order("display_name", { ascending: true, nullsFirst: false });

	const sub = subcategory?.trim() ?? "";
	if (sub) q = q.eq("subcategory", sub);

	const { data, error } = await q;

	if (error) {
		console.error(error);
		return { profiles: [], error: error.message };
	}

	return {
		profiles: (data ?? []).map(mapListRow),
		error: null,
	};
}

export async function fetchPublicDirectoryProfile(
	supabase: SupabaseClient<Database>,
	profileId: string,
): Promise<{ profile: DirectoryProfilePublic | null; error: string | null }> {
	const { data, error } = await supabase
		.from("profiles")
		.select(
			"id, display_name, bio, primary_category_slug, subcategory, phone, us_state_code, headshot_url, us_states(name)",
		)
		.eq("id", profileId)
		.eq("listing_active", true)
		.maybeSingle();

	if (error) {
		console.error(error);
		return { profile: null, error: error.message };
	}

	if (!data) return { profile: null, error: null };

	const base = mapListRow(data);
	return {
		profile: { ...base, phone: data.phone },
		error: null,
	};
}

const UUID_RE =
	/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function isProfileUuid(id: string): boolean {
	return UUID_RE.test(id);
}
