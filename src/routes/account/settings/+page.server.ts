import { fail, redirect } from "@sveltejs/kit";
import { getServiceSupabase } from "$lib/supabase/admin";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ parent }) => {
  const p = await parent();
  return {
    listingActive: p.profile?.listing_active ?? true,
  };
};

export const actions: Actions = {
  setVisibility: async ({ request, locals }) => {
    const {
      data: { user },
    } = await locals.supabase.auth.getUser();

    if (!user) {
      throw redirect(303, "/login");
    }

    const formData = await request.formData();
    const listingActive = formData.get("listing_active") === "true";

    const { error } = await locals.supabase
      .from("profiles")
      .update({ listing_active: listingActive })
      .eq("id", user.id);

    if (error) {
      return fail(400, { message: error.message });
    }

    throw redirect(303, "/account/settings?saved=1");
  },

  deleteAccount: async ({ request, locals }) => {
    const {
      data: { user },
    } = await locals.supabase.auth.getUser();

    if (!user) {
      throw redirect(303, "/login");
    }

    const formData = await request.formData();
    const confirm = formData.get("delete_confirm")?.toString().trim() ?? "";

    const { data: row } = await locals.supabase
      .from("profiles")
      .select("listing_active")
      .eq("id", user.id)
      .maybeSingle();

    if (row && row.listing_active !== false) {
      return fail(400, {
        deleteError:
          "Hide your listing from the directory first. Then you can permanently delete your account.",
      });
    }

    if (confirm !== "DELETE") {
      return fail(400, {
        deleteError:
          "Type DELETE in the confirmation box to permanently delete your account.",
      });
    }

    const admin = getServiceSupabase();
    if (!admin) {
      return fail(500, {
        deleteError:
          "Account deletion is not configured. Add SUPABASE_SERVICE_ROLE_KEY on the server.",
      });
    }

    const { error: deleteError } = await admin.auth.admin.deleteUser(user.id);

    if (deleteError) {
      return fail(500, { deleteError: deleteError.message });
    }

    try {
      await locals.supabase.auth.signOut();
    } catch {
      /* session may already be invalid */
    }

    throw redirect(303, "/");
  },
};
