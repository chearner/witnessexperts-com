import type { PageServerLoad } from "./$types";
import { pickFeaturedExperts } from "$lib/data/featured-experts";

export const load: PageServerLoad = () => {
  return {
    featuredExperts: pickFeaturedExperts(4),
  };
};
