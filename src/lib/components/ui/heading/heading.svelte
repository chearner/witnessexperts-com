<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import { cn, type WithElementRef } from "$lib/utils.js";

  type Level = 1 | 2 | 3 | 4 | 5 | 6;

  type Props = WithElementRef<
    Omit<HTMLAttributes<HTMLHeadingElement>, "level"> & {
      /** Semantic heading level; maps to `<h1>` … `<h6>`. Base typography in `app.css` applies. */
      level?: Level;
    }
  >;

  let {
    ref = $bindable(null),
    level = 1 as Level,
    class: className,
    children,
    ...restProps
  }: Props = $props();

  const headings = ["h1", "h2", "h3", "h4", "h5", "h6"] as const;
  const tag = $derived(headings[Math.min(6, Math.max(1, level)) - 1]);
</script>

<svelte:element
  this={tag}
  bind:this={ref}
  data-slot="header"
  class={cn(className)}
  {...restProps}
>
  {@render children?.()}
</svelte:element>
