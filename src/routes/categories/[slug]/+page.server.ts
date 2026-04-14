import { categoryAdvertPath } from "$lib/server/advertisable-page-paths";
import { fetchDirectoryProfilesForCategory } from "$lib/server/directory-profiles";
import { fetchFeaturedExpertsForPagePath } from "$lib/server/featured-placements";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params, url, locals, parent }) => {
	const subRaw = url.searchParams.get("sub")?.trim() ?? "";
	const subcategoryFilter = subRaw.length > 0 ? subRaw : null;

	const { categories } = await parent();
	const categoryNameBySlug = Object.fromEntries(
		categories.map((c) => [c.slug, c.name]),
	);

	const [{ profiles, error: directoryError }, { experts: categoryFeaturedExperts, error: categoryFeaturedError }] =
		await Promise.all([
			fetchDirectoryProfilesForCategory(
				locals.supabase,
				params.slug,
				subcategoryFilter,
			),
			fetchFeaturedExpertsForPagePath(
				locals.supabase,
				categoryAdvertPath(params.slug),
				4,
				categoryNameBySlug,
			),
		]);

	return {
		subcategoryFilter,
		directoryProfiles: profiles,
		directoryError,
		categoryFeaturedExperts,
		categoryFeaturedError,
	};
};
