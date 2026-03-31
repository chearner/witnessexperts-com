import { redirect } from "@sveltejs/kit";
import { isProfileIncomplete } from "$lib/auth/profile";
import { safeNextPath } from "$lib/auth/redirect";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async (event) => {
  const err = event.url.searchParams.get("error");
  const errDesc = event.url.searchParams.get("error_description");
  if (err) {
    throw redirect(
      303,
      `/login?error=${encodeURIComponent(errDesc ?? err)}`,
    );
  }

  const code = event.url.searchParams.get("code");
  let next = safeNextPath(event.url.searchParams.get("next"));

  if (code) {
    const { error } = await event.locals.supabase.auth.exchangeCodeForSession(
      code,
    );
    if (error) {
      throw redirect(
        303,
        `/login?error=${encodeURIComponent(error.message)}`,
      );
    }

    if (next === "/") {
      const {
        data: { user },
      } = await event.locals.supabase.auth.getUser();
      if (user) {
        const { data: profile } = await event.locals.supabase
          .from("profiles")
          .select("display_name")
          .eq("id", user.id)
          .maybeSingle();
        if (isProfileIncomplete(profile)) {
          next = "/account/profile";
        }
      }
    }
  }

  throw redirect(303, next);
};
