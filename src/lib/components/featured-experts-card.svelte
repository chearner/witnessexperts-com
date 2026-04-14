<script lang="ts">
  import type { Snippet } from "svelte";
  import type { FeaturedExpertDisplay } from "$lib/server/featured-placements";
  import * as Card from "$lib/components/ui/card";

  type Props = {
    experts: FeaturedExpertDisplay[];
    error?: string | null;
    title?: string;
    /** Plain-text empty state when there are no experts and `empty` is not set. */
    emptyMessage?: string;
    /** Custom empty state (e.g. rich text with links). Overrides `emptyMessage`. */
    empty?: Snippet;
    /** Extra classes on the outer Card.Root (e.g. hero styling). */
    cardClass?: string;
  };

  let {
    experts,
    error = null,
    title = "Featured experts",
    emptyMessage = "Featured listings will appear here once experts choose placements on their profile.",
    empty,
    cardClass = "",
  }: Props = $props();

  function expertInitials(name: string) {
    const t = name?.trim();
    if (!t) return "?";
    const parts = t.split(/\s+/).filter(Boolean);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase() || "?";
    }
    return t.slice(0, 2).toUpperCase();
  }
</script>

<Card.Root class={cardClass}>
  <Card.Header class="pb-2">
    <Card.Title class="text-lg">{title}</Card.Title>
  </Card.Header>
  <Card.Content class="space-y-3 pt-0">
    {#if error}
      <p class="text-destructive text-sm" role="alert">{error}</p>
    {/if}
    {#if experts.length === 0}
      {#if empty}
        {@render empty()}
      {:else}
        <p class="text-muted-foreground text-sm">{emptyMessage}</p>
      {/if}
    {:else}
      <ul class="divide-y divide-border" role="list">
        {#each experts as expert (expert.id)}
          <li>
            <a
              href={expert.href}
              class="flex gap-3 rounded-lg py-3 transition-colors hover:bg-muted/60"
            >
              <div
                class="flex size-11 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground text-xs font-semibold"
                aria-hidden="true"
              >
                {expertInitials(expert.name)}
              </div>
              <div class="min-w-0 flex-1">
                <p class="font-medium text-foreground leading-tight">
                  {expert.name}
                </p>
                <p class="text-muted-foreground text-sm">{expert.title}</p>
                <p class="text-muted-foreground text-xs">{expert.location}</p>
              </div>
            </a>
          </li>
        {/each}
      </ul>
    {/if}
  </Card.Content>
</Card.Root>
