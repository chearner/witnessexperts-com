<script lang="ts">
  import { enhance } from "$app/forms";
  import { Button } from "$lib/components/ui/button";
  import * as Card from "$lib/components/ui/card";
  import { submittingEnhance } from "$lib/submitting-enhance.js";

  let submitting = $state(false);
</script>

<svelte:head>
  <title>Sign out - WitnessExperts.com</title>
</svelte:head>

<div class="flex min-h-[40vh] items-center justify-center px-6 py-12">
  <Card.Root class="w-full max-w-md text-center">
    <Card.Header>
      <Card.Title>Sign out</Card.Title>
      <Card.Description>End your session on this device.</Card.Description>
    </Card.Header>
    <Card.Footer class="justify-center">
      <form method="POST" use:enhance={submittingEnhance((v) => (submitting = v))}>
        <Button type="submit" loading={submitting}>Sign out</Button>
      </form>
    </Card.Footer>
  </Card.Root>
</div>
