<script lang="ts">
  // Placeholder — would call password reset API in production
  import { Button } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";
  import * as Card from "$lib/components/ui/card";

  let email = $state("");
  let submitted = $state(false);

  function handleSubmit(e: Event) {
    e.preventDefault();
    submitted = true;
  }
</script>

<svelte:head>
  <title>Forgot Password - WitnessExperts.com</title>
  <meta
    name="description"
    content="Reset your WitnessExperts member account password. Enter your email to receive reset instructions."
  />
</svelte:head>

<div class="flex min-h-[60vh] items-center justify-center px-6 py-12">
  <Card.Root class="w-full max-w-md">
    {#if submitted}
      <Card.Header class="text-center">
        <Card.Title>Check your email</Card.Title>
        <Card.Description>
          If an account exists for <span class="font-medium text-foreground">{email}</span>, we
          sent instructions to reset your password. The link expires after a short time.
        </Card.Description>
      </Card.Header>
      <Card.Footer class="flex flex-col gap-2 sm:flex-row sm:justify-center">
        <Button href="/login" variant="default">Back to sign in</Button>
        <Button
          type="button"
          variant="outline"
          onclick={() => {
            submitted = false;
            email = "";
          }}
        >
          Use a different email
        </Button>
      </Card.Footer>
    {:else}
      <Card.Header class="text-center">
        <Card.Title>Reset password</Card.Title>
        <Card.Description>
          Enter the email for your member account. We will send a link to reset your
          password.
        </Card.Description>
      </Card.Header>
      <Card.Content>
        <form class="space-y-6" onsubmit={handleSubmit}>
          <div class="space-y-2">
            <Label for="reset-email">Email address</Label>
            <Input
              id="reset-email"
              type="email"
              name="email"
              bind:value={email}
              placeholder="you@example.com"
              required
              autocomplete="email"
            />
          </div>
          <Button type="submit" class="w-full">Send reset link</Button>
          <div class="text-center">
            <Button href="/login" variant="link" size="sm">Back to sign in</Button>
          </div>
        </form>
      </Card.Content>
    {/if}
  </Card.Root>
</div>
