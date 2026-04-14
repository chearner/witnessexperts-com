import { fetchFeaturedExpertsForPagePath } from "$lib/server/featured-placements";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ parent, locals }) => {
	const { categories } = await parent();
	const categoryNameBySlug = Object.fromEntries(
		categories.map((c) => [c.slug, c.name]),
	);

	const { experts, error: featuredExpertsError } =
		await fetchFeaturedExpertsForPagePath(
			locals.supabase,
			"/categories",
			4,
			categoryNameBySlug,
		);

	return {
		featuredExperts: experts,
		featuredExpertsError,
	};
};
