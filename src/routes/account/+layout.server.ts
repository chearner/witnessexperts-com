import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ locals, parent }) => {
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

  return await parent();
};
