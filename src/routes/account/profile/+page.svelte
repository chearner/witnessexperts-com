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
  let submittingFeatured = $state(false);
  let submittingHeadshot = $state(false);
  let submittingRemoveHeadshot = $state(false);
  let headshotPreviewFailed = $state(false);

  let featuredSelection = $state<string[]>([]);
  $effect(() => {
    featuredSelection = [...data.featuredPlacementPaths];
  });

  $effect(() => {
    void data.profile?.headshot_url;
    headshotPreviewFailed = false;
  });

  let displayName = $state("");
  let phoneVal = $state("");
  let bioVal = $state("");
  let categorySlug = $state("");
  let subcategoryVal = $state("");
  let stateVal = $state("");

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
    stateVal =
      (f?.us_state_code as string | undefined)?.trim() ??
      data.profile?.us_state_code?.trim() ??
      "";
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
  const featuredSaved = $derived(
    page.url.searchParams.get("featured_saved") === "1",
  );

  let prevSaved = $state(false);
  $effect(() => {
    if (saved && !prevSaved) {
      toast.success("Profile saved", {
        description: "Your expert listing was updated.",
      });
    }
    prevSaved = saved;
  });

  let prevFeaturedSaved = $state(false);
  $effect(() => {
    if (featuredSaved && !prevFeaturedSaved) {
      toast.success("Featured placements saved", {
        description: "We updated where your profile may appear in spotlights.",
      });
    }
    prevFeaturedSaved = featuredSaved;
  });

  const headshotSaved = $derived(
    page.url.searchParams.get("headshot_saved") === "1",
  );
  const headshotRemoved = $derived(
    page.url.searchParams.get("headshot_removed") === "1",
  );

  let prevHeadshotSaved = $state(false);
  $effect(() => {
    if (headshotSaved && !prevHeadshotSaved) {
      toast.success("Profile photo updated", {
        description:
          "Your headshot appears on your public listing and in featured spots.",
      });
    }
    prevHeadshotSaved = headshotSaved;
  });

  let prevHeadshotRemoved = $state(false);
  $effect(() => {
    if (headshotRemoved && !prevHeadshotRemoved) {
      toast.success("Profile photo removed", {
        description: "Your listing now shows initials instead of a photo.",
      });
    }
    prevHeadshotRemoved = headshotRemoved;
  });

  function profileInitials(name: string) {
    const t = name?.trim();
    if (!t) return "?";
    const parts = t.split(/\s+/).filter(Boolean);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase() || "?";
    }
    return t.slice(0, 2).toUpperCase();
  }
</script>

<svelte:head>
  <title>Expert profile - WitnessExperts.com</title>
</svelte:head>

