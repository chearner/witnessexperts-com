<script lang="ts">
  import type { PageData } from "./$types";
  import { page } from "$app/state";
  import { getCategoryBySlug, type Category } from "$lib/data/categories";
  import FeaturedExpertsCard from "$lib/components/featured-experts-card.svelte";
  import { Button } from "$lib/components/ui/button";
  import * as Breadcrumb from "$lib/components/ui/breadcrumb";
  import * as Card from "$lib/components/ui/card";

  let { data }: { data: PageData } = $props();

  const slug = $derived(page.params.slug ?? "");
  const category = $derived(getCategoryBySlug(data.categories, slug));

  /** Meta description (~160 chars) for search and social previews. */
  function categoryMetaDescription(c: Category): string {
    const d = c.description?.trim();
    if (d) {
      const lead = `${c.name} expert witnesses — `;
      const max = 160;
      const rest = max - lead.length;
      if (rest <= 8)
        return `${c.name} expert witnesses for litigation.`.slice(0, max);
      return d.length <= rest ? lead + d : lead + `${d.slice(0, rest - 1)}…`;
    }
    const countPart = c.expertCount
      ? `${c.expertCount} qualified experts`
      : "Browse our directory";
    return `Find ${c.name} expert witnesses. ${countPart} available for consultation and testimony.`;
  }

  let directoryHeadshotFailed = $state<Record<string, boolean>>({});

  function markDirectoryHeadshotFailed(id: string) {
    directoryHeadshotFailed = { ...directoryHeadshotFailed, [id]: true };
  }

  function expertInitials(name: string | null | undefined) {
    const t = name?.trim();
    if (!t) return "?";
    const parts = t.split(/\s+/).filter(Boolean);
    if (parts.length >= 2)
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    return t.slice(0, 2).toUpperCase();
  }

  function bioPreview(bio: string | null | undefined, max = 160) {
    const t = bio?.trim();
    if (!t) return "";
    return t.length <= max ? t : `${t.slice(0, max).trimEnd()}…`;
  }
</script>

