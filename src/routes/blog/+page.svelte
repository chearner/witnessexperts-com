<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import * as Card from "$lib/components/ui/card";
</script>

<svelte:head>
  <title>Blog - WitnessExperts.com</title>
  <meta
    name="description"
    content="News and insights from WitnessExperts on expert witness search, listings, and the legal industry."
  />
</svelte:head>

<section class="bg-primary px-6 py-12 text-primary-foreground">
  <div class="mx-auto max-w-6xl space-y-4">
    <h1>Blog</h1>
    <p class="max-w-2xl text-primary-foreground/90">
      Updates on the directory, tips for experts and attorneys, and industry
      perspectives. This section is a placeholder until posts go live.
    </p>
  </div>
</section>

<div class="mx-auto max-w-3xl px-6 py-12">
  <Card.Root>
    <Card.Header>
      <Card.Title>No posts yet</Card.Title>
      <Card.Description>
        We will publish articles here soon. Thank you for your interest.
      </Card.Description>
    </Card.Header>
    <Card.Content>
      <p class="text-muted-foreground text-sm">
        Follow the home page and your professional networks for announcements when
        the blog launches.
      </p>
    </Card.Content>
    <Card.Footer class="justify-center">
      <Button href="/" variant="outline">Back to home</Button>
    </Card.Footer>
  </Card.Root>
</div>
