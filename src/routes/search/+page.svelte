<script lang="ts">
	import { page } from '$app/stores';
	import { mainCategories, getAllSubcategories } from '$lib/data/categories';

	const searchParams = $derived($page.url.searchParams);
	const query = $derived(searchParams.get('q') ?? '');
	const categoryFilter = $derived(searchParams.get('category') ?? '');

	const allSubcategories = getAllSubcategories();
	const searchResults = $derived(
		query
			? allSubcategories.filter(
					({ subcategory, category }) =>
						subcategory.toLowerCase().includes(query.toLowerCase()) ||
						category.toLowerCase().includes(query.toLowerCase())
				)
			: []
	);

	const filteredCategories = $derived(
		categoryFilter
			? mainCategories.filter((c) => c.slug === categoryFilter)
			: mainCategories
	);
</script>

<svelte:head>
	<title>Search Expert Witnesses - WitnessExperts.com</title>
	<meta name="description" content="Search for expert witnesses by specialty, keyword, or category. Find qualified experts for your legal case." />
</svelte:head>

<div class="bg-ink px-6 py-12 text-parchment">
	<div class="mx-auto max-w-6xl">
		<h1 class="mb-8 font-display text-3xl text-parchment">Search Expert Witnesses</h1>
		<form class="flex max-w-xl overflow-hidden rounded-lg bg-parchment shadow-md" action="/search" method="get" role="search">
			<input
				type="search"
				name="q"
				value={query}
				placeholder="Enter specialty, keyword, or category..."
				class="min-w-0 flex-1 border-none px-6 py-4 text-base text-ink focus:outline-none"
				aria-label="Search for expert witnesses"
			/>
			{#if categoryFilter}
				<input type="hidden" name="category" value={categoryFilter} />
			{/if}
			<button type="submit" class="cursor-pointer border-none bg-seal px-8 py-4 font-semibold text-parchment transition-colors hover:bg-seal-light hover:text-ink">
				Search
			</button>
		</form>
	</div>
</div>

<div class="mx-auto max-w-6xl px-6 py-12">
	{#if query}
		{#if searchResults.length > 0}
			<section>
				<h2 class="mb-2 font-display text-2xl">Matching Specialties</h2>
				<p class="mb-8 text-ink-muted">
					{searchResults.length} matching {searchResults.length === 1 ? 'specialty' : 'specialties'}
				</p>
				<div class="flex flex-col gap-2">
					{#each searchResults.slice(0, 50) as { subcategory, category }}
						<a href="/categories?q={encodeURIComponent(subcategory)}" class="flex items-center justify-between rounded-md border border-wborder bg-white px-6 py-4 transition-all hover:border-seal-muted hover:shadow-sm">
							<span class="font-semibold text-ink">{subcategory}</span>
							<span class="text-sm text-ink-muted">{category}</span>
						</a>
					{/each}
				</div>
				{#if searchResults.length > 50}
					<p class="mt-8 text-[0.9375rem] text-ink-muted">
						Showing first 50 results. Refine your search for more specific results.
					</p>
				{/if}
			</section>
		{:else}
			<section class="py-12 text-center">
				<h2 class="mb-4 font-display text-2xl">No exact matches for "{query}"</h2>
				<p class="mb-8 text-ink-muted">Try broadening your search or browse by category:</p>
				<div class="flex flex-wrap justify-center gap-4">
					{#each filteredCategories.slice(0, 6) as cat}
						<a href="/categories/{cat.slug}" class="rounded-md bg-parchment-warm px-4 py-2 font-medium no-underline hover:bg-seal hover:text-parchment">
							{cat.name}
						</a>
					{/each}
				</div>
			</section>
		{/if}
	{:else}
		<section>
			<h2 class="mb-4 font-display text-2xl">Browse by Category</h2>
			<p class="mb-8 text-ink-muted">Enter a search term above or select a category to find expert witnesses.</p>
			<div class="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4">
				{#each mainCategories as cat}
					<a href="/categories/{cat.slug}" class="flex items-center gap-2 rounded-md border border-wborder bg-white p-6 font-medium text-ink no-underline transition-all hover:border-seal-muted hover:text-seal-muted hover:shadow-md">
						{cat.name}
						{#if cat.expertCount}
							<span class="text-sm font-normal text-ink-muted">({cat.expertCount})</span>
						{/if}
					</a>
				{/each}
			</div>
		</section>
	{/if}
</div>
