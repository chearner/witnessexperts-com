import {
	fetchPublicDirectoryProfile,
	isProfileUuid,
} from "$lib/server/directory-profiles";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params, parent, locals }) => {
	const { categories } = await parent();

	if (!isProfileUuid(params.id)) {
		throw error(404, "Not found");
	}

	const { profile, error: loadError } = await fetchPublicDirectoryProfile(
		locals.supabase,
		params.id,
	);

	if (loadError) {
		return { expert: null as null, categoryLabel: null as string | null, loadError };
	}

	if (!profile) {
		throw error(404, "Not found");
	}

	const categoryLabel =
		categories.find((c) => c.slug === profile.primary_category_slug)?.name ??
		profile.primary_category_slug ??
		null;

	return { expert: profile, categoryLabel, loadError: null as string | null };
};
