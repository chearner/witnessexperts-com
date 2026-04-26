<script lang="ts">
  import { navigating } from "$app/state";
  import { HugeiconsIcon } from "@hugeicons/svelte";
  import { Loading03Icon } from "@hugeicons/core-free-icons";
  import { fade } from "svelte/transition";

  /** Only show after this delay so very fast navigations do not flash the overlay */
  const SHOW_DELAY_MS = 120;

  let show = $state(false);
  let delayTimer: ReturnType<typeof setTimeout> | undefined;

  $effect(() => {
    const busy = navigating.to != null;

    if (!busy) {
      if (delayTimer !== undefined) {
        clearTimeout(delayTimer);
        delayTimer = undefined;
      }
      show = false;
      return;
    }

    if (delayTimer !== undefined) clearTimeout(delayTimer);
    delayTimer = setTimeout(() => {
      show = true;
      delayTimer = undefined;
    }, SHOW_DELAY_MS);

    return () => {
      if (delayTimer !== undefined) {
        clearTimeout(delayTimer);
        delayTimer = undefined;
      }
    };
  });
</script>

{#if show}
  <div
    class="fixed inset-0 z-[200] flex items-center justify-center bg-background/55 backdrop-blur-[2px]"
    transition:fade={{ duration: 160 }}
    role="status"
    aria-live="polite"
    aria-busy="true"
    aria-label="Loading next page"
  >
    <div
      class="border-border bg-card text-card-foreground flex items-center gap-3 rounded-2xl border px-5 py-4 shadow-lg"
    >
      <HugeiconsIcon
        icon={Loading03Icon}
        strokeWidth={2}
        class="text-primary size-8 shrink-0 animate-spin"
        aria-hidden="true"
      />
      <span class="text-muted-foreground text-sm font-medium">Loading…</span>
    </div>
  </div>
{/if}
