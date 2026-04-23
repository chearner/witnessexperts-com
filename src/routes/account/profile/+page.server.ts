import {
	buildAdvertisablePagePaths,
	isAdvertisablePagePath,
	labelForAdvertisablePath,
} from "$lib/server/advertisable-page-paths";
import { fail, isRedirect, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

const MAX_BIO = 2000;
const MAX_PHONE = 40;
const MAX_SUBCATEGORY = 120;
const MAX_FEATURED_PLACEMENTS = 12;

const PROFILE_HEADSHOT_BUCKET = "profile-headshots";
const MAX_HEADSHOT_BYTES = 5 * 1024 * 1024;
const HEADSHOT_MIME_TO_EXT: Record<string, string> = {
	"image/jpeg": "jpg",
	"image/png": "png",
	"image/webp": "webp",
};

function inferImageMimeFromFilename(name: string): string | null {
	const n = name.toLowerCase();
	if (n.endsWith(".jpg") || n.endsWith(".jpeg")) return "image/jpeg";
	if (n.endsWith(".png")) return "image/png";
	if (n.endsWith(".webp")) return "image/webp";
	return null;
}

function errMsg(e: unknown): string {
	if (e && typeof e === "object" && "message" in e) {
		const m = (e as { message?: unknown }).message;
		if (typeof m === "string" && m.trim()) return m;
	}
	return String(e);
}

async function clearProfileHeadshotObjects(
	supabase: App.Locals["supabase"],
	userId: string,
): Promise<{ error: string | null }> {
	const { data: listed, error: listErr } = await supabase.storage
		.from(PROFILE_HEADSHOT_BUCKET)
		.list(userId);
	if (listErr) return { error: listErr.message };
	const paths = (listed ?? []).map((f) => `${userId}/${f.name}`);
	if (paths.length === 0) return { error: null };
	const { error: rmErr } = await supabase.storage
		.from(PROFILE_HEADSHOT_BUCKET)
		.remove(paths);
	return { error: rmErr?.message ?? null };
}

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
	/** Profile fields (cannot use `default` while other named actions exist on this page). */
	saveProfile: async ({ request, locals }) => {
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

	uploadHeadshot: async ({ request, locals }) => {
		const {
			data: { user },
		} = await locals.supabase.auth.getUser();

		if (!user) {
			throw redirect(303, "/login");
		}

		try {
			const formData = await request.formData();
			const raw = formData.get("headshot");

			if (!(raw instanceof Blob) || raw.size === 0) {
				return fail(400, {
					headshotMessage: "Choose an image file to upload.",
				});
			}

			if (raw.size > MAX_HEADSHOT_BYTES) {
				return fail(400, {
					headshotMessage: "Image must be 5 MB or smaller.",
				});
			}

			let mime = raw.type?.trim() ?? "";
			if (!mime || !HEADSHOT_MIME_TO_EXT[mime]) {
				const name = raw instanceof File ? raw.name : "";
				mime = inferImageMimeFromFilename(name) ?? "";
			}

			const ext = HEADSHOT_MIME_TO_EXT[mime];
			if (!ext) {
				return fail(400, {
					headshotMessage:
						"Use a JPEG, PNG, or WebP image. If the file is correct, try renaming it to end in .jpg, .png, or .webp.",
				});
			}

			const objectPath = `${user.id}/headshot.${ext}`;

			const { error: upErr } = await locals.supabase.storage
				.from(PROFILE_HEADSHOT_BUCKET)
				.upload(objectPath, raw, {
					contentType: mime,
					upsert: true,
				});

			if (upErr) {
				return fail(400, { headshotMessage: errMsg(upErr) });
			}

			const { data: listed, error: listErr } = await locals.supabase.storage
				.from(PROFILE_HEADSHOT_BUCKET)
				.list(user.id);

			if (listErr) {
				return fail(400, { headshotMessage: errMsg(listErr) });
			}

			const stalePaths = (listed ?? [])
				.filter((f) => typeof f?.name === "string" && f.name.length > 0)
				.map((f) => `${user.id}/${f.name}`)
				.filter((p) => p !== objectPath);

			if (stalePaths.length > 0) {
				const { error: rmErr } = await locals.supabase.storage
					.from(PROFILE_HEADSHOT_BUCKET)
					.remove(stalePaths);
				if (rmErr) {
					return fail(400, { headshotMessage: errMsg(rmErr) });
				}
			}

			const { data: pub } = locals.supabase.storage
				.from(PROFILE_HEADSHOT_BUCKET)
				.getPublicUrl(objectPath);

			const publicUrl = pub?.publicUrl?.trim();
			if (!publicUrl) {
				return fail(400, {
					headshotMessage:
						"Could not build a public URL for the upload. Check that the profile-headshots bucket exists and is public.",
				});
			}

			const { error: profileError } = await locals.supabase
				.from("profiles")
				.update({ headshot_url: publicUrl })
				.eq("id", user.id);

			if (profileError) {
				return fail(400, { headshotMessage: errMsg(profileError) });
			}

			throw redirect(303, "/account/profile?headshot_saved=1");
		} catch (e) {
			if (isRedirect(e)) throw e;
			console.error("[uploadHeadshot]", e);
			return fail(400, {
				headshotMessage: errMsg(e).slice(0, 2000) || "Upload failed.",
			});
		}
	},

	removeHeadshot: async ({ locals }) => {
		const {
			data: { user },
		} = await locals.supabase.auth.getUser();

		if (!user) {
			throw redirect(303, "/login");
		}

		try {
			const { error: clearErr } = await clearProfileHeadshotObjects(
				locals.supabase,
				user.id,
			);
			if (clearErr) {
				return fail(400, { headshotMessage: clearErr });
			}

			const { error: profileError } = await locals.supabase
				.from("profiles")
				.update({ headshot_url: null })
				.eq("id", user.id);

			if (profileError) {
				return fail(400, { headshotMessage: errMsg(profileError) });
			}

			throw redirect(303, "/account/profile?headshot_removed=1");
		} catch (e) {
			if (isRedirect(e)) throw e;
			console.error("[removeHeadshot]", e);
			return fail(400, {
				headshotMessage: errMsg(e).slice(0, 2000) || "Could not remove photo.",
			});
		}
	},
};
