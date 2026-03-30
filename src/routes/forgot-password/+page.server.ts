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

    if (!email) {
      return fail(400, { message: "Enter your email address." });
    }

    const redirectTo = `${url.origin}/auth/callback?next=/reset-password`;

    const { error } = await locals.supabase.auth.resetPasswordForEmail(email, {
      redirectTo,
    });

    if (error) {
      console.error(error);
    }

    return { success: true, email };
  },
};
