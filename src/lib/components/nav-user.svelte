<script lang="ts">
  import { browser } from "$app/environment";
  import { enhance } from "$app/forms";
  import * as Avatar from "$lib/components/ui/avatar/index.js";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
  import { useSidebar } from "$lib/components/ui/sidebar/index.js";
  import { sidebarMenuButtonVariants } from "$lib/components/ui/sidebar/sidebar-menu-button.svelte";
  import { Button } from "$lib/components/ui/button";
  import { submittingEnhance } from "$lib/submitting-enhance.js";
  import { isDarkMode, toggleTheme } from "$lib/theme.js";
  import { cn, type ClassValue } from "$lib/utils.js";
  import LogOutIcon from "@lucide/svelte/icons/log-out";
  import MoonIcon from "@lucide/svelte/icons/moon";
  import MoreVerticalIcon from "@lucide/svelte/icons/more-vertical";
  import SunIcon from "@lucide/svelte/icons/sun";
  import { onMount } from "svelte";

  let {
    name,
    email,
    profileError,
  }: {
    name: string;
    email: string;
    profileError: string | null;
  } = $props();

  const sidebar = useSidebar();

  let dark = $state(false);
  let logoutFormEl: HTMLFormElement | undefined = $state();
  let signingOut = $state(false);
  onMount(() => {
    if (browser) dark = isDarkMode();
  });

  function initials() {
    const parts = name.trim().split(/\s+/).filter(Boolean);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase() || "?";
  }

  function submitLogout() {
    queueMicrotask(() => logoutFormEl?.requestSubmit());
  }
</script>

<Sidebar.Menu>
  <Sidebar.MenuItem>
    <DropdownMenu.Root
      onOpenChange={(open) => {
        if (open && browser) dark = isDarkMode();
      }}
    >
      <DropdownMenu.Trigger>
        {#snippet child({ props })}
          <button
            {...props}
            type="button"
            class={cn(
              sidebarMenuButtonVariants({ variant: "default", size: "lg" }),
              "data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground",
            )}
          >
            <Avatar.Root class="size-8 rounded-full">
              <Avatar.Fallback class="rounded-full text-xs font-medium"
                >{initials()}</Avatar.Fallback
              >
            </Avatar.Root>
            <div class="grid min-w-0 flex-1 text-start text-sm leading-tight">
              <span class="truncate font-medium">{name}</span>
              <span class="text-muted-foreground truncate text-xs">{email}</span
              >
            </div>
            <MoreVerticalIcon
              class="text-muted-foreground ms-auto size-4 shrink-0"
            />
          </button>
        {/snippet}
      </DropdownMenu.Trigger>
      <DropdownMenu.Content
        class="w-(--bits-dropdown-menu-anchor-width) min-w-56 rounded-lg"
        side={sidebar.isMobile ? "bottom" : "right"}
        align="end"
        sideOffset={4}
      >
        {#if profileError}
          <div class="text-destructive px-2 py-1.5 text-xs">{profileError}</div>
        {/if}
        <DropdownMenu.Group>
          <DropdownMenu.Item
            disabled={signingOut}
            onSelect={() => {
              dark = toggleTheme() === "dark";
            }}
          >
            {#snippet child({ props })}
              <Button
                variant="ghost"
                size="sm"
                {...props}
                class={cn(
                  "h-9 w-full justify-start rounded-4xl border-transparent px-3 font-medium shadow-none",
                  props.class as ClassValue,
                )}
              >
                {#if dark}
                  <SunIcon class="size-4 shrink-0 text-current" />
                  Light mode
                {:else}
                  <MoonIcon class="size-4 shrink-0 text-current" />
                  Dark mode
                {/if}
              </Button>
            {/snippet}
          </DropdownMenu.Item>
          <DropdownMenu.Item
            disabled={signingOut}
            onSelect={() => {
              submitLogout();
            }}
          >
            {#snippet child({ props })}
              <Button
                variant="destructive"
                size="sm"
                {...props}
                class={cn(
                  "h-9 w-full justify-start rounded-4xl px-3 font-medium shadow-none",
                  props.class as ClassValue,
                )}
              >
                <LogOutIcon class="size-4 shrink-0 text-current" />
                Log out
              </Button>
            {/snippet}
          </DropdownMenu.Item>
        </DropdownMenu.Group>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  </Sidebar.MenuItem>
</Sidebar.Menu>

<form
  bind:this={logoutFormEl}
  method="POST"
  action="/logout"
  class="hidden"
  aria-hidden="true"
  use:enhance={submittingEnhance((v) => (signingOut = v))}
>
  <button type="submit" tabindex="-1" class="hidden">Sign out</button>
</form>
