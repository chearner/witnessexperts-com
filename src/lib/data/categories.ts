/**
 * Expert witness category taxonomy (loaded from DB via layout).
 */
export interface Category {
	slug: string;
	name: string;
	description?: string;
	subcategories?: string[];
	expertCount?: number;
}

export function getCategoryBySlug(
	categories: Category[],
	slug: string,
): Category | undefined {
	return categories.find((c) => c.slug === slug);
}

export function getAllSubcategories(
	categories: Category[],
): { category: string; categorySlug: string; subcategory: string }[] {
	const result: { category: string; categorySlug: string; subcategory: string }[] =
		[];
	for (const cat of categories) {
		for (const sub of cat.subcategories ?? []) {
			result.push({
				category: cat.name,
				categorySlug: cat.slug,
				subcategory: sub,
			});
		}
	}
	return result;
}
