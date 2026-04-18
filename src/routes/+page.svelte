<script lang="ts">
  import type { PageData } from "./$types";
  import { HugeiconsIcon } from "@hugeicons/svelte";
  import {
    LayoutGridIcon,
    Location01Icon,
    MailSend01Icon,
  } from "@hugeicons/core-free-icons";
  import FeaturedExpertsCard from "$lib/components/featured-experts-card.svelte";
  import { Button } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";
  import * as Card from "$lib/components/ui/card";

  let { data }: { data: PageData } = $props();
</script>

<svelte:head>
  <title>WitnessExperts.com - Find Expert Witnesses for Your Case</title>
</svelte:head>

<section
  class="bg-primary px-6 py-16 text-primary-foreground md:py-24 courtroom-image-2"
>
  <div class="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:gap-12">
    <div class="flex flex-col gap-8 text-center lg:text-left">
      <div class="space-y-4">
        <h1>Find the Right Expert Witness for Your Case</h1>
        <p class="text-balance text-lg text-primary-foreground/90">
          Connect with qualified expert witnesses across 15+ practice areas.
          Trusted by attorneys nationwide.
        </p>
      </div>

      <form
        class="mx-auto flex w-full max-w-xl overflow-hidden rounded-lg border border-border bg-card text-left shadow-sm lg:mx-0"
        action="/search"
        method="get"
        role="search"
      >
        <Label for="hero-search-input" class="sr-only"
          >Search for expert witnesses</Label
        >
        <Input
          id="hero-search-input"
          type="search"
          name="q"
          placeholder="Search by specialty, keyword, or category..."
          class="min-h-10 min-w-0 flex-1 rounded-none border-0 bg-transparent py-3 text-base text-card-foreground shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 md:px-6 md:py-4"
          aria-label="Search for expert witnesses"
        />
        <Button type="submit" size="lg" class="shrink-0 rounded-none px-8">
          Search
        </Button>
      </form>

      <div class="flex flex-wrap justify-center gap-4 lg:justify-start">
        <Button href="/categories" variant="secondary">
          Browse by Category
        </Button>
        <Button href="/request" variant="secondary">Request an Expert</Button>
      </div>
    </div>

    <div class="w-full min-w-0 space-y-3">
      <FeaturedExpertsCard
        experts={data.featuredExperts}
        error={data.featuredExpertsError}
        cardClass="border-primary-foreground/20 bg-card text-left text-card-foreground shadow-lg"
      />
    </div>
  </div>
</section>

<section class="px-6 py-16 md:py-24">
  <div class="mx-auto max-w-6xl space-y-8">
    <div class="mx-auto max-w-xl space-y-2 text-center">
      <h2>Experts by Category</h2>
      <p class="text-muted-foreground">
        Browse our comprehensive directory of expert witnesses across major
        practice areas.
      </p>
    </div>

    <div class="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-4">
      {#each data.categories.slice(0, 8) as category}
        <a href="/categories/{category.slug}" class="block h-full">
          <Card.Root
            class="h-full transition-shadow hover:-translate-y-0.5 hover:shadow-md"
          >
            <Card.Header>
              <Card.Title>{category.name}</Card.Title>
              {#if category.expertCount}
                <Card.Description
                  >{category.expertCount} experts</Card.Description
                >
              {/if}
            </Card.Header>
          </Card.Root>
        </a>
      {/each}
    </div>

    <div class="flex justify-center">
      <Button variant="link" href="/categories">View All Categories →</Button>
    </div>
  </div>
</section>

<section class="bg-muted/50 px-6 py-16 md:py-24">
  <div class="mx-auto max-w-6xl">
    <div class="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-6">
      <Card.Root>
        <Card.Header class="text-center">
          <div class="mb-3 flex justify-center text-primary" aria-hidden="true">
            <HugeiconsIcon
              icon={LayoutGridIcon}
              strokeWidth={1.5}
              class="size-12"
            />
          </div>
          <Card.Title>Search by Category</Card.Title>
          <Card.Description>
            Browse experts across 15+ major practice areas with hundreds of
            specialized subcategories.
          </Card.Description>
        </Card.Header>
        <Card.Footer class="justify-center border-t">
          <Button href="/categories" variant="link">
            <HugeiconsIcon
              icon={LayoutGridIcon}
              data-icon="inline-start"
              strokeWidth={2}
              class="size-4"
            />
            Explore categories
          </Button>
        </Card.Footer>
      </Card.Root>
      <Card.Root>
        <Card.Header class="text-center">
          <div class="mb-3 flex justify-center text-primary" aria-hidden="true">
            <HugeiconsIcon
              icon={Location01Icon}
              strokeWidth={1.5}
              class="size-12"
            />
          </div>
          <Card.Title>Search by Location</Card.Title>
          <Card.Description>
            Find local experts or those willing to travel for depositions and
            trial testimony.
          </Card.Description>
        </Card.Header>
        <Card.Footer class="justify-center border-t">
          <Button href="/search?location=1" variant="link">
            <HugeiconsIcon
              icon={Location01Icon}
              data-icon="inline-start"
              strokeWidth={2}
              class="size-4"
            />
            Search by location
          </Button>
        </Card.Footer>
      </Card.Root>
      <Card.Root>
        <Card.Header class="text-center">
          <div class="mb-3 flex justify-center text-primary" aria-hidden="true">
            <HugeiconsIcon
              icon={MailSend01Icon}
              strokeWidth={1.5}
              class="size-12"
            />
          </div>
          <Card.Title>Request an Expert</Card.Title>
          <Card.Description>
            Can't find what you need? Submit a request and our network will help
            match you.
          </Card.Description>
        </Card.Header>
        <Card.Footer class="justify-center border-t">
          <Button href="/request" variant="link">
            <HugeiconsIcon
              icon={MailSend01Icon}
              data-icon="inline-start"
              strokeWidth={2}
              class="size-4"
            />
            Submit request
          </Button>
        </Card.Footer>
      </Card.Root>
    </div>
  </div>
</section>

{#if !data.session?.user}
  <section
    class="bg-primary px-6 py-16 text-center text-primary-foreground md:py-24"
  >
    <div class="mx-auto max-w-6xl space-y-6">
      <div class="mx-auto max-w-lg space-y-4">
        <h2>Are You an Expert Witness?</h2>
        <p class="text-balance text-primary-foreground/90">
          Join our directory and connect with attorneys seeking your expertise.
          Create a searchable profile today.
        </p>
      </div>
      <Button href="/register" size="lg" variant="secondary"
        >Get Listed Today</Button
      >
    </div>
  </section>
{/if}
