<script lang="ts">
  import type { PageData } from "./$types";
  import { page } from "$app/state";
  import { getCategoryBySlug } from "$lib/data/categories";
  import { Button } from "$lib/components/ui/button";
  import * as Card from "$lib/components/ui/card";

  let { data }: { data: PageData } = $props();

  const slug = $derived(page.params.slug ?? "");
  const category = $derived(getCategoryBySlug(data.categories, slug));

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
      <nav
        class="flex flex-wrap items-center gap-2 text-sm"
        aria-label="Breadcrumb"
      >
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
      {:else if category.expertCount}
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
      <div class="min-w-0 space-y-12">
        <section class="space-y-6" aria-labelledby="experts-heading">
          <div class="flex flex-wrap items-baseline justify-between gap-4">
            <h2 id="experts-heading" class="text-2xl font-semibold tracking-tight">
              {data.subcategoryFilter
                ? `Experts — ${data.subcategoryFilter}`
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
                <Card.Title class="text-base">Could not load experts</Card.Title>
                <Card.Description>{data.directoryError}</Card.Description>
              </Card.Header>
            </Card.Root>
          {:else if data.directoryProfiles.length === 0}
            <p class="text-muted-foreground text-[0.9375rem]">
              No public listings match
              {data.subcategoryFilter
                ? "this specialty yet."
                : "this category yet."}
              Experts appear here when their profile is active and their primary
              category matches.
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
                      <Card.Content class="flex gap-4 pt-6">
                        <div
                          class="bg-muted text-muted-foreground flex size-14 shrink-0 items-center justify-center rounded-full text-sm font-semibold"
                          aria-hidden="true"
                        >
                          {expertInitials(p.display_name)}
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
                            <p class="text-muted-foreground mt-2 line-clamp-2 text-sm leading-relaxed">
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
            <h2 id="subcats-heading" class="text-2xl font-semibold tracking-tight">
              Subcategories
            </h2>
            <p class="text-muted-foreground text-sm">
              Choose a specialty to see experts who listed it as their focus.
            </p>
            <div
              class="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4"
            >
              {#each category.subcategories as sub}
                <a
                  href="/categories/{category.slug}?sub={encodeURIComponent(sub)}"
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
        <h2 class="text-lg font-semibold">Get listed</h2>
        <p class="text-muted-foreground text-sm">
          Create a profile so attorneys can find you in this category and
          specialties.
        </p>
        {#if !page.data.session?.user}
          <Button href="/list" variant="default" class="w-full sm:w-auto"
            >Join the directory</Button
          >
        {:else}
          <Button href="/account/profile" variant="default" class="w-full sm:w-auto"
            >Edit your profile</Button
          >
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
