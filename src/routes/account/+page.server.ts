import { fail, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const actions: Actions = {
  default: async ({ request, locals }) => {
    const {
      data: { user },
    } = await locals.supabase.auth.getUser();

    if (!user) {
      throw redirect(303, "/login");
    }

    const formData = await request.formData();
    const emailRaw = formData.get("email")?.toString().trim() ?? "";

    const fieldSnapshot = { email: emailRaw };

    if (!emailRaw) {
      return fail(400, {
        message: "Email is required.",
        ...fieldSnapshot,
      });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailRaw)) {
      return fail(400, {
        message: "Enter a valid email address.",
        ...fieldSnapshot,
      });
    }

    const emailLower = emailRaw.toLowerCase();
    const currentEmail = user.email?.toLowerCase() ?? "";

    if (emailLower === currentEmail) {
      throw redirect(303, "/account?saved=1");
    }

    const { error: authError } = await locals.supabase.auth.updateUser({
      email: emailRaw,
    });

    if (authError) {
      return fail(400, {
        message: authError.message,
        ...fieldSnapshot,
      });
    }

    const q = new URLSearchParams();
    q.set("saved", "1");
    q.set("email", "confirm");
    throw redirect(303, `/account?${q.toString()}`);
  },
};
