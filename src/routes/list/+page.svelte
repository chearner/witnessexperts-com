<script lang="ts">
  import { HugeiconsIcon } from "@hugeicons/svelte";
  import {
    ListViewIcon,
    MailReceive01Icon,
    Search01Icon,
    UserAdd01Icon,
    UserEdit01Icon,
  } from "@hugeicons/core-free-icons";
  import type { PageData } from "./$types";
  import { Button } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";
  import { Textarea } from "$lib/components/ui/textarea";
  import * as Card from "$lib/components/ui/card";
  import { cn } from "$lib/utils.js";

  let { data }: { data: PageData } = $props();

  let formData = $state({
    name: "",
    email: "",
    phone: "",
    category: "",
    specialties: "",
    bio: "",
  });

  const selectClass = cn(
    "bg-input/30 border-input focus-visible:border-ring focus-visible:ring-ring/50 h-9 w-full min-w-0 rounded-4xl border px-3 py-1 text-base transition-colors focus-visible:ring-[3px] outline-none md:text-sm",
  );

  function handleSubmit(e: Event) {
    e.preventDefault();
  }
</script>

<svelte:head>
  <title>Get Listed - Expert Witness Directory - WitnessExperts.com</title>
  <meta
    name="description"
    content="Join the WitnessExperts directory. Create a searchable profile and connect with attorneys seeking your expertise."
  />
</svelte:head>

<section class="bg-primary px-0 py-12 text-primary-foreground">
  <div
    class="mx-auto flex max-w-6xl flex-col gap-6 sm:flex-row sm:items-center sm:gap-8"
  >
    <div class="flex justify-center sm:justify-start" aria-hidden="true">
      <HugeiconsIcon
        icon={UserAdd01Icon}
        strokeWidth={1.5}
        class="size-16 shrink-0 text-primary-foreground/90"
      />
    </div>
    <div class="space-y-4 text-center sm:text-left">
      <h1>Get listed today</h1>
      <p class="mx-auto max-w-2xl text-primary-foreground/90 sm:mx-0">
        Join America's trusted expert witness directory. Create a searchable
        profile and connect with attorneys seeking your expertise.
      </p>
    </div>
  </div>
</section>

<div class="mx-auto max-w-6xl px-0 py-12">
  <section class="mb-16 space-y-8">
    <h2 class="text-center">Why list with WitnessExperts?</h2>
    <div class="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-6">
      <Card.Root>
        <Card.Header class="text-center">
          <div class="mb-3 flex justify-center text-primary" aria-hidden="true">
            <HugeiconsIcon
              icon={Search01Icon}
              strokeWidth={1.5}
              class="size-12"
            />
          </div>
          <Card.Title class="text-xl">Get discovered</Card.Title>
          <Card.Description>
            Appear in category and keyword searches when attorneys look for
            experts in your field.
          </Card.Description>
        </Card.Header>
      </Card.Root>
      <Card.Root>
        <Card.Header class="text-center">
          <div class="mb-3 flex justify-center text-primary" aria-hidden="true">
            <HugeiconsIcon
              icon={MailReceive01Icon}
              strokeWidth={1.5}
              class="size-12"
            />
          </div>
          <Card.Title class="text-xl">Receive inquiries</Card.Title>
          <Card.Description>
            Attorneys can contact you directly through our platform for case
            consultations.
          </Card.Description>
        </Card.Header>
      </Card.Root>
      <Card.Root>
        <Card.Header class="text-center">
          <div class="mb-3 flex justify-center text-primary" aria-hidden="true">
            <HugeiconsIcon
              icon={UserEdit01Icon}
              strokeWidth={1.5}
              class="size-12"
            />
          </div>
          <Card.Title class="text-xl">Manage your profile</Card.Title>
          <Card.Description>
            Update your credentials, areas of expertise, and availability
            anytime.
          </Card.Description>
        </Card.Header>
      </Card.Root>
    </div>
  </section>

  <section class="mx-auto max-w-xl">
    <Card.Root>
      <Card.Header>
        <div class="flex items-start gap-3">
          <HugeiconsIcon
            icon={ListViewIcon}
            strokeWidth={2}
            class="text-primary mt-0.5 size-7 shrink-0"
          />
          <div class="space-y-1.5">
            <Card.Title>Create your listing</Card.Title>
            <Card.Description>
              Tell us about your practice so we can set up your expert profile.
            </Card.Description>
          </div>
        </div>
      </Card.Header>
      <Card.Content>
        <form class="space-y-6" onsubmit={handleSubmit}>
          <div class="space-y-2">
            <Label for="name">Full name *</Label>
            <Input
              id="name"
              name="name"
              type="text"
              bind:value={formData.name}
              required
              placeholder="Dr. Jane Smith"
              autocomplete="name"
            />
          </div>

          <div class="grid gap-6 sm:grid-cols-2">
            <div class="space-y-2">
              <Label for="email">Email *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                bind:value={formData.email}
                required
                placeholder="jane@example.com"
                autocomplete="email"
              />
            </div>
            <div class="space-y-2">
              <Label for="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                bind:value={formData.phone}
                placeholder="(555) 123-4567"
                autocomplete="tel"
              />
            </div>
          </div>

          <div class="space-y-2">
            <Label for="category">Primary category *</Label>
            <select
              id="category"
              name="category"
              bind:value={formData.category}
              required
              class={selectClass}
            >
              <option value="">Select your primary expertise</option>
              {#each data.categories as cat}
                <option value={cat.slug}>{cat.name}</option>
              {/each}
            </select>
          </div>

          <div class="space-y-2">
            <Label for="specialties">Specialties / subcategories</Label>
            <Input
              id="specialties"
              name="specialties"
              type="text"
              bind:value={formData.specialties}
              placeholder="e.g., Medical malpractice, orthopedic surgery"
            />
          </div>

          <div class="space-y-2">
            <Label for="bio">Professional summary *</Label>
            <Textarea
              id="bio"
              name="bio"
              bind:value={formData.bio}
              rows={6}
              required
              placeholder="Brief overview of your credentials, experience, and areas of expertise..."
            />
          </div>

          <Button type="submit" class="w-full">
            <HugeiconsIcon
              icon={UserAdd01Icon}
              data-icon="inline-start"
              strokeWidth={2}
              class="size-4"
            />
            Create listing
          </Button>
        </form>
      </Card.Content>
    </Card.Root>
  </section>
</div>
