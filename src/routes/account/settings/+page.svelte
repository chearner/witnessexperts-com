<script lang="ts">
  import { enhance } from "$app/forms";
  import { page } from "$app/state";
  import { submittingEnhance } from "$lib/submitting-enhance.js";
  import { Button } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";
  import { Separator } from "$lib/components/ui/separator";
  import {
    Alert,
    AlertDescription,
    AlertTitle,
  } from "$lib/components/ui/alert";
  import { toast } from "$lib/components/ui/sonner";
  import * as Card from "$lib/components/ui/card";

  let { data, form } = $props();

  let submittingVisibility = $state(false);
  let submittingDelete = $state(false);

  let deleteConfirm = $state("");
  let showInDirectory = $state(false);

  $effect.pre(() => {
    showInDirectory = data.listingActive;
  });

  const saved = $derived(page.url.searchParams.get("saved") === "1");

  let prevSaved = $state(false);
  $effect(() => {
    if (saved && !prevSaved) {
      toast.success("Settings saved", {
        description: "Your directory visibility was updated.",
      });
    }
    prevSaved = saved;
  });
</script>

<svelte:head>
  <title>Account settings - WitnessExperts.com</title>
</svelte:head>

<div class="mx-auto w-full max-w-6xl px-4 py-8 md:px-6 md:py-10">
  <div class="mb-8">
    <h1 class="text-2xl font-semibold tracking-tight md:text-3xl">Settings</h1>
    <p class="text-muted-foreground mt-2 text-sm md:text-base">
      Control whether your expert profile appears in the directory and manage
      your account.
    </p>
  </div>

  <div class="grid grid-cols-1 gap-10 lg:grid-cols-3 lg:items-start lg:gap-12">
    <div class="flex min-w-0 flex-col gap-10 lg:col-span-2">
    <Card.Root>
      <Card.Header>
        <Card.Title>Directory listing</Card.Title>
        <Card.Description>
          When your listing is active, your profile can appear in the public
          expert directory (as directory features roll out). You can hide it at
          any time without losing your account.
        </Card.Description>
      </Card.Header>
      <Card.Content class="space-y-4">
        {#if form?.message}
          <Alert variant="destructive">
            <AlertTitle>Could not save</AlertTitle>
            <AlertDescription>{form.message}</AlertDescription>
          </Alert>
        {/if}

        <form
          method="POST"
          action="?/setVisibility"
          class="space-y-4"
          use:enhance={submittingEnhance((v) => (submittingVisibility = v))}
        >
          <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div class="space-y-1">
              <Label for="listing_active" class="text-base font-medium">
                Show in directory
              </Label>
              <p class="text-muted-foreground text-sm">
                Turn off to temporarily remove your profile from directory search
                and listings.
              </p>
            </div>
            <label
              class="border-input bg-input/30 focus-within:border-ring focus-within:ring-ring/50 flex shrink-0 cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 focus-within:ring-[3px]"
            >
              <input
                id="listing_active"
                type="checkbox"
                name="listing_active"
                value="true"
                bind:checked={showInDirectory}
                class="accent-primary size-4 rounded border"
              />
              <span class="text-sm font-medium">
                {showInDirectory ? "Active" : "Hidden"}
              </span>
            </label>
          </div>

          <Button type="submit" loading={submittingVisibility}>
            Save visibility
          </Button>
        </form>

        {#if !data.listingActive}
          <Alert>
            <AlertTitle>Listing is hidden</AlertTitle>
            <AlertDescription>
              Your profile will not be shown in the directory. You can turn this
              back on whenever you are ready.
            </AlertDescription>
          </Alert>
        {/if}
      </Card.Content>
    </Card.Root>

    <Separator />

    <section
      class="border-destructive/40 bg-destructive/5 rounded-2xl border p-6"
      aria-labelledby="danger-zone-heading"
    >
      <h2 id="danger-zone-heading" class="text-destructive text-lg font-semibold">
        Danger zone
      </h2>
      <p class="text-muted-foreground mt-2 text-sm">
        Actions here cannot be undone. Only available while your directory
        listing is turned off, so you do not remove your profile from search by
        mistake.
      </p>

      {#if data.listingActive}
        <p class="text-muted-foreground mt-4 text-sm">
          To delete your account, first turn off <strong>Show in directory</strong>
          above and save. Then you can permanently delete your account here.
        </p>
      {:else}
        <div class="mt-6 space-y-4">
          <Alert variant="destructive">
            <AlertTitle>Permanent account deletion</AlertTitle>
            <AlertDescription>
              Deleting your account removes your login and profile data. This is
              irreversible. Your expert listing and member access will be gone.
            </AlertDescription>
          </Alert>

          {#if form?.deleteError}
            <Alert variant="destructive">
              <AlertTitle>Could not delete account</AlertTitle>
              <AlertDescription>{form.deleteError}</AlertDescription>
            </Alert>
          {/if}

          <form
            method="POST"
            action="?/deleteAccount"
            class="space-y-4"
            use:enhance={submittingEnhance((v) => (submittingDelete = v))}
          >
            <div class="space-y-2">
              <Label for="delete_confirm">Type DELETE to confirm</Label>
              <Input
                id="delete_confirm"
                name="delete_confirm"
                type="text"
                bind:value={deleteConfirm}
                autocomplete="off"
                placeholder="DELETE"
                class="max-w-xs font-mono"
              />
              <p class="text-muted-foreground text-xs">
                You must type the word DELETE in uppercase to enable deletion.
              </p>
            </div>
            <Button
              type="submit"
              variant="destructive"
              loading={submittingDelete}
              disabled={deleteConfirm !== "DELETE"}
            >
              Delete my account permanently
            </Button>
          </form>
        </div>
      {/if}
    </section>
    </div>

    <aside class="space-y-6 lg:sticky lg:top-24">
      <Card.Root>
        <Card.Header>
          <Card.Title class="text-lg">Visibility tips</Card.Title>
          <Card.Description>
            Hiding your listing is reversible; deleting your account is not.
          </Card.Description>
        </Card.Header>
        <Card.Content class="text-muted-foreground space-y-3 text-sm">
          <p>
            <strong class="text-foreground font-medium">Show in directory</strong>
            controls whether your expert profile can appear in public search and
            browse as those features go live.
          </p>
          <p>
            Turn it off anytime if you need a break—your login and profile data
            stay until you delete the account.
          </p>
          <p>
            <strong class="text-foreground font-medium">Account deletion</strong>
            requires hiding your listing first, so you cannot remove your profile
            from the directory by accident.
          </p>
        </Card.Content>
      </Card.Root>
    </aside>
  </div>
</div>
