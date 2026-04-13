import { fetchDirectoryProfilesForCategory } from "$lib/server/directory-profiles";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params, url, locals }) => {
	const subRaw = url.searchParams.get("sub")?.trim() ?? "";
	const subcategoryFilter = subRaw.length > 0 ? subRaw : null;

	const { profiles, error: directoryError } =
		await fetchDirectoryProfilesForCategory(
			locals.supabase,
			params.slug,
			subcategoryFilter,
		);

	return {
		subcategoryFilter,
		directoryProfiles: profiles,
		directoryError,
	};
};
