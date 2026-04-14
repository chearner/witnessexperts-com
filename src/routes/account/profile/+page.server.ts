import {
	buildAdvertisablePagePaths,
	isAdvertisablePagePath,
	labelForAdvertisablePath,
} from "$lib/server/advertisable-page-paths";
import { fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

const MAX_BIO = 2000;
const MAX_PHONE = 40;
const MAX_SUBCATEGORY = 120;
const MAX_FEATURED_PLACEMENTS = 12;

export const load: PageServerLoad = async ({ parent, locals }) => {
	const { categories } = await parent();
	const categoryNameBySlug = new Map(
		categories.map((c) => [c.slug, c.name] as const),
	);
	const advertisablePlacementOptions = buildAdvertisablePagePaths(
		categories.map((c) => c.slug),
	)
		.map((path) => ({
			path,
			label: labelForAdvertisablePath(path, categoryNameBySlug),
		}))
		.sort((a, b) => a.path.localeCompare(b.path));

	const {
		data: { user },
	} = await locals.supabase.auth.getUser();
	if (!user) {
		return {
			featuredPlacementPaths: [] as string[],
			advertisablePlacementOptions,
		};
	}

	const { data: rows } = await locals.supabase
		.from("profile_featured_placements")
		.select("page_path")
		.eq("profile_id", user.id);

	return {
		featuredPlacementPaths: (rows ?? []).map((r) => r.page_path),
		advertisablePlacementOptions,
	};
};

async function validSubcategory(
	supabase: App.Locals["supabase"],
	categorySlug: string | null,
	sub: string,
): Promise<boolean> {
	if (!sub) return true;
	if (!categorySlug) return false;
	const { data: cat } = await supabase
		.from("categories")
		.select("id")
		.eq("slug", categorySlug)
		.maybeSingle();
	if (!cat) return false;
	const { data: row } = await supabase
		.from("subcategories")
		.select("id")
		.eq("category_id", cat.id)
		.eq("name", sub)
		.maybeSingle();
	return !!row;
}

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const {
			data: { user },
		} = await locals.supabase.auth.getUser();

		if (!user) {
			throw redirect(303, "/login");
		}

		const formData = await request.formData();
		const displayName = formData.get("display_name")?.toString().trim() ?? "";
		const primaryCategorySlug =
			formData.get("primary_category_slug")?.toString().trim() ?? "";
		const subcategory = formData.get("subcategory")?.toString().trim() ?? "";
		const bio = formData.get("bio")?.toString().trim() ?? "";
		const phone = formData.get("phone")?.toString().trim() ?? "";
		const usStateCodeRaw = formData.get("us_state_code")?.toString().trim() ?? "";
		const usStateCode = usStateCodeRaw.toUpperCase() || null;

		const fieldSnapshot = {
			display_name: displayName,
			primary_category_slug: primaryCategorySlug,
			subcategory,
			bio,
			phone,
			us_state_code: usStateCodeRaw,
		};

		const categorySlugOrNull = primaryCategorySlug || null;

		if (displayName.length > 120) {
			return fail(400, {
				message: "Display name must be 120 characters or fewer.",
				...fieldSnapshot,
			});
		}

		if (categorySlugOrNull) {
			const { data: exists } = await locals.supabase
				.from("categories")
				.select("id")
				.eq("slug", categorySlugOrNull)
				.maybeSingle();
			if (!exists) {
				return fail(400, {
					message: "Please choose a valid primary category.",
					...fieldSnapshot,
				});
			}
		}

		if (!(await validSubcategory(locals.supabase, categorySlugOrNull, subcategory))) {
			return fail(400, {
				message:
					"Sub-area must match the selected category, or leave it blank.",
				...fieldSnapshot,
			});
		}

		if (subcategory.length > MAX_SUBCATEGORY) {
			return fail(400, {
				message: `Sub-area must be ${MAX_SUBCATEGORY} characters or fewer.`,
				...fieldSnapshot,
			});
		}

		if (bio.length > MAX_BIO) {
			return fail(400, {
				message: `Bio must be ${MAX_BIO} characters or fewer.`,
				...fieldSnapshot,
			});
		}

		if (phone.length > MAX_PHONE) {
			return fail(400, {
				message: `Phone must be ${MAX_PHONE} characters or fewer.`,
				...fieldSnapshot,
			});
		}

		if (usStateCode) {
			const { data: st } = await locals.supabase
				.from("us_states")
				.select("code")
				.eq("code", usStateCode)
				.maybeSingle();
			if (!st) {
				return fail(400, {
					message: "Please choose a valid US state.",
					...fieldSnapshot,
				});
			}
		}

		const { error: profileError } = await locals.supabase
			.from("profiles")
			.update({
				display_name: displayName || null,
				primary_category_slug: categorySlugOrNull,
				subcategory: subcategory || null,
				bio: bio || null,
				phone: phone || null,
				us_state_code: usStateCode,
			})
			.eq("id", user.id);

		if (profileError) {
			return fail(400, {
				message: profileError.message,
				...fieldSnapshot,
			});
		}

		throw redirect(303, "/account/profile?saved=1");
	},

	saveFeaturedPlacements: async ({ request, locals }) => {
		const {
			data: { user },
		} = await locals.supabase.auth.getUser();

		if (!user) {
			throw redirect(303, "/login");
		}

		const { data: catRows } = await locals.supabase
			.from("categories")
			.select("slug");
		const categorySlugs = (catRows ?? []).map((c) => c.slug);

		const formData = await request.formData();
		const raw = formData.getAll("page_path");
		const selected = [...new Set(raw.map((v) => String(v).trim()))].filter(
			Boolean,
		);
		const allowed = selected.filter((p) =>
			isAdvertisablePagePath(p, categorySlugs),
		);

		if (allowed.length > MAX_FEATURED_PLACEMENTS) {
			return fail(400, {
				featuredMessage: `Choose at most ${MAX_FEATURED_PLACEMENTS} placements.`,
			});
		}

		const { error: delErr } = await locals.supabase
			.from("profile_featured_placements")
			.delete()
			.eq("profile_id", user.id);

		if (delErr) {
			return fail(400, { featuredMessage: delErr.message });
		}

		if (allowed.length > 0) {
			const { error: insErr } = await locals.supabase
				.from("profile_featured_placements")
				.insert(
					allowed.map((page_path) => ({
						profile_id: user.id,
						page_path,
					})),
				);

			if (insErr) {
				return fail(400, { featuredMessage: insErr.message });
			}
		}

		throw redirect(303, "/account/profile?featured_saved=1");
	},
};
