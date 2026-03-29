<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import * as Card from "$lib/components/ui/card";
</script>

<svelte:head>
  <title>Contact Us - WitnessExperts.com</title>
  <meta
    name="description"
    content="Contact WitnessExperts.com for questions about the expert witness directory, listings, and support."
  />
</svelte:head>

<section class="bg-primary px-6 py-12 text-primary-foreground">
  <div class="mx-auto max-w-6xl space-y-4">
    <h1>Contact us</h1>
    <p class="max-w-2xl text-primary-foreground/90">
      Reach out about directory listings, technical issues, or partnerships. Full
      contact options will be added here.
    </p>
  </div>
</section>

<div class="mx-auto max-w-3xl px-6 py-12">
  <Card.Root>
    <Card.Header>
      <Card.Title>Get in touch</Card.Title>
      <Card.Description>
        This page is a placeholder. We will list email, phone, and business hours
        when they are finalized.
      </Card.Description>
    </Card.Header>
    <Card.Content class="space-y-4 text-muted-foreground text-sm">
      <p>
        For expert requests, you can use <Button
          href="/request"
          variant="link"
          class="inline h-auto p-0 text-sm">Request an Expert</Button
        >
        from the main navigation.
      </p>
      <p>
        For listing inquiries, see <Button
          href="/list"
          variant="link"
          class="inline h-auto p-0 text-sm">Get listed today</Button
        >.
      </p>
    </Card.Content>
    <Card.Footer class="justify-center">
      <Button href="/" variant="outline">Back to home</Button>
    </Card.Footer>
  </Card.Root>
</div>
