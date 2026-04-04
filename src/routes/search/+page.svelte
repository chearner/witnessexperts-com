<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/state';
	import { getAllSubcategories } from '$lib/data/categories';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';

	let { data }: { data: PageData } = $props();

	const searchParams = $derived(page.url.searchParams);
	const query = $derived(searchParams.get('q') ?? '');
	const categoryFilter = $derived(searchParams.get('category') ?? '');

	const allSubcategories = $derived(getAllSubcategories(data.categories));
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
			? data.categories.filter((c) => c.slug === categoryFilter)
			: data.categories
	);
</script>

<svelte:head>
	<title>Search Expert Witnesses - WitnessExperts.com</title>
	<meta name="description" content="Search for expert witnesses by specialty, keyword, or category. Find qualified experts for your legal case." />
</svelte:head>

<section class="bg-primary px-6 py-12 text-primary-foreground">
	<div class="mx-auto max-w-6xl space-y-6">
		<h1>Search Expert Witnesses</h1>
		<form
			class="mx-auto flex w-full max-w-xl overflow-hidden rounded-lg border border-border bg-card text-left shadow-sm"
			action="/search"
			method="get"
			role="search"
		>
			<Label for="search-page-input" class="sr-only">Search for expert witnesses</Label>
			<Input
				id="search-page-input"
				type="search"
				name="q"
				value={query}
				placeholder="Enter specialty, keyword, or category..."
				class="min-h-10 min-w-0 flex-1 rounded-none border-0 bg-transparent py-3 text-base text-card-foreground shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 md:px-6 md:py-4"
				aria-label="Search for expert witnesses"
			/>
			{#if categoryFilter}
				<input type="hidden" name="category" value={categoryFilter} />
			{/if}
			<Button type="submit" size="lg" class="shrink-0 rounded-none px-8">Search</Button>
		</form>
	</div>
</section>

<div class="mx-auto max-w-6xl px-6 py-12">
	{#if query}
		{#if searchResults.length > 0}
			<section>
				<div class="mb-4 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
					<h2 class="text-2xl font-semibold">Matching Specialties</h2>
					<p class="m-0 shrink-0 text-sm text-muted-foreground tabular-nums">
						{searchResults.length} matching {searchResults.length === 1 ? 'specialty' : 'specialties'}
					</p>
				</div>
				<div class="flex flex-col gap-2">
					{#each searchResults.slice(0, 50) as { subcategory, category }}
						<a
							href="/categories?q={encodeURIComponent(subcategory)}"
							class="flex items-center justify-between rounded-md border border-border bg-card px-6 py-4 transition-all hover:border-primary/40 hover:shadow-sm"
						>
							<span class="font-semibold text-foreground">{subcategory}</span>
							<span class="text-sm text-muted-foreground">{category}</span>
						</a>
					{/each}
				</div>
				{#if searchResults.length > 50}
					<p class="mt-8 text-[0.9375rem] text-muted-foreground">
						Showing first 50 results. Refine your search for more specific results.
					</p>
				{/if}
			</section>
		{:else}
			<section class="py-12 text-center">
				<h2 class="mb-4 text-2xl font-semibold">No exact matches for "{query}"</h2>
				<p class="mb-8 text-muted-foreground">Try broadening your search or browse by category:</p>
				<div class="flex flex-wrap justify-center gap-4">
					{#each filteredCategories.slice(0, 6) as cat}
						<Button href="/categories/{cat.slug}" variant="secondary">{cat.name}</Button>
					{/each}
				</div>
			</section>
		{/if}
	{:else}
		<section>
			<h2 class="mb-4 text-2xl font-semibold">Browse by Category</h2>
			<p class="mb-8 text-muted-foreground">
				Enter a search term above or select a category to find expert witnesses.
			</p>
			<div class="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4">
				{#each data.categories as cat}
					<a
						href="/categories/{cat.slug}"
						class="flex items-center gap-2 rounded-md border border-border bg-card p-6 font-medium text-foreground no-underline transition-all hover:border-primary/40 hover:text-primary hover:shadow-md"
					>
						{cat.name}
						{#if cat.expertCount}
							<span class="text-sm font-normal text-muted-foreground">({cat.expertCount})</span>
						{/if}
					</a>
				{/each}
			</div>
		</section>
	{/if}
</div>
