<script lang="ts">
  import type { PageData } from "./$types";
  import { page } from "$app/state";
  import FeaturedExpertsCard from "$lib/components/featured-experts-card.svelte";
  import { Badge } from "$lib/components/ui/badge";
  import { Button } from "$lib/components/ui/button";
  import * as Card from "$lib/components/ui/card";
  import { Heading } from "$lib/components/ui/heading";

  let { data }: { data: PageData } = $props();
</script>

<svelte:head>
  <title>Expert Witness Categories - WitnessExperts.com</title>
  <meta
    name="description"
    content="Browse expert witnesses by category. Find specialists in accidents, medical, business, construction, engineering, and more."
  />
</svelte:head>

<section
  class="bg-primary px-0 py-12 text-primary-foreground courtroom-image-1"
>
  <div class="mx-auto max-w-6xl space-y-4">
    <h1>Experts by Category</h1>
    <p class="max-w-2xl text-primary-foreground/90">
      Browse our directory by the disciplines attorneys use to locate expert
      witnesses for discovery, reports, and trial. Each category summarizes the
      kinds of disputes and legal questions those experts typically address.
    </p>
  </div>
</section>

<section class="mx-auto max-w-6xl px-0 py-12">
  <div
    class="grid gap-10 lg:grid-cols-[1fr_minmax(280px,340px)] lg:items-start lg:gap-12"
  >
    <div class="flex min-w-0 flex-col gap-8">
      {#each data.categories as category}
        <Card.Root>
          <Card.Header>
            <div class="flex flex-wrap items-baseline justify-between gap-4">
              <Button
                href="/categories/{category.slug}"
                variant="link"
                class="px-0!"
              >
                <Heading level={2}>
                  {category.name}
                </Heading>
              </Button>
              {#if category.expertCount}
                <Badge variant="outline">{category.expertCount} experts</Badge>
              {/if}
            </div>
            {#if category.description}
              <Card.Description class="pt-1 text-[0.9375rem] leading-relaxed">
                {category.description}
              </Card.Description>
            {/if}
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
      <div class="space-y-3">
        <FeaturedExpertsCard
          experts={data.featuredExperts}
          error={data.featuredExpertsError}
          emptyMessage="No featured listings for this page yet. Experts can add the 'Categories (all)' path under featured placements on their profile."
        />
      </div>
      {#if !page.data.session?.user}
        <p class="text-muted-foreground text-sm">
          Expert listings will appear here.
          <Button href="/list" variant="link" class="inline h-auto p-0 text-sm"
            >Get listed</Button
          >
          to appear in search results.
        </p>
      {/if}
    </aside>
  </div>
</section>
