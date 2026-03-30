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
  <title>Member account - WitnessExperts.com</title>
</svelte:head>

<section class="bg-primary px-6 py-10 text-primary-foreground">
  <div class="mx-auto max-w-6xl">
    <h1 class="text-2xl font-semibold tracking-tight md:text-3xl">Member account</h1>
    <p class="mt-2 max-w-2xl text-primary-foreground/90">
      Signed in as <span class="font-medium text-primary-foreground">{data.email}</span>
      {#if data.profile?.display_name}
        <span class="text-primary-foreground/80">
          · Showing as <span class="font-medium text-primary-foreground">{data.profile.display_name}</span>
        </span>
      {/if}
    </p>
  </div>
</section>

<div class="mx-auto max-w-6xl px-6 py-12">
  <div class="grid gap-6 lg:grid-cols-[1fr_280px]">
    <Card.Root>
      <Card.Header>
        <Card.Title>Expert profile</Card.Title>
        <Card.Description>
          This name can be used for your public listing as we connect directory data to your account.
        </Card.Description>
      </Card.Header>
      <Card.Content class="space-y-6">
        {#if data.profileError}
          <Alert variant="destructive">
            <AlertTitle>Profile unavailable</AlertTitle>
            <AlertDescription>{data.profileError}</AlertDescription>
          </Alert>
        {:else if data.profile}
          {#if form?.message}
            <Alert variant="destructive">
              <AlertTitle>Could not save</AlertTitle>
              <AlertDescription>{form.message}</AlertDescription>
            </Alert>
          {/if}
          <form method="POST" class="space-y-4" use:enhance>
            <div class="space-y-2">
              <Label for="display_name">Display name</Label>
              <Input
                id="display_name"
                type="text"
                name="display_name"
                value={form?.display_name ?? data.profile.display_name ?? ""}
                maxlength={120}
                placeholder="e.g. Dr. Jane Smith"
                autocomplete="name"
              />
              <p class="text-muted-foreground text-xs">
                How you want to appear on your listing. You can change this anytime.
              </p>
            </div>
            <Button type="submit">Save profile</Button>
          </form>
        {/if}
        <p class="text-muted-foreground text-sm">
          Password: use
          <Button href="/forgot-password" variant="link" class="inline h-auto p-0 text-sm"
            >forgot password</Button
          >
          to receive a reset link.
        </p>
      </Card.Content>
    </Card.Root>

    <Card.Root>
      <Card.Header>
        <Card.Title class="text-base">Session</Card.Title>
      </Card.Header>
      <Card.Content class="space-y-3">
        <form method="POST" action="/logout">
          <Button type="submit" variant="outline" class="w-full">Sign out</Button>
        </form>
      </Card.Content>
    </Card.Root>
  </div>
</div>
