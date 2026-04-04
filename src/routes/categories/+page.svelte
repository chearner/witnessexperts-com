<script lang="ts">
  import type { PageData } from "./$types";
  import { page } from "$app/state";
  import { Badge } from "$lib/components/ui/badge";
  import { Button } from "$lib/components/ui/button";
  import * as Card from "$lib/components/ui/card";
  import { Heading } from "$lib/components/ui/heading";
  import { Skeleton } from "$lib/components/ui/skeleton";

  let { data }: { data: PageData } = $props();
</script>

<svelte:head>
  <title>Expert Witness Categories - WitnessExperts.com</title>
  <meta
    name="description"
    content="Browse expert witnesses by category. Find specialists in accidents, medical, business, construction, engineering, and more."
  />
</svelte:head>

<section class="bg-primary px-6 py-12 text-primary-foreground">
  <div class="mx-auto max-w-6xl space-y-4">
    <h1>Experts by Category</h1>
    <p class="max-w-2xl text-primary-foreground/90">
      Browse our comprehensive directory of expert witnesses. Select a category
      to view subcategories and available experts.
    </p>
  </div>
</section>

<section class="mx-auto max-w-6xl px-6 py-12">
  <div
    class="grid gap-10 lg:grid-cols-[1fr_minmax(280px,340px)] lg:items-start lg:gap-12"
  >
    <div class="flex min-w-0 flex-col gap-8">
      {#each data.categories as category}
        <Card.Root>
          <Card.Header>
            <div class="flex flex-wrap items-baseline justify-between gap-4">
              <Button href="/categories/{category.slug}" variant="link">
                <Heading level={2}>
                  {category.name}
                </Heading>
              </Button>
              {#if category.expertCount}
                <Badge variant="outline">{category.expertCount} experts</Badge>
              {/if}
            </div>
          </Card.Header>
          {#if category.subcategories && category.subcategories.length > 0}
            <Card.Content>
              <div class="flex flex-wrap gap-2">
                {#each category.subcategories as sub}
                  <Badge
                    href="/categories/{category.slug}?sub={encodeURIComponent(
                      sub,
                    )}"
                    variant="secondary"
                  >
                    {sub}
                  </Badge>
                {/each}
              </div>
            </Card.Content>
          {/if}
        </Card.Root>
      {/each}
    </div>

    <aside class="space-y-6 lg:sticky lg:top-24">
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
</section>
