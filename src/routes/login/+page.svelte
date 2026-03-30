<script lang="ts">
  import { enhance } from "$app/forms";
  import { Button } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";
  import { Alert, AlertDescription, AlertTitle } from "$lib/components/ui/alert";
  import * as Card from "$lib/components/ui/card";

  let { data, form } = $props();
</script>

<svelte:head>
  <title>Member Login - WitnessExperts.com</title>
</svelte:head>

<div class="flex min-h-[60vh] items-center justify-center px-6 py-12">
  <Card.Root class="w-full max-w-md">
    <Card.Header class="text-center">
      <Card.Title>Member login</Card.Title>
      <Card.Description>
        Sign in to manage your expert witness profile and view inquiries.
      </Card.Description>
    </Card.Header>
    <Card.Content>
      {#if data.error}
        <Alert variant="destructive" class="mb-6">
          <AlertTitle>Could not complete sign-in</AlertTitle>
          <AlertDescription>{data.error}</AlertDescription>
        </Alert>
      {/if}
      {#if form?.message}
        <Alert variant="destructive" class="mb-6">
          <AlertTitle>Sign-in failed</AlertTitle>
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
            autocomplete="current-password"
          />
        </div>
        <Button type="submit" class="w-full">Sign in</Button>
        <div class="text-center">
          <Button href="/forgot-password" variant="link" size="sm">
            Forgot password?
          </Button>
        </div>
      </form>
    </Card.Content>
    <Card.Footer
      class="flex flex-col items-center gap-1 text-center text-sm text-muted-foreground"
    >
      <p>
        New here?
        <Button href="/register" variant="link" class="inline h-auto p-0 text-sm">
          Create an account
        </Button>
      </p>
      <p>
        Want a listing?
        <Button href="/list" variant="link" class="inline h-auto p-0 text-sm">
          Get listed today
        </Button>
      </p>
    </Card.Footer>
  </Card.Root>
</div>
