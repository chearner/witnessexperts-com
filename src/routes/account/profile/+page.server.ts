import { fail, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";

const MAX_BIO = 2000;
const MAX_PHONE = 40;
const MAX_SUBCATEGORY = 120;

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

		const fieldSnapshot = {
			display_name: displayName,
			primary_category_slug: primaryCategorySlug,
			subcategory,
			bio,
			phone,
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

		const { error: profileError } = await locals.supabase
			.from("profiles")
			.update({
				display_name: displayName || null,
				primary_category_slug: categorySlugOrNull,
				subcategory: subcategory || null,
				bio: bio || null,
				phone: phone || null,
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
};
