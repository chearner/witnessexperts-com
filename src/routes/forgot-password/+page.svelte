<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";
  import * as Card from "$lib/components/ui/card";

  let { form } = $props();
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
    {#if form?.success}
      <Card.Header class="text-center">
        <Card.Title>Check your email</Card.Title>
        <Card.Description>
          If an account exists for <span class="font-medium text-foreground">{form.email}</span>, we
          sent instructions to reset your password. The link expires after a short time.
        </Card.Description>
      </Card.Header>
      <Card.Footer class="flex flex-col gap-2 sm:flex-row sm:justify-center">
        <Button href="/login" variant="default">Back to sign in</Button>
        <Button href="/forgot-password" variant="outline">Use a different email</Button>
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
        <form class="space-y-6" method="POST">
          {#if form?.message}
            <p class="text-destructive text-sm" role="alert">{form.message}</p>
          {/if}
          <div class="space-y-2">
            <Label for="reset-email">Email address</Label>
            <Input
              id="reset-email"
              type="email"
              name="email"
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
