<script lang="ts">
  import { mainCategories } from "$lib/data/categories";
  import { Badge } from "$lib/components/ui/badge";
  import { Button } from "$lib/components/ui/button";
  import * as Card from "$lib/components/ui/card";
  import { Heading } from "$lib/components/ui/heading";
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
  <div class="flex flex-col gap-8">
    {#each mainCategories as category}
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
              {#each category.subcategories.slice(0, 12) as sub}
                <Badge
                  href="/categories/{category.slug}?sub={encodeURIComponent(
                    sub,
                  )}"
                  variant="secondary"
                >
                  {sub}
                </Badge>
              {/each}
              {#if category.subcategories.length > 12}
                <Button
                  href="/categories/{category.slug}"
                  variant="link"
                  size="sm"
                >
                  +{category.subcategories.length - 12} more
                </Button>
              {/if}
            </div>
          </Card.Content>
        {/if}
      </Card.Root>
    {/each}
  </div>
</section>
