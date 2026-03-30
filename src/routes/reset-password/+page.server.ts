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
        encodeURIComponent(
          "Your reset session expired or is invalid. Request a new reset link.",
        ),
    );
  }

  return {};
};

export const actions: Actions = {
  default: async ({ request, locals }) => {
    const formData = await request.formData();
    const password = formData.get("password")?.toString() ?? "";
    const confirm = formData.get("confirm")?.toString() ?? "";

    if (password.length < 8) {
      return fail(400, {
        message: "Password must be at least 8 characters.",
      });
    }

    if (password !== confirm) {
      return fail(400, {
        message: "Passwords do not match.",
      });
    }

    const { error } = await locals.supabase.auth.updateUser({ password });

    if (error) {
      return fail(400, { message: error.message });
    }

    throw redirect(303, "/account");
  },
};
