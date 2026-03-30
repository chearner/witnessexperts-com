import { fail, redirect } from "@sveltejs/kit";
import { getCategoryBySlug } from "$lib/data/categories";
import type { Actions } from "./$types";

const MAX_BIO = 2000;
const MAX_PHONE = 40;
const MAX_SUBCATEGORY = 120;

function validSubcategory(
  categorySlug: string | null,
  sub: string,
): boolean {
  if (!sub) return true;
  if (!categorySlug) return false;
  const cat = getCategoryBySlug(categorySlug);
  return cat?.subcategories?.includes(sub) ?? false;
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
    const emailRaw = formData.get("email")?.toString().trim() ?? "";
    const primaryCategorySlug =
      formData.get("primary_category_slug")?.toString().trim() ?? "";
    const subcategory = formData.get("subcategory")?.toString().trim() ?? "";
    const bio = formData.get("bio")?.toString().trim() ?? "";
    const phone = formData.get("phone")?.toString().trim() ?? "";

    const fieldSnapshot = {
      display_name: displayName,
      email: emailRaw,
      primary_category_slug: primaryCategorySlug,
      subcategory,
      bio,
      phone,
    };

    if (!emailRaw) {
      return fail(400, {
        message: "Email is required.",
        ...fieldSnapshot,
      });
    }

    const categorySlugOrNull = primaryCategorySlug || null;

    if (displayName.length > 120) {
      return fail(400, {
        message: "Display name must be 120 characters or fewer.",
        ...fieldSnapshot,
      });
    }

    if (categorySlugOrNull && !getCategoryBySlug(categorySlugOrNull)) {
      return fail(400, {
        message: "Please choose a valid primary category.",
        ...fieldSnapshot,
      });
    }

    if (!validSubcategory(categorySlugOrNull, subcategory)) {
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

    const emailLower = emailRaw.toLowerCase();
    const currentEmail = user.email?.toLowerCase() ?? "";

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailRaw)) {
      return fail(400, {
        message: "Enter a valid email address.",
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

    let emailNotice: string | null = null;
    if (emailLower !== currentEmail) {
      const { error: authError } = await locals.supabase.auth.updateUser({
        email: emailRaw,
      });
      if (authError) {
        return fail(400, {
          message: authError.message,
          ...fieldSnapshot,
        });
      }
      emailNotice = "confirm";
    }

    const q = new URLSearchParams();
    q.set("saved", "1");
    if (emailNotice) q.set("email", emailNotice);
    throw redirect(303, `/account?${q.toString()}`);
  },
};
