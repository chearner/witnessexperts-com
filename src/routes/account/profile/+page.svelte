<script lang="ts">
  import { enhance } from "$app/forms";
  import { page } from "$app/state";
  import { submittingEnhance } from "$lib/submitting-enhance.js";
  import { Button } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";
  import { Textarea } from "$lib/components/ui/textarea";
  import {
    Alert,
    AlertDescription,
    AlertTitle,
  } from "$lib/components/ui/alert";
  import { toast } from "$lib/components/ui/sonner";
  import * as Card from "$lib/components/ui/card";
  import { getCategoryBySlug } from "$lib/data/categories";

  let { data, form } = $props();

  let submitting = $state(false);

  let displayName = $state("");
  let phoneVal = $state("");
  let bioVal = $state("");
  let categorySlug = $state("");
  let subcategoryVal = $state("");

  $effect(() => {
    const f = form;
    displayName =
      (f?.display_name as string | undefined) ??
      data.profile?.display_name ??
      "";
    phoneVal = (f?.phone as string | undefined) ?? data.profile?.phone ?? "";
    bioVal = (f?.bio as string | undefined) ?? data.profile?.bio ?? "";
    categorySlug =
      (f?.primary_category_slug as string | undefined) ??
      data.profile?.primary_category_slug ??
      "";
    subcategoryVal =
      (f?.subcategory as string | undefined) ?? data.profile?.subcategory ?? "";
  });

  const subcats = $derived(
    getCategoryBySlug(data.categories, categorySlug)?.subcategories ?? [],
  );

  function onCategoryChange() {
    const allowed =
      getCategoryBySlug(data.categories, categorySlug)?.subcategories ?? [];
    if (subcategoryVal && !allowed.includes(subcategoryVal)) {
      subcategoryVal = "";
    }
  }

  const saved = $derived(page.url.searchParams.get("saved") === "1");

  let prevSaved = $state(false);
  $effect(() => {
    if (saved && !prevSaved) {
      toast.success("Profile saved", {
        description: "Your expert listing was updated.",
      });
    }
    prevSaved = saved;
  });
</script>

<svelte:head>
  <title>Expert profile - WitnessExperts.com</title>
</svelte:head>

<div class="mx-auto w-full max-w-3xl px-4 py-8 md:px-6 md:py-10">
  <div class="mb-8">
    <h1 class="text-2xl font-semibold tracking-tight md:text-3xl">
      Expert profile
    </h1>
    <p class="text-muted-foreground mt-2 text-sm md:text-base">
      How you appear in the directory—name, practice focus, and summary.
      Account email and password are managed under
      <Button href="/account" variant="link" class="inline h-auto p-0 text-sm"
        >Account</Button
      >.
    </p>
  </div>

  <Card.Root class="max-w-2xl">
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
        <form
          method="POST"
          class="space-y-8"
          use:enhance={submittingEnhance((v) => (submitting = v))}
        >
          <div class="space-y-4">
            <h3 class="text-xl font-medium">Listing &amp; contact on the directory</h3>
            <div class="space-y-2">
              <Label for="display_name">Display name</Label>
              <Input
                id="display_name"
                type="text"
                name="display_name"
                bind:value={displayName}
                maxlength={120}
                placeholder="e.g. Dr. Jane Smith"
                autocomplete="name"
              />
              <p class="text-muted-foreground text-xs">
                How you want to appear on your listing.
              </p>
            </div>
            <div class="space-y-2">
              <Label for="phone"
                >Phone <span class="text-muted-foreground font-normal"
                  >(optional)</span
                ></Label
              >
              <Input
                id="phone"
                type="tel"
                name="phone"
                bind:value={phoneVal}
                maxlength={40}
                placeholder="e.g. +1 555 123 4567"
                autocomplete="tel"
              />
            </div>
          </div>

          <div class="space-y-4">
            <h3 class="text-xl font-medium">Practice focus</h3>
            <div class="space-y-2">
              <Label for="primary_category_slug">Primary category</Label>
              <select
                id="primary_category_slug"
                name="primary_category_slug"
                class="border-input bg-input/30 focus-visible:border-ring focus-visible:ring-ring/50 h-10 w-full rounded-xl border px-3 text-sm outline-none focus-visible:ring-[3px]"
                bind:value={categorySlug}
                onchange={onCategoryChange}
              >
                <option value="">— Select a category —</option>
                {#each data.categories as cat (cat.slug)}
                  <option value={cat.slug}>{cat.name}</option>
                {/each}
              </select>
            </div>
            <div class="space-y-2">
              <Label for="subcategory">Sub-area / specialty</Label>
              <select
                id="subcategory"
                name="subcategory"
                class="border-input bg-input/30 focus-visible:border-ring focus-visible:ring-ring/50 h-10 w-full rounded-xl border px-3 text-sm outline-none focus-visible:ring-[3px]"
                bind:value={subcategoryVal}
              >
                <option value="">— Optional —</option>
                {#if subcategoryVal && !subcats.includes(subcategoryVal)}
                  <option value={subcategoryVal}>{subcategoryVal}</option>
                {/if}
                {#each subcats as sub (sub)}
                  <option value={sub}>{sub}</option>
                {/each}
              </select>
              <p class="text-muted-foreground text-xs">
                Narrow your focus within the primary category (optional).
              </p>
            </div>
          </div>

          <div class="space-y-2">
            <Label for="bio">Professional summary</Label>
            <Textarea
              id="bio"
              name="bio"
              bind:value={bioVal}
              maxlength={2000}
              rows={5}
              placeholder="Brief background, credentials, or areas of testimony (optional)."
            />
            <p class="text-muted-foreground text-xs">Up to 2,000 characters.</p>
          </div>

          <Button type="submit" loading={submitting}>Save profile</Button>
        </form>
      {/if}
    </Card.Content>
  </Card.Root>
</div>
