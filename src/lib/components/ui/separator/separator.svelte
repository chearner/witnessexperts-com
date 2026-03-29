<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import { cn, type WithElementRef } from "$lib/utils.js";

	type Props = WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		orientation?: "horizontal" | "vertical";
		"data-slot"?: string;
	};

	let {
		ref = $bindable(null),
		class: className,
		orientation = "horizontal",
		"data-slot": dataSlot = "separator",
		...restProps
	}: Props = $props();
</script>

<div
	bind:this={ref}
	role="separator"
	aria-orientation={orientation === "vertical" ? "vertical" : "horizontal"}
	data-orientation={orientation}
	data-slot={dataSlot}
	class={cn(
		"shrink-0 bg-border",
		orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
		className
	)}
	{...restProps}
></div>
