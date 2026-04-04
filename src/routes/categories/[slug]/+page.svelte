<script lang="ts">
  import type { PageData } from "./$types";
  import { page } from "$app/state";
  import { getCategoryBySlug } from "$lib/data/categories";
  import { Button } from "$lib/components/ui/button";
  import * as Card from "$lib/components/ui/card";
  import { Skeleton } from "$lib/components/ui/skeleton";

  let { data }: { data: PageData } = $props();

  const slug = $derived(page.params.slug ?? "");
  const category = $derived(getCategoryBySlug(data.categories, slug));
</script>

<svelte:head>
  <title
    >{category
      ? `${category.name} - Expert Witnesses`
      : "Category"} - WitnessExperts.com</title
  >
  {#if category}
    <meta
      name="description"
      content="Find {category.name} expert witnesses. {category.expertCount
        ? `${category.expertCount} qualified experts`
        : 'Browse our directory'} available for consultation and testimony."
    />
  {/if}
</svelte:head>

{#if category}
  <section class="bg-primary px-6 py-12 text-primary-foreground">
    <div class="mx-auto max-w-6xl space-y-4">
      <nav class="flex flex-wrap items-center gap-2 text-sm" aria-label="Breadcrumb">
        <Button
          href="/"
          variant="ghost"
          size="sm"
          class="text-primary-foreground hover:bg-primary-foreground/10"
          >Home</Button
        >
        <span class="text-primary-foreground/60" aria-hidden="true">/</span>
        <Button
          href="/categories"
          variant="ghost"
          size="sm"
          class="text-primary-foreground hover:bg-primary-foreground/10"
          >Categories</Button
        >
        <span class="text-primary-foreground/60" aria-hidden="true">/</span>
        <span class="font-medium text-primary-foreground">{category.name}</span>
      </nav>
      <h1>{category.name}</h1>
      {#if category.expertCount}
        <p class="text-primary-foreground/90">
          {category.expertCount} expert witnesses in this category
        </p>
      {/if}
    </div>
  </section>

  <div class="mx-auto max-w-6xl px-6 py-12">
    <div
      class="grid gap-10 lg:grid-cols-[1fr_minmax(280px,340px)] lg:items-start lg:gap-12"
    >
      {#if category.subcategories && category.subcategories.length > 0}
        <section class="min-w-0 space-y-6">
          <h2>Subcategories</h2>
          <div
            class="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4"
          >
            {#each category.subcategories as sub}
              <a
                href="/search?q={encodeURIComponent(sub)}&category={category.slug}"
              >
                <Card.Root class="h-full transition-shadow hover:shadow-md">
                  <Card.Header>
                    <Card.Title class="text-base">{sub}</Card.Title>
                  </Card.Header>
                </Card.Root>
              </a>
            {/each}
          </div>
        </section>
      {/if}

      <aside
        class="space-y-6 {category.subcategories?.length
          ? 'lg:sticky lg:top-24'
          : 'lg:col-span-full lg:mx-auto lg:max-w-2xl'}"
      >
        <h2>Featured experts</h2>
        <div class="grid gap-6">
          {#each [1, 2, 3] as _}
            <Card.Root>
              <Card.Content class="flex gap-4">
                <Skeleton class="size-16 shrink-0 rounded-full" />
                <div class="flex min-w-0 flex-1 flex-col gap-2">
                  <Skeleton class="h-3 w-full" />
                  <Skeleton class="h-3 w-[80%]" />
                  <Skeleton class="h-3 w-1/2" />
                </div>
              </Card.Content>
            </Card.Root>
          {/each}
        </div>
        {#if !page.data.session?.user}
          <p class="text-muted-foreground text-sm">
            Expert listings will appear here.
            <Button href="/list" variant="link" class="inline h-auto p-0 text-sm"
              >Get listed</Button
            >
            to appear in search results.
          </p>
        {:else}
          <p class="text-muted-foreground text-sm">
            Expert listings will appear here.
          </p>
        {/if}
      </aside>
    </div>
  </div>
{:else}
  <div class="mx-auto max-w-lg px-6 py-24 text-center">
    <Card.Root>
      <Card.Header>
        <Card.Title>Category not found</Card.Title>
        <Card.Description>
          The category you're looking for doesn't exist or has been moved.
        </Card.Description>
      </Card.Header>
      <Card.Footer class="justify-center">
        <Button href="/categories">Browse all categories</Button>
      </Card.Footer>
    </Card.Root>
  </div>
{/if}
