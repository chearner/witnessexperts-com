<script lang="ts">
  import "../app.css";
  import favicon from "$lib/assets/favicon.svg";
  import AppSidebar from "$lib/components/app-sidebar.svelte";
  import AppHeader from "$lib/components/app-header.svelte";
  import AppFooter from "$lib/components/app-footer.svelte";
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
  import { Toaster } from "$lib/components/ui/sonner/index.js";

  let { children, data } = $props();

  const loggedIn = $derived(!!data.session?.user);
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<Toaster richColors position="bottom-right" />

{#if loggedIn}
  <Sidebar.Provider>
    <AppSidebar
      email={data.email}
      profile={data.profile}
      profileError={data.profileError}
    />
    <Sidebar.Inset>
      <div class="bg-background flex min-h-svh flex-col">
        <AppHeader session={data.session} hideMemberAuth showSidebarTrigger />
        <main class="bg-background min-h-[calc(100vh-4rem-200px)] flex-1">
          {@render children()}
        </main>
        <AppFooter />
      </div>
    </Sidebar.Inset>
  </Sidebar.Provider>
{:else}
  <AppHeader session={data.session} />
  <main class="bg-background min-h-[calc(100vh-4rem-200px)] flex-1">
    {@render children()}
  </main>
  <AppFooter />
{/if}
