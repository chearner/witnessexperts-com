<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import * as Card from "$lib/components/ui/card";
</script>

<svelte:head>
  <title>Expert Library - WitnessExperts.com</title>
  <meta
    name="description"
    content="Articles, guides, and resources for expert witnesses and attorneys using WitnessExperts.com."
  />
</svelte:head>

<section class="bg-primary px-6 py-12 text-primary-foreground">
  <div class="mx-auto max-w-6xl space-y-4">
    <h1>Expert library</h1>
    <p class="max-w-2xl text-primary-foreground/90">
      Practical articles and reference material for experts and legal professionals.
      Full content is coming soon.
    </p>
  </div>
</section>

<div class="mx-auto max-w-3xl px-6 py-12">
  <Card.Root>
    <Card.Header>
      <Card.Title>Coming soon</Card.Title>
      <Card.Description>
        We are building a library of guides on listing your practice, responding to
        inquiries, and working with counsel. Check back shortly.
      </Card.Description>
    </Card.Header>
    <Card.Content>
      <p class="text-muted-foreground text-sm">
        In the meantime, browse experts by category or use search to find specialists
        for your matter.
      </p>
    </Card.Content>
    <Card.Footer class="flex flex-wrap justify-center gap-2">
      <Button href="/categories" variant="default">Browse categories</Button>
      <Button href="/search" variant="outline">Search directory</Button>
    </Card.Footer>
  </Card.Root>
</div>
