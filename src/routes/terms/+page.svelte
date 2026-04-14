<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import * as Card from "$lib/components/ui/card";
</script>

<svelte:head>
  <title>Terms & Conditions - WitnessExperts.com</title>
  <meta
    name="description"
    content="Terms and conditions for using WitnessExperts.com and the expert witness directory."
  />
</svelte:head>

<section class="bg-primary px-0 py-12 text-primary-foreground">
  <div class="mx-auto max-w-6xl space-y-4">
    <h1>Terms & conditions</h1>
    <p class="max-w-2xl text-primary-foreground/90">
      Legal terms governing use of this website and our services. A full
      agreement will be posted here for your review.
    </p>
  </div>
</section>

<div class="mx-auto max-w-3xl px-6 py-12">
  <Card.Root>
    <Card.Header>
      <Card.Title>Draft placeholder</Card.Title>
      <Card.Description>
        Complete terms of use, disclaimers, and liability limitations are in
        preparation. This page will be replaced with the final legal text.
      </Card.Description>
    </Card.Header>
    <Card.Content class="space-y-4 text-muted-foreground text-sm">
      <p>
        WitnessExperts.com provides a directory and introduction service. It
        does not provide legal advice and is not a law firm. Use of the site is
        at your own risk until formal terms are published.
      </p>
      <p>
        For questions about these terms, use the contact page once it includes
        current support channels.
      </p>
    </Card.Content>
    <Card.Footer class="justify-center">
      <Button href="/contact" variant="outline">Contact us</Button>
    </Card.Footer>
  </Card.Root>
</div>
