<script lang="ts">
  import { page } from "$app/state";
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
  import CircleUserIcon from "@lucide/svelte/icons/circle-user";
  import HomeIcon from "@lucide/svelte/icons/home";
  import SettingsIcon from "@lucide/svelte/icons/settings";
  import UserRoundIcon from "@lucide/svelte/icons/user-round";
</script>

<Sidebar.Group>
  <Sidebar.GroupLabel>Member</Sidebar.GroupLabel>
  <Sidebar.Menu>
    <Sidebar.MenuItem>
      <Sidebar.MenuButton
        tooltipContent="Home"
        isActive={page.url.pathname === "/"}
        class="w-full"
      >
        {#snippet child({ props })}
          <a href="/" {...props}>
            <HomeIcon />
            <span>Home</span>
          </a>
        {/snippet}
      </Sidebar.MenuButton>
    </Sidebar.MenuItem>
    <Sidebar.MenuItem>
      <Sidebar.MenuButton
        tooltipContent="Account"
        isActive={page.url.pathname === "/account"}
        class="w-full"
      >
        {#snippet child({ props })}
          <a href="/account" {...props}>
            <CircleUserIcon />
            <span>Account</span>
          </a>
        {/snippet}
      </Sidebar.MenuButton>
    </Sidebar.MenuItem>
    <Sidebar.MenuItem>
      <Sidebar.MenuButton
        tooltipContent="Profile"
        isActive={page.url.pathname === "/account/profile"}
        class="w-full"
      >
        {#snippet child({ props })}
          <a href="/account/profile" {...props}>
            <UserRoundIcon />
            <span>Profile</span>
          </a>
        {/snippet}
      </Sidebar.MenuButton>
    </Sidebar.MenuItem>
    <Sidebar.MenuItem>
      <Sidebar.MenuButton
        tooltipContent="Settings"
        isActive={page.url.pathname === "/account/settings"}
        class="w-full"
      >
        {#snippet child({ props })}
          <a href="/account/settings" {...props}>
            <SettingsIcon />
            <span>Settings</span>
          </a>
        {/snippet}
      </Sidebar.MenuButton>
    </Sidebar.MenuItem>
  </Sidebar.Menu>
</Sidebar.Group>
