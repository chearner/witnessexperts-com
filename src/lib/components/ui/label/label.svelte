<script lang="ts">
	import type { HTMLLabelAttributes } from "svelte/elements";
	import type { Snippet } from "svelte";
	import { cn, type WithElementRef } from "$lib/utils.js";

	type Props = WithElementRef<HTMLLabelAttributes> & {
		children?: Snippet;
	};

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: Props = $props();
</script>

<label
	bind:this={ref}
	data-slot="label"
	class={cn(
		"flex select-none items-center gap-2 text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-50 group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</label>
