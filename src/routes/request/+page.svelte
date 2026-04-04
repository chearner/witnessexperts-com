<script lang="ts">
  import type { PageData } from "./$types";
  import { Button } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";
  import { Textarea } from "$lib/components/ui/textarea";
  import * as Card from "$lib/components/ui/card";
  import { cn } from "$lib/utils.js";

  let { data }: { data: PageData } = $props();

  let submitted = $state(false);
  let formData = $state({
    name: "",
    email: "",
    firm: "",
    phone: "",
    category: "",
    description: "",
  });

  const selectClass = cn(
    "bg-input/30 border-input focus-visible:border-ring focus-visible:ring-ring/50 h-9 w-full min-w-0 rounded-4xl border px-3 py-1 text-base transition-colors focus-visible:ring-[3px] outline-none md:text-sm",
  );

  function handleSubmit(e: Event) {
    e.preventDefault();
    submitted = true;
  }
</script>

<svelte:head>
  <title>Request an Expert Witness - WitnessExperts.com</title>
  <meta
    name="description"
    content="Can't find the right expert? Submit a request and our network will help match you with qualified expert witnesses."
  />
</svelte:head>

<section class="bg-primary px-6 py-12 text-primary-foreground">
  <div class="mx-auto max-w-6xl space-y-4">
    <h1>Request an Expert</h1>
    <p class="max-w-2xl text-primary-foreground/90">
      Can't find the right expert in our directory? Submit your request and we'll
      help connect you with qualified expert witnesses from our network.
    </p>
  </div>
</section>

<div class="mx-auto max-w-6xl px-6 py-12">
  {#if submitted}
    <Card.Root class="mx-auto max-w-md text-center">
      <Card.Header>
        <Card.Title class="text-xl">Request received</Card.Title>
        <Card.Description>
          Thank you for your submission. Our team will review your request and
          reach out within 1–2 business days with potential expert matches.
        </Card.Description>
      </Card.Header>
      <Card.Footer class="justify-center">
        <Button href="/categories">Browse Categories</Button>
      </Card.Footer>
    </Card.Root>
  {:else}
    <div class="grid items-start gap-12 lg:grid-cols-[1fr_320px]">
      <Card.Root>
        <Card.Content class="pt-6">
          <form class="space-y-6" onsubmit={handleSubmit}>
            <div class="space-y-2">
              <Label for="name">Your name *</Label>
              <Input
                id="name"
                type="text"
                bind:value={formData.name}
                required
                placeholder="Full name"
                autocomplete="name"
              />
            </div>

            <div class="grid gap-6 md:grid-cols-2">
              <div class="space-y-2">
                <Label for="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  bind:value={formData.email}
                  required
                  placeholder="you@firm.com"
                  autocomplete="email"
                />
              </div>
              <div class="space-y-2">
                <Label for="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  bind:value={formData.phone}
                  placeholder="(555) 123-4567"
                  autocomplete="tel"
                />
              </div>
            </div>

            <div class="space-y-2">
              <Label for="firm">Law firm / organization</Label>
              <Input
                id="firm"
                type="text"
                bind:value={formData.firm}
                placeholder="Firm name"
                autocomplete="organization"
              />
            </div>

            <div class="space-y-2">
              <Label for="category">Expert category *</Label>
              <select
                id="category"
                name="category"
                bind:value={formData.category}
                required
                class={selectClass}
              >
                <option value="">Select a category</option>
                {#each data.categories as cat}
                  <option value={cat.slug}>{cat.name}</option>
                {/each}
              </select>
            </div>

            <div class="space-y-2">
              <Label for="description">Describe your needs *</Label>
              <Textarea
                id="description"
                bind:value={formData.description}
                required
                rows={5}
                placeholder="Describe the type of expert you need, case type, timeline, and any specific requirements..."
                class="min-h-[120px] resize-y"
              />
            </div>

            <Button type="submit" class="w-full md:w-auto">Submit request</Button>
          </form>
        </Card.Content>
      </Card.Root>

      <aside class="sticky top-24 space-y-6">
        <Card.Root>
          <Card.Header>
            <Card.Title class="text-lg">What happens next?</Card.Title>
          </Card.Header>
          <Card.Content>
            <ol class="list-decimal space-y-2 pl-5 text-muted-foreground text-sm">
              <li>We review your request within 24 hours</li>
              <li>Our team searches our network for matching experts</li>
              <li>You receive curated expert profiles via email</li>
              <li>Connect directly with experts for consultations</li>
            </ol>
          </Card.Content>
        </Card.Root>

        <Card.Root>
          <Card.Header>
            <Card.Title class="text-lg">Prefer to search?</Card.Title>
            <Card.Description>
              Browse our directory of 1,400+ expert witnesses across 15+ practice
              areas.
            </Card.Description>
          </Card.Header>
          <Card.Footer>
            <Button href="/categories" variant="outline">Browse categories</Button>
          </Card.Footer>
        </Card.Root>
      </aside>
    </div>
  {/if}
</div>
