<script lang="ts">
  import type { PageData } from "./$types";
  import { Button } from "$lib/components/ui/button";
  import * as Card from "$lib/components/ui/card";

  let { data }: { data: PageData } = $props();

  const expert = $derived(data.expert);

  let heroHeadshotFailed = $state(false);

  $effect(() => {
    void expert?.headshot_url;
    heroHeadshotFailed = false;
  });

  function expertInitials(name: string | null | undefined) {
    const t = name?.trim() ?? "";
    if (!t) return "?";
    const parts = t.split(/\s+/).filter(Boolean);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase() || "?";
    }
    return t.slice(0, 2).toUpperCase();
  }
</script>

<svelte:head>
  <title
    >{expert?.display_name?.trim()
      ? `${expert.display_name.trim()} - Expert Witness`
      : "Expert profile"} - WitnessExperts.com</title
  >
  <meta
    name="description"
    content={expert?.bio?.trim()
      ? expert.bio.trim().slice(0, 155)
      : "Expert witness directory profile on WitnessExperts.com."}
  />
</svelte:head>

{#if data.loadError}
  <div class="mx-auto max-w-lg px-6 py-24 text-center">
    <Card.Root>
      <Card.Header>
        <Card.Title>Could not load profile</Card.Title>
        <Card.Description>{data.loadError}</Card.Description>
      </Card.Header>
      <Card.Footer class="justify-center">
        <Button href="/categories">Browse categories</Button>
      </Card.Footer>
    </Card.Root>
  </div>
{:else if expert}
  <section class="bg-primary px-0 py-12 text-primary-foreground">
    <div class="mx-auto max-w-3xl">
      <div class="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
        <div
          class="border-primary-foreground/25 bg-primary-foreground/10 text-primary-foreground/80 relative flex size-28 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 text-lg font-semibold"
          aria-hidden="true"
        >
          {#if expert.headshot_url && !heroHeadshotFailed}
            <img
              src={expert.headshot_url}
              alt=""
              class="size-full object-cover"
              loading="eager"
              decoding="async"
              onerror={() => (heroHeadshotFailed = true)}
            />
          {:else}
            {expertInitials(expert.display_name)}
          {/if}
        </div>
        <div class="min-w-0 flex-1 space-y-4">
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
            {#if expert.primary_category_slug}
              <span class="text-primary-foreground/60" aria-hidden="true">/</span>
              <Button
                href="/categories/{expert.primary_category_slug}"
                variant="ghost"
                size="sm"
                class="text-primary-foreground hover:bg-primary-foreground/10"
                >{data.categoryLabel ?? expert.primary_category_slug}</Button
              >
            {/if}
          </nav>
          <h1 class="text-3xl font-semibold tracking-tight">
            {expert.display_name?.trim() || "Expert witness"}
          </h1>
          <p class="text-primary-foreground/90">
            {#if data.categoryLabel}
              {data.categoryLabel}
            {:else if expert.primary_category_slug}
              {expert.primary_category_slug}
            {/if}
            {#if expert.subcategory?.trim()}
              <span class="text-primary-foreground/70">
                ·
              </span>{expert.subcategory.trim()}
            {/if}
            {#if expert.state_name}
              <span class="text-primary-foreground/70"> · </span>{expert.state_name}
            {/if}
          </p>
        </div>
      </div>
    </div>
  </section>

  <div class="mx-auto max-w-3xl px-6 py-12">
    <Card.Root>
      <Card.Header>
        <Card.Title>About</Card.Title>
      </Card.Header>
      <Card.Content class="space-y-6">
        {#if expert.bio?.trim()}
          <p
            class="text-muted-foreground whitespace-pre-wrap text-[0.9375rem] leading-relaxed"
          >
            {expert.bio.trim()}
          </p>
        {:else}
          <p class="text-muted-foreground text-sm">
            This expert has not added a bio yet.
          </p>
        {/if}
        {#if expert.phone?.trim()}
          <div>
            <h3 class="mb-1 text-sm font-medium">Phone</h3>
            <a
              class="text-primary text-sm font-medium underline-offset-4 hover:underline"
              href="tel:{expert.phone.trim()}">{expert.phone.trim()}</a
            >
          </div>
        {/if}
      </Card.Content>
    </Card.Root>
  </div>
{/if}
