<script lang="ts">
  import { enhance } from "$app/forms";
  import { Button } from "$lib/components/ui/button";
  import { submittingEnhance } from "$lib/submitting-enhance.js";
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";
  import { Alert, AlertDescription, AlertTitle } from "$lib/components/ui/alert";
  import * as Card from "$lib/components/ui/card";

  let { form } = $props();

  let submitting = $state(false);
</script>

<svelte:head>
  <title>Set new password - WitnessExperts.com</title>
</svelte:head>

<div class="flex min-h-[60vh] items-center justify-center px-6 py-12">
  <Card.Root class="w-full max-w-md">
    <Card.Header class="text-center">
      <Card.Title>Choose a new password</Card.Title>
      <Card.Description>
        Enter and confirm your new password for this account.
      </Card.Description>
    </Card.Header>
    <Card.Content>
      {#if form?.message}
        <Alert variant="destructive" class="mb-6">
          <AlertTitle>Could not update password</AlertTitle>
          <AlertDescription>{form.message}</AlertDescription>
        </Alert>
      {/if}
      <form
        class="space-y-6"
        method="POST"
        use:enhance={submittingEnhance((v) => (submitting = v))}
      >
        <div class="space-y-2">
          <Label for="password">New password</Label>
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
        <Button type="submit" class="w-full" loading={submitting}>Update password</Button>
        <div class="text-center">
          <Button href="/login" variant="link" size="sm">Back to sign in</Button>
        </div>
      </form>
    </Card.Content>
  </Card.Root>
</div>
