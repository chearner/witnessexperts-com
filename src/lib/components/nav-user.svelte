<script lang="ts">
  import { goto } from "$app/navigation";
  import * as Avatar from "$lib/components/ui/avatar/index.js";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
  import { useSidebar } from "$lib/components/ui/sidebar/index.js";
  import { sidebarMenuButtonVariants } from "$lib/components/ui/sidebar/sidebar-menu-button.svelte";
  import { cn } from "$lib/utils.js";
  import LogOutIcon from "@lucide/svelte/icons/log-out";
  import MoreVerticalIcon from "@lucide/svelte/icons/more-vertical";
  import UserRoundIcon from "@lucide/svelte/icons/user-round";

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

  function initials() {
    const parts = name.trim().split(/\s+/).filter(Boolean);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase() || "?";
  }

  function logout() {
    const form = document.createElement("form");
    form.method = "POST";
    form.action = "/logout";
    document.body.appendChild(form);
    form.submit();
  }
</script>

<Sidebar.Menu>
  <Sidebar.MenuItem>
    <DropdownMenu.Root>
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
              <Avatar.Fallback class="rounded-full text-xs font-medium">{initials()}</Avatar.Fallback>
            </Avatar.Root>
            <div class="grid min-w-0 flex-1 text-start text-sm leading-tight">
              <span class="truncate font-medium">{name}</span>
              <span class="text-muted-foreground truncate text-xs">{email}</span>
            </div>
            <MoreVerticalIcon class="text-muted-foreground ms-auto size-4 shrink-0" />
          </button>
        {/snippet}
      </DropdownMenu.Trigger>
      <DropdownMenu.Content
        class="w-(--bits-dropdown-menu-anchor-width) min-w-56 rounded-lg"
        side={sidebar.isMobile ? "bottom" : "right"}
        align="end"
        sideOffset={4}
      >
        <DropdownMenu.Label class="p-0 font-normal">
          <div class="flex items-center gap-2 px-1 py-1.5 text-start text-sm">
            <Avatar.Root class="size-8 rounded-full">
              <Avatar.Fallback class="rounded-full text-xs font-medium">{initials()}</Avatar.Fallback>
            </Avatar.Root>
            <div class="grid min-w-0 flex-1 text-start text-sm leading-tight">
              <span class="truncate font-semibold">{name}</span>
              <span class="text-muted-foreground truncate text-xs">{email}</span>
            </div>
          </div>
        </DropdownMenu.Label>
        {#if profileError}
          <div class="text-destructive px-2 py-1.5 text-xs">{profileError}</div>
        {/if}
        <DropdownMenu.Separator />
        <DropdownMenu.Group>
          <DropdownMenu.Item
            onSelect={() => {
              goto("/account");
            }}
          >
            <UserRoundIcon />
            Profile
          </DropdownMenu.Item>
        </DropdownMenu.Group>
        <DropdownMenu.Separator />
        <DropdownMenu.Item
          variant="destructive"
          onSelect={() => {
            logout();
          }}
        >
          <LogOutIcon />
          Log out
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  </Sidebar.MenuItem>
</Sidebar.Menu>
