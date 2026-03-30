import { fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
  const {
    data: { user },
  } = await locals.supabase.auth.getUser();

  if (!user) {
    throw redirect(
      303,
      "/login?error=" +
        encodeURIComponent("Sign in to view your member account."),
    );
  }

  let { data: profile } = await locals.supabase
    .from("profiles")
    .select("id, display_name, created_at, updated_at")
    .eq("id", user.id)
    .maybeSingle();

  if (!profile) {
    const { data: inserted, error } = await locals.supabase
      .from("profiles")
      .insert({ id: user.id })
      .select("id, display_name, created_at, updated_at")
      .single();

    if (error) {
      console.error(error);
      return {
        email: user.email ?? null,
        profile: null,
        profileError:
          "Could not load your profile. Run the profiles migration in Supabase (see supabase/migrations).",
      };
    }
    profile = inserted;
  }

  return {
    email: user.email ?? null,
    profile,
    profileError: null as string | null,
  };
};

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

    if (displayName.length > 120) {
      return fail(400, {
        message: "Display name must be 120 characters or fewer.",
        display_name: displayName,
      });
    }

    const { error } = await locals.supabase
      .from("profiles")
      .update({ display_name: displayName || null })
      .eq("id", user.id);

    if (error) {
      return fail(400, {
        message: error.message,
        display_name: displayName || null,
      });
    }

    throw redirect(303, "/account");
  },
};
