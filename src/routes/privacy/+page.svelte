<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import * as Card from "$lib/components/ui/card";
</script>

<svelte:head>
  <title>Privacy Policy - WitnessExperts.com</title>
  <meta
    name="description"
    content="How WitnessExperts.com collects, uses, and protects your personal information."
  />
</svelte:head>

<section class="bg-primary px-6 py-12 text-primary-foreground">
  <div class="mx-auto max-w-6xl space-y-4">
    <h1>Privacy policy</h1>
    <p class="max-w-2xl text-primary-foreground/90">
      How we handle personal data when you use our directory, forms, and related
      services. A detailed policy will appear on this page.
    </p>
  </div>
</section>

<div class="mx-auto max-w-3xl px-6 py-12">
  <Card.Root>
    <Card.Header>
      <Card.Title>Policy in progress</Card.Title>
      <Card.Description>
        We are drafting a privacy policy that describes cookies, analytics, data
        retention, and your choices. Please check back before relying on this
        summary.
      </Card.Description>
    </Card.Header>
    <Card.Content class="space-y-4 text-muted-foreground text-sm">
      <p>
        WitnessExperts.com respects your privacy. When the full policy is
        published, it will explain what we collect (for example, account and inquiry
        information), why we collect it, and how to access or delete your data where
        applicable.
      </p>
    </Card.Content>
    <Card.Footer class="justify-center">
      <Button href="/" variant="outline">Back to home</Button>
    </Card.Footer>
  </Card.Root>
</div>
