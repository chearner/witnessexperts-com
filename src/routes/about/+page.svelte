<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import * as Card from "$lib/components/ui/card";
</script>

<svelte:head>
  <title>About Us - WitnessExperts.com</title>
  <meta
    name="description"
    content="Learn about WitnessExperts.com and our mission to connect attorneys with qualified expert witnesses."
  />
</svelte:head>

<section class="bg-primary px-6 py-12 text-primary-foreground">
  <div class="mx-auto max-w-6xl space-y-4">
    <h1>About us</h1>
    <p class="max-w-2xl text-primary-foreground/90">
      WitnessExperts.com is America's trusted directory for connecting attorneys
      with qualified expert witnesses.
    </p>
  </div>
</section>

<div class="mx-auto max-w-3xl px-6 py-12">
  <Card.Root>
    <Card.Header>
      <Card.Title>Our mission</Card.Title>
      <Card.Description>
        We help legal professionals find the right expertise—clearly, quickly, and
        with confidence.
      </Card.Description>
    </Card.Header>
    <Card.Content class="space-y-4 text-muted-foreground text-sm">
      <p>
        WitnessExperts.com exists to make expert discovery simpler. Whether you
        are building a case strategy or narrowing a long list of candidates, our
        directory is designed to surface relevant specialists and practical ways to
        reach them.
      </p>
      <p>
        For experts, we offer a place to present credentials and practice areas so
        the attorneys who need your perspective can find you. For law firms and
        counsel, we focus on search, categories, and tools that respect how you
        already work.
      </p>
      <p>
        Questions? <Button href="/contact" variant="link" class="inline h-auto p-0 text-sm"
          >Contact us</Button
        >—we are happy to hear from you.
      </p>
    </Card.Content>
    <Card.Footer class="justify-center">
      <Button href="/" variant="outline">Back to home</Button>
    </Card.Footer>
  </Card.Root>
</div>
