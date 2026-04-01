<script lang="ts">
  import NavMemberLinks from "./nav-member-links.svelte";
  import NavUser from "./nav-user.svelte";
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
  import type { ComponentProps } from "svelte";

  type Profile = {
    display_name: string | null;
  } | null;

  let {
    ref = $bindable(null),
    collapsible = "icon",
    email,
    profile,
    profileError,
    ...restProps
  }: ComponentProps<typeof Sidebar.Root> & {
    email: string | null;
    profile: Profile;
    profileError: string | null;
  } = $props();

  const displayName = $derived(
    profile?.display_name?.trim() ||
      (email ? email.split("@")[0] : null) ||
      "Member",
  );
</script>

<Sidebar.Root bind:ref {collapsible} {...restProps}>
  <Sidebar.Header>
    <Sidebar.Menu>
      <Sidebar.MenuItem>
        <Sidebar.MenuButton size="lg" class="hover:bg-sidebar-accent/80">
          {#snippet child({ props })}
            <a href="/" {...props}>
              <div class="grid flex-1 text-start text-sm leading-tight">
                <span class="truncate font-semibold">WitnessExperts.com</span>
                <span class="text-muted-foreground truncate text-xs"
                  >Member area</span
                >
              </div>
            </a>
          {/snippet}
        </Sidebar.MenuButton>
      </Sidebar.MenuItem>
    </Sidebar.Menu>
  </Sidebar.Header>
  <Sidebar.Content>
    <NavMemberLinks />
  </Sidebar.Content>
  <Sidebar.Footer
    class="border-sidebar-border bg-sidebar-accent/35 border-t p-2"
  >
    <NavUser name={displayName} email={email ?? ""} {profileError} />
  </Sidebar.Footer>
  <Sidebar.Rail />
</Sidebar.Root>
