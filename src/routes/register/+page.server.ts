import { fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
  if (locals.session) {
    throw redirect(303, "/account");
  }
  return {};
};

export const actions: Actions = {
  default: async ({ request, locals, url }) => {
    const formData = await request.formData();
    const email = formData.get("email")?.toString().trim() ?? "";
    const password = formData.get("password")?.toString() ?? "";
    const confirm = formData.get("confirm")?.toString() ?? "";

    if (!email || !password) {
      return fail(400, {
        email,
        message: "Email and password are required.",
      });
    }

    if (password.length < 8) {
      return fail(400, {
        email,
        message: "Password must be at least 8 characters.",
      });
    }

    if (password !== confirm) {
      return fail(400, {
        email,
        message: "Passwords do not match.",
      });
    }

    const { data, error } = await locals.supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${url.origin}/auth/callback?next=/account`,
      },
    });

    if (error) {
      return fail(400, {
        email,
        message: error.message,
      });
    }

    if (data.session) {
      throw redirect(303, "/account");
    }

    return {
      success: true,
      email,
      needsConfirmation: true,
    };
  },
};
