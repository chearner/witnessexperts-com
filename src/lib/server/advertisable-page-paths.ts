/** Site paths where a profile may request a featured placement (validated server-side). */

export const FIXED_ADVERTISABLE_PATHS = ["/", "/categories", "/request"] as const;

export function categoryAdvertPath(slug: string): string {
	return `/categories/${slug}`;
}

export function buildAdvertisablePagePaths(categorySlugs: string[]): string[] {
	const paths = new Set<string>([...FIXED_ADVERTISABLE_PATHS]);
	for (const slug of categorySlugs) {
		if (slug) paths.add(categoryAdvertPath(slug));
	}
	return [...paths];
}

export function isAdvertisablePagePath(
	path: string,
	categorySlugs: string[],
): boolean {
	if ((FIXED_ADVERTISABLE_PATHS as readonly string[]).includes(path)) {
		return true;
	}
	const prefix = "/categories/";
	if (!path.startsWith(prefix)) return false;
	const slug = path.slice(prefix.length);
	if (!slug || slug.includes("/")) return false;
	return categorySlugs.includes(slug);
}

export function labelForAdvertisablePath(
	path: string,
	categoryNameBySlug: Map<string, string>,
): string {
	if (path === "/") return "Home";
	if (path === "/categories") return "Categories (all)";
	if (path === "/request") return "Request an expert";
	const prefix = "/categories/";
	if (path.startsWith(prefix)) {
		const slug = path.slice(prefix.length);
		return categoryNameBySlug.get(slug) ?? slug;
	}
	return path;
}
