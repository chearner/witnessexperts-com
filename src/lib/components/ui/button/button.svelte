<script lang="ts" module>
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from "svelte/elements";
	import { type VariantProps, tv } from "tailwind-variants";

	export const buttonVariants = tv({
		base: "focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 rounded-4xl border border-transparent bg-clip-padding text-sm font-medium focus-visible:ring-[3px] active:translate-y-px aria-invalid:ring-[3px] [&_svg:not([class*='size-'])]:size-4 group/button inline-flex shrink-0 items-center justify-center whitespace-nowrap transition-all outline-none select-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
		variants: {
			variant: {
				default: "bg-primary text-primary-foreground hover:bg-primary/80",
				outline: "border-border bg-input/30 hover:bg-input/50 hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground",
				secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
				ghost: "hover:bg-muted hover:text-foreground dark:hover:bg-muted/50 aria-expanded:bg-muted aria-expanded:text-foreground",
				destructive: "bg-destructive/10 hover:bg-destructive/20 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/20 text-destructive focus-visible:border-destructive/40 dark:hover:bg-destructive/30",
				link: "text-primary underline-offset-4 hover:underline",
			},
			size: {
				default: "h-9 gap-1.5 px-3 has-data-[icon=inline-end]:pr-2.5 has-data-[icon=inline-start]:pl-2.5",
				xs: "h-6 gap-1 px-2.5 text-xs has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 [&_svg:not([class*='size-'])]:size-3",
				sm: "h-8 gap-1 px-3 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
				lg: "h-10 gap-1.5 px-4 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",
				icon: "size-9",
				"icon-xs": "size-6 [&_svg:not([class*='size-'])]:size-3",
				"icon-sm": "size-8",
				"icon-lg": "size-10",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	});

	export type ButtonVariant = VariantProps<typeof buttonVariants>["variant"];
	export type ButtonSize = VariantProps<typeof buttonVariants>["size"];

	export type ButtonProps = WithElementRef<HTMLButtonAttributes> &
		WithElementRef<HTMLAnchorAttributes> & {
			variant?: ButtonVariant;
			size?: ButtonSize;
			/** Shows spinner, disables control, sets aria-busy (buttons only). */
			loading?: boolean;
		};
</script>

<script lang="ts">
	let {
		class: className,
		variant = "default",
		size = "default",
		ref = $bindable(null),
		href = undefined,
		type = "button",
		disabled,
		loading = false,
		children,
		...restProps
	}: ButtonProps = $props();

	const isDisabled = $derived(!!(disabled || (!href && loading)));
</script>

{#if href}
	<a
		bind:this={ref}
		data-slot="button"
		data-loading={loading || undefined}
		class={cn(buttonVariants({ variant, size }), loading && "pointer-events-none opacity-70", className)}
		href={disabled || loading ? undefined : href}
		aria-disabled={disabled || loading}
		aria-busy={loading || undefined}
		role={disabled || loading ? "link" : undefined}
		tabindex={disabled || loading ? -1 : undefined}
		{...restProps}
	>
		{#if loading}
			<span
				class="inline-block size-4 shrink-0 animate-spin rounded-full border-2 border-current border-t-transparent opacity-90"
				aria-hidden="true"
			></span>
		{/if}
		{@render children?.()}
	</a>
{:else}
	<button
		bind:this={ref}
		data-slot="button"
		data-loading={loading || undefined}
		class={cn(buttonVariants({ variant, size }), className)}
		{type}
		disabled={isDisabled}
		aria-busy={loading || undefined}
		{...restProps}
	>
		{#if loading}
			<span
				class="inline-block size-4 shrink-0 animate-spin rounded-full border-2 border-current border-t-transparent opacity-90"
				aria-hidden="true"
			></span>
		{/if}
		{@render children?.()}
	</button>
{/if}
