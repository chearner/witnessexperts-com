<script lang="ts">
  import { enhance } from "$app/forms";
  import { Button } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";
  import { Alert, AlertDescription, AlertTitle } from "$lib/components/ui/alert";
  import * as Card from "$lib/components/ui/card";

  let { form } = $props();
</script>

<svelte:head>
  <title>Create account - WitnessExperts.com</title>
</svelte:head>

<div class="flex min-h-[60vh] items-center justify-center px-6 py-12">
  <Card.Root class="w-full max-w-md">
    {#if form?.success && form?.needsConfirmation}
      <Card.Header class="text-center">
        <Card.Title>Confirm your email</Card.Title>
        <Card.Description>
          We sent a link to <span class="font-medium text-foreground">{form.email}</span>. Open it
          to verify your account, then you can sign in.
        </Card.Description>
      </Card.Header>
      <Card.Footer class="justify-center">
        <Button href="/login">Go to sign in</Button>
      </Card.Footer>
    {:else}
      <Card.Header class="text-center">
        <Card.Title>Create member account</Card.Title>
        <Card.Description>
          Register to manage your expert witness listing and inquiries.
        </Card.Description>
      </Card.Header>
      <Card.Content>
        {#if form?.message}
          <Alert variant="destructive" class="mb-6">
            <AlertTitle>Could not create account</AlertTitle>
            <AlertDescription>{form.message}</AlertDescription>
          </Alert>
        {/if}
        <form class="space-y-6" method="POST" use:enhance>
          <div class="space-y-2">
            <Label for="email">Email address</Label>
            <Input
              id="email"
              type="email"
              name="email"
              value={form?.email ?? ""}
              placeholder="you@example.com"
              required
              autocomplete="email"
            />
          </div>
          <div class="space-y-2">
            <Label for="password">Password</Label>
            <Input
              id="password"
              type="password"
              name="password"
              required
              minlength={8}
              autocomplete="new-password"
            />
          </div>
          <div class="space-y-2">
            <Label for="confirm">Confirm password</Label>
            <Input
              id="confirm"
              type="password"
              name="confirm"
              required
              minlength={8}
              autocomplete="new-password"
            />
          </div>
          <Button type="submit" class="w-full">Create account</Button>
        </form>
      </Card.Content>
      <Card.Footer class="text-center text-sm text-muted-foreground">
        <p>
          Already have an account?
          <Button href="/login" variant="link" class="inline h-auto p-0 text-sm">Sign in</Button>
        </p>
      </Card.Footer>
    {/if}
  </Card.Root>
</div>