<div class="mx-auto w-full max-w-6xl px-8 py-10">
  <div class="mb-8">
    <h1 class="text-2xl font-semibold tracking-tight md:text-3xl">
      Expert profile
    </h1>
    <p class="text-muted-foreground mt-2 text-sm md:text-base">
      How you appear in the directory—name, practice focus, and summary. Account
      email and password are managed under
      <Button href="/account" variant="link" class="inline h-auto p-0 text-sm"
        >Account</Button
      >.
    </p>
  </div>

  {#if data.profileError}
    <Card.Root class="max-w-2xl">
      <Card.Content class="space-y-6">
        <Alert variant="destructive">
          <AlertTitle>Profile unavailable</AlertTitle>
          <AlertDescription>{data.profileError}</AlertDescription>
        </Alert>
      </Card.Content>
    </Card.Root>
  {:else if data.profile}
    <div
      class="grid grid-cols-1 gap-10 lg:grid-cols-3 lg:items-start lg:gap-12"
    >
      <div class="min-w-0 lg:col-span-2">
        <Card.Root>
          <Card.Content class="space-y-6">
            {#if form?.message}
              <Alert variant="destructive">
                <AlertTitle>Could not save</AlertTitle>
                <AlertDescription>{form.message}</AlertDescription>
              </Alert>
            {/if}
            {#if form?.headshotMessage}
              <Alert variant="destructive">
                <AlertTitle>Could not update photo</AlertTitle>
                <AlertDescription>{form.headshotMessage}</AlertDescription>
              </Alert>
            {/if}

            <div class="border-border space-y-4 border-b pb-8">
              <h3 class="text-xl font-medium">Profile photo</h3>
              <p class="text-muted-foreground text-sm">
                A professional headshot appears on your public profile, category
                listings, and featured expert spots. JPEG, PNG, or WebP, up to 5
                MB.
              </p>
              <div class="flex flex-col gap-6 sm:flex-row sm:items-start">
                <div
                  class="bg-muted text-muted-foreground relative flex size-24 shrink-0 items-center justify-center overflow-hidden rounded-full text-lg font-semibold"
                  aria-hidden="true"
                >
                  {#if data.profile?.headshot_url && !headshotPreviewFailed}
                    <img
                      src={data.profile.headshot_url}
                      alt=""
                      class="size-full object-cover"
                      loading="lazy"
                      decoding="async"
                      onerror={() => (headshotPreviewFailed = true)}
                    />
                  {:else}
                    {profileInitials(displayName)}
                  {/if}
                </div>
                <div class="flex min-w-0 flex-1 flex-col gap-4">
                  <form
                    method="POST"
                    enctype="multipart/form-data"
                    action="?/uploadHeadshot"
                    class="flex flex-col gap-3 sm:max-w-md"
                    use:enhance={submittingEnhance((v) => (submittingHeadshot = v))}
                  >
                    <div class="space-y-2">
                      <Label for="headshot">Upload headshot</Label>
                      <Input
                        id="headshot"
                        type="file"
                        name="headshot"
                        accept="image/jpeg,image/png,image/webp"
                        class="cursor-pointer"
                      />
                    </div>
                    <Button type="submit" loading={submittingHeadshot}
                      >Upload photo</Button
                    >
                  </form>
                  {#if data.profile?.headshot_url}
                    <form
                      method="POST"
                      action="?/removeHeadshot"
                      class="sm:max-w-md"
                      use:enhance={submittingEnhance((v) =>
                        (submittingRemoveHeadshot = v),
                      )}
                    >
                      <Button
                        type="submit"
                        variant="outline"
                        loading={submittingRemoveHeadshot}
                        class="text-destructive hover:text-destructive"
                        >Remove photo</Button
                      >
                    </form>
                  {/if}
                </div>
              </div>
            </div>

            <form
              method="POST"
              action="?/saveProfile"
              class="space-y-8"
              use:enhance={submittingEnhance((v) => (submitting = v))}
            >
              <div class="space-y-4">
                <h3 class="text-xl font-medium">
                  Listing &amp; contact on the directory
                </h3>
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
                <div class="space-y-2">
                  <Label for="us_state_code"
                    >State <span class="text-muted-foreground font-normal"
                      >(optional)</span
                    ></Label
                  >
                  <select
                    id="us_state_code"
                    name="us_state_code"
                    class="border-input bg-input/30 focus-visible:border-ring focus-visible:ring-ring/50 h-10 w-full rounded-xl border px-3 text-sm outline-none focus-visible:ring-[3px]"
                    bind:value={stateVal}
                    autocomplete="address-level1"
                  >
                    <option value="">— Select a state —</option>
                    {#if stateVal && !data.usStates.some((s) => s.code === stateVal)}
                      <option value={stateVal}>{stateVal}</option>
                    {/if}
                    {#each data.usStates as s (s.code)}
                      <option value={s.code}>{s.name}</option>
                    {/each}
                  </select>
                  <p class="text-muted-foreground text-xs">
                    Shown on your directory listing for local search.
                  </p>
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
                  rows={6}
                  placeholder="Brief background, credentials, or areas of testimony (optional)."
                />
                <p class="text-muted-foreground text-xs">
                  Up to 2,000 characters.
                </p>
              </div>

              <Button type="submit" loading={submitting}>Save profile</Button>
            </form>
          </Card.Content>
        </Card.Root>
      </div>

      <aside class="space-y-6 lg:sticky lg:top-24">
        <Card.Root>
          <Card.Header>
            <Card.Title class="text-lg">Listing tips</Card.Title>
            <Card.Description>
              A complete profile helps attorneys find and evaluate you.
            </Card.Description>
          </Card.Header>
          <Card.Content class="text-muted-foreground space-y-3 text-sm">
            <p>
              Use your <strong class="text-foreground font-medium"
                >display name</strong
              >
              as you want it to appear in search—often credentials plus last name.
            </p>
            <p>
              <strong class="text-foreground font-medium"
                >Category and sub-area</strong
              >
              control how you show up in browse and filtered search; pick the closest
              fit.
            </p>
            <p>
              Your <strong class="text-foreground font-medium">summary</strong> can
              highlight testimony experience, jurisdictions, and what makes your
              practice distinctive.
            </p>
          </Card.Content>
        </Card.Root>

        <Card.Root>
          <Card.Header>
            <Card.Title class="text-lg">Featured placements</Card.Title>
            <Card.Description>
              Choose where your profile may appear in directory spotlights (for
              example the home page or a category). You can select up to 12 paths.
              Availability is subject to site policy.
            </Card.Description>
          </Card.Header>
          <Card.Content class="space-y-4">
            {#if form?.featuredMessage}
              <Alert variant="destructive">
                <AlertTitle>Could not save placements</AlertTitle>
                <AlertDescription>{form.featuredMessage}</AlertDescription>
              </Alert>
            {/if}
            <form
              method="POST"
              action="?/saveFeaturedPlacements"
              class="space-y-4"
              use:enhance={submittingEnhance((v) => (submittingFeatured = v))}
            >
              <fieldset class="space-y-3">
                <legend class="sr-only">Site paths for featured placement</legend>
                {#each data.advertisablePlacementOptions as opt (opt.path)}
                  <label
                    class="hover:bg-muted/50 flex cursor-pointer gap-3 rounded-lg border border-transparent px-1 py-2 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring"
                  >
                    <input
                      type="checkbox"
                      name="page_path"
                      bind:group={featuredSelection}
                      value={opt.path}
                      class="border-input text-primary mt-0.5 size-4 shrink-0 rounded"
                    />
                    <span class="text-foreground text-sm leading-snug">
                      {opt.label}
                      <span class="text-muted-foreground block text-xs font-mono">
                        {opt.path}
                      </span>
                    </span>
                  </label>
                {/each}
              </fieldset>
              <Button type="submit" loading={submittingFeatured}
                >Save featured placements</Button
              >
            </form>
          </Card.Content>
        </Card.Root>
      </aside>
    </div>
  {/if}
</div>
