<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import * as Card from "$lib/components/ui/card";
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
      <form method="POST">
        <Button type="submit">Sign out</Button>
      </form>
    </Card.Footer>
  </Card.Root>
</div>
