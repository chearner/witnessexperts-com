<script lang="ts">
  import { enhance } from "$app/forms";
  import { page } from "$app/state";
  import { submittingEnhance } from "$lib/submitting-enhance.js";
  import { Button } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";
  import {
    Alert,
    AlertDescription,
    AlertTitle,
  } from "$lib/components/ui/alert";
  import { toast } from "$lib/components/ui/sonner";
  import * as Card from "$lib/components/ui/card";

  let { data, form } = $props();

  let submitting = $state(false);

  let emailVal = $state("");

  $effect(() => {
    const f = form;
    emailVal = (f?.email as string | undefined) ?? data.email ?? "";
  });

  const saved = $derived(page.url.searchParams.get("saved") === "1");
  const emailPending = $derived(
    page.url.searchParams.get("email") === "confirm",
  );

  let prevSaved = $state(false);
  $effect(() => {
    if (saved && !prevSaved) {
      toast.success("Account updated", {
        description: emailPending
          ? "Check your inbox to confirm your new email address."
          : "Your changes were saved.",
      });
    }
    prevSaved = saved;
  });
</script>

<svelte:head>
  <title>Account - WitnessExperts.com</title>
</svelte:head>

<div class="mx-auto w-full max-w-6xl px-4 py-8 md:px-6 md:py-10">
  <div class="mb-8">
    <h1 class="text-2xl font-semibold tracking-tight md:text-3xl">Account</h1>
    <p class="text-muted-foreground mt-2 text-sm md:text-base">
      Sign-in email and password.
    </p>
  </div>

  <div class="grid grid-cols-1 gap-10 lg:grid-cols-3 lg:items-start lg:gap-12">
    <div class="flex min-w-0 flex-col gap-8 lg:col-span-2">
      <Card.Root>
        <Card.Header>
          <Card.Title>Login &amp; email</Card.Title>
          <Card.Description>
            This email is used to sign in. It is not shown on your directory
            listing unless you add it to your profile separately.
          </Card.Description>
        </Card.Header>
        <Card.Content class="space-y-6">
          {#if form?.message}
            <Alert variant="destructive">
              <AlertTitle>Could not save</AlertTitle>
              <AlertDescription>{form.message}</AlertDescription>
            </Alert>
          {/if}

          <form
            method="POST"
            class="space-y-4"
            use:enhance={submittingEnhance((v) => (submitting = v))}
          >
            <div class="space-y-2">
              <Label for="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                bind:value={emailVal}
                required
                autocomplete="email"
              />
              <p class="text-muted-foreground text-xs">
                Changing your email may require confirming the new address
                (Supabase will email you).
              </p>
            </div>

            <Button type="submit" loading={submitting}>Save email</Button>
          </form>

          <div class="space-y-2">
            <p class="text-sm font-medium">Password</p>
            <p class="text-muted-foreground text-sm">
              Use
              <Button
                href="/forgot-password"
                variant="link"
                class="inline h-auto p-0 text-sm">Forgot password</Button
              >
              to receive a reset link. Sign out from the menu on your name in the
              sidebar.
            </p>
          </div>
        </Card.Content>
      </Card.Root>

      <Card.Root>
        <Card.Header>
          <Card.Title>Expert profile</Card.Title>
          <Card.Description>
            Display name, practice areas, and bio for the witness directory.
          </Card.Description>
        </Card.Header>
        <Card.Content>
          <Button href="/account/profile" variant="secondary">
            Manage expert profile
          </Button>
        </Card.Content>
      </Card.Root>
    </div>

    <aside class="space-y-6 lg:sticky lg:top-24">
      <Card.Root>
        <Card.Header>
          <Card.Title class="text-lg">Account tips</Card.Title>
          <Card.Description>
            Keep sign-in separate from how you appear to attorneys.
          </Card.Description>
        </Card.Header>
        <Card.Content class="text-muted-foreground space-y-3 text-sm">
          <p>
            Your <strong class="text-foreground font-medium">email</strong> is only
            for logging in and notifications—it is not your directory display name.
          </p>
          <p>
            Use <strong class="text-foreground font-medium"
              >Forgot password</strong
            >
            if you need a reset; you stay signed in until you sign out from the menu.
          </p>
          <p>
            <Button
              href="/account/profile"
              variant="link"
              class="h-auto p-0 text-sm">Expert profile</Button
            >
            is where name, category, and bio appear in search.
          </p>
        </Card.Content>
      </Card.Root>
    </aside>
  </div>
</div>
