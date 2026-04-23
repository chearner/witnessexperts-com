import { fetchCategories } from "$lib/server/categories";
import { fetchUsStates } from "$lib/server/us-states";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ locals }) => {
  const session = locals.session;

  const { categories, error: categoriesError } = await fetchCategories(
    locals.supabase,
  );
  const { usStates, error: usStatesError } = await fetchUsStates(
    locals.supabase,
  );

  const {
    data: { user },
  } = await locals.supabase.auth.getUser();

  if (!user) {
    return {
      session,
      categories,
      categoriesError,
      usStates,
      usStatesError,
      email: null as string | null,
      profile: null as {
        id: string;
        display_name: string | null;
        primary_category_slug: string | null;
        subcategory: string | null;
        bio: string | null;
        phone: string | null;
        us_state_code: string | null;
        headshot_url: string | null;
        listing_active: boolean;
        created_at: string;
        updated_at: string;
      } | null,
      profileError: null as string | null,
    };
  }

  let { data: profile } = await locals.supabase
    .from("profiles")
    .select(
      "id, display_name, primary_category_slug, subcategory, bio, phone, us_state_code, headshot_url, listing_active, created_at, updated_at",
    )
    .eq("id", user.id)
    .maybeSingle();

  if (!profile) {
    const { data: inserted, error } = await locals.supabase
      .from("profiles")
      .insert({ id: user.id })
      .select(
        "id, display_name, primary_category_slug, subcategory, bio, phone, us_state_code, headshot_url, listing_active, created_at, updated_at",
      )
      .single();

    if (error) {
      console.error(error);
      return {
        session,
        categories,
        categoriesError,
        usStates,
        usStatesError,
        email: user.email ?? null,
        profile: null,
        profileError:
          "Could not load your profile. Run the profiles migration in Supabase (see supabase/migrations).",
      };
    }
    profile = inserted;
  }

  return {
    session,
    categories,
    categoriesError,
    usStates,
    usStatesError,
    email: user.email ?? null,
    profile,
    profileError: null as string | null,
  };
};