<svelte:head>
  <title
    >{category ? `${category.name} - Expert Witnesses` : "Category"} - WitnessExperts.com</title
  >
  {#if category}
    <meta name="description" content={categoryMetaDescription(category)} />
  {/if}
</svelte:head>

{#if category}
  <section class="bg-primary px-0 py-12 text-primary-foreground">
    <div class="mx-auto max-w-6xl space-y-4">
      <Breadcrumb.Root class="text-primary-foreground">
        <Breadcrumb.List
          class="text-primary-foreground/90 sm:gap-2 [&_a]:text-primary-foreground/90 [&_a]:hover:text-primary-foreground [&_svg]:text-primary-foreground/55"
        >
          <Breadcrumb.Item>
            <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
          </Breadcrumb.Item>
          <Breadcrumb.Separator class="text-primary-foreground/50" />
          <Breadcrumb.Item>
            <Breadcrumb.Link href="/categories">Categories</Breadcrumb.Link>
          </Breadcrumb.Item>
          <Breadcrumb.Separator class="text-primary-foreground/50" />
          <Breadcrumb.Item>
            <Breadcrumb.Page class="font-medium text-primary-foreground"
              >{category.name}</Breadcrumb.Page
            >
          </Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb.Root>
      <h1>{category.name}</h1>
      {#if category.description}
        <p
          class="max-w-3xl text-primary-foreground/90 text-[0.9375rem] leading-relaxed"
        >
          {category.description}
        </p>
      {/if}
      {#if data.subcategoryFilter}
        <p class="text-primary-foreground/90">
          Specialty: <strong class="font-semibold text-primary-foreground"
            >{data.subcategoryFilter}</strong
          >
          <Button
            href="/categories/{category.slug}"
            variant="ghost"
            size="sm"
            class="ms-2 text-primary-foreground hover:bg-primary-foreground/10"
            >Show all in category</Button
          >
        </p>
      {/if}
    </div>
  </section>

  <div class="mx-auto max-w-6xl px-0 py-12">
    <div
      class="grid gap-10 lg:grid-cols-[1fr_minmax(280px,340px)] lg:items-start lg:gap-12"
    >
      <div class="min-w-0 space-y-12">
        <section class="space-y-6" aria-labelledby="experts-heading">
          <div class="flex flex-wrap items-baseline justify-between gap-4">
            <h2
              id="experts-heading"
              class="text-2xl font-semibold tracking-tight"
            >
              {data.subcategoryFilter
                ? `${data.subcategoryFilter} Experts`
                : "Experts in this category"}
            </h2>
            {#if !data.directoryError}
              <p class="text-muted-foreground m-0 text-sm tabular-nums">
                {data.directoryProfiles.length}
                {data.directoryProfiles.length === 1 ? "profile" : "profiles"}
              </p>
            {/if}
          </div>

          {#if data.directoryError}
            <Card.Root>
              <Card.Header>
                <Card.Title class="text-base">Could not load experts</Card.Title
                >
                <Card.Description>{data.directoryError}</Card.Description>
              </Card.Header>
            </Card.Root>
          {:else if data.directoryProfiles.length === 0}
            <p class="text-muted-foreground text-[0.9375rem]">
              No public listings match
              {data.subcategoryFilter
                ? "this specialty yet."
                : "this category yet."}
            </p>
          {:else}
            <ul class="flex list-none flex-col gap-4 p-0">
              {#each data.directoryProfiles as p (p.id)}
                <li>
                  <a
                    href="/experts/{p.id}"
                    class="block rounded-lg border border-border bg-card no-underline transition-shadow hover:shadow-md"
                  >
                    <Card.Root class="border-0 shadow-none">
                      <Card.Content class="flex gap-4">
                        <div
                          class="bg-muted text-muted-foreground relative flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-full text-sm font-semibold"
                          aria-hidden="true"
                        >
                          {#if p.headshot_url && !directoryHeadshotFailed[p.id]}
                            <img
                              src={p.headshot_url}
                              alt=""
                              class="size-full object-cover"
                              loading="lazy"
                              decoding="async"
                              onerror={() => markDirectoryHeadshotFailed(p.id)}
                            />
                          {:else}
                            {expertInitials(p.display_name)}
                          {/if}
                        </div>
                        <div class="min-w-0 flex-1 space-y-1">
                          <p class="text-foreground font-semibold">
                            {p.display_name?.trim() || "Expert witness"}
                          </p>
                          {#if p.subcategory?.trim()}
                            <p class="text-muted-foreground text-sm">
                              {p.subcategory.trim()}
                            </p>
                          {/if}
                          {#if p.state_name}
                            <p class="text-muted-foreground text-sm">
                              {p.state_name}
                            </p>
                          {/if}
                          {#if bioPreview(p.bio)}
                            <p
                              class="text-muted-foreground mt-2 line-clamp-2 text-sm leading-relaxed"
                            >
                              {bioPreview(p.bio)}
                            </p>
                          {/if}
                        </div>
                      </Card.Content>
                    </Card.Root>
                  </a>
                </li>
              {/each}
            </ul>
          {/if}
        </section>

        {#if category.subcategories && category.subcategories.length > 0}
          <section class="space-y-6" aria-labelledby="subcats-heading">
            <h2
              id="subcats-heading"
              class="text-2xl font-semibold tracking-tight"
            >
              Subcategories
            </h2>
            <div
              class="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4"
            >
              {#each category.subcategories as sub}
                <a
                  href="/categories/{category.slug}?sub={encodeURIComponent(
                    sub,
                  )}"
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
      </div>

      <aside class="space-y-6 lg:sticky lg:top-24">
        <div class="space-y-3">
          <FeaturedExpertsCard
            experts={data.categoryFeaturedExperts}
            error={data.categoryFeaturedError}
          >
            {#snippet empty()}
              <p class="text-muted-foreground text-sm">
                No featured listings for this category yet.
              </p>
            {/snippet}
          </FeaturedExpertsCard>
        </div>

        <Card.Root>
          <Card.Header class="pb-2">
            <Card.Title class="text-lg">Get listed</Card.Title>
            <Card.Description>
              Create a profile so attorneys can find you in this category and
              specialties.
            </Card.Description>
          </Card.Header>
          <Card.Content class="pt-0">
            {#if !page.data.session?.user}
              <Button href="/list" variant="default" class="w-full sm:w-auto"
                >Join the directory</Button
              >
            {:else}
              <Button
                href="/account/profile"
                variant="default"
                class="w-full sm:w-auto">Edit your profile</Button
              >
            {/if}
          </Card.Content>
        </Card.Root>
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
