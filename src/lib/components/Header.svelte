<script lang="ts">
  import { page } from "$app/state";
  import { cn } from "$lib/utils.js";
  import { Button } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";
  import { Separator } from "$lib/components/ui/separator";

  let searchQuery = $state("");
  let mobileMenuOpen = $state(false);

  function handleSearch(e: Event) {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  }
</script>

<header class="sticky top-0 z-50 border-b bg-background shadow-sm">
  <div
    class="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3 lg:gap-8 lg:px-6"
  >
    <a href="/" class="text-xl font-display shrink-0 font-semibold">
      <span>WitnessExperts</span><span class="text-lg">.com</span>
    </a>

    <nav
      class="hidden flex-1 flex-wrap items-center gap-1 lg:flex"
      aria-label="Main navigation"
    >
      <Button
        href="/"
        variant="ghost"
        size="sm"
        aria-current={page.url.pathname === "/" ? "page" : undefined}
        class={cn(page.url.pathname === "/" && "bg-accent")}
      >
        Home
      </Button>
      <Button
        href="/categories"
        variant="ghost"
        size="sm"
        aria-current={page.url.pathname.startsWith("/categories")
          ? "page"
          : undefined}
        class={cn(page.url.pathname.startsWith("/categories") && "bg-accent")}
      >
        Find an Expert
      </Button>
      <Button
        href="/request"
        variant="ghost"
        size="sm"
        aria-current={page.url.pathname === "/request" ? "page" : undefined}
        class={cn(page.url.pathname === "/request" && "bg-accent")}
      >
        Request an Expert
      </Button>
    </nav>

    <form
      class="hidden w-full max-w-[220px] flex items-stretch overflow-hidden rounded-lg border border-border bg-muted/40 lg:flex"
      role="search"
      onsubmit={handleSearch}
    >
      <Label for="header-search" class="sr-only">Search experts</Label>
      <Input
        id="header-search"
        type="search"
        placeholder="Search experts..."
        bind:value={searchQuery}
        class="min-w-0 flex-1 rounded-none border-0 bg-transparent shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
        aria-label="Search experts"
      />
      <Button
        type="submit"
        size="icon"
        variant="ghost"
        aria-label="Submit search"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
      </Button>
    </form>

    <div class="hidden items-center gap-2 lg:flex">
      <Button href="/login" variant="outline" size="sm">Member Login</Button>
      <Button href="/list" size="sm">Get Listed Today</Button>
    </div>

    <Button
      type="button"
      variant="ghost"
      class="flex h-10 w-10 flex-col gap-1.5 p-2 lg:hidden"
      aria-expanded={mobileMenuOpen}
      aria-controls="mobile-menu"
      onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
    >
      <span class="sr-only">{mobileMenuOpen ? "Close menu" : "Open menu"}</span>
      <span
        class="block h-0.5 w-[22px] bg-foreground transition-all {mobileMenuOpen
          ? 'translate-y-[7px] rotate-45'
          : ''}"
      ></span>
      <span
        class="block h-0.5 w-[22px] bg-foreground transition-all {mobileMenuOpen
          ? 'opacity-0'
          : ''}"
      ></span>
      <span
        class="block h-0.5 w-[22px] bg-foreground transition-all {mobileMenuOpen
          ? '-translate-y-[7px] -rotate-45'
          : ''}"
      ></span>
    </Button>
  </div>

  {#if mobileMenuOpen}
    <Separator class="lg:hidden" />
    <div
      id="mobile-menu"
      class="flex flex-col gap-1 bg-background px-4 py-4 lg:hidden"
      role="dialog"
      aria-label="Mobile navigation"
    >
      <Button
        href="/"
        variant="ghost"
        class="w-full justify-start"
        onclick={() => (mobileMenuOpen = false)}>Home</Button
      >
      <Button
        href="/categories"
        variant="ghost"
        class="w-full justify-start"
        onclick={() => (mobileMenuOpen = false)}>Find an Expert</Button
      >
      <Button
        href="/request"
        variant="ghost"
        class="w-full justify-start"
        onclick={() => (mobileMenuOpen = false)}>Request an Expert</Button
      >
      <Button
        href="/login"
        variant="ghost"
        class="w-full justify-start"
        onclick={() => (mobileMenuOpen = false)}>Member Login</Button
      >
      <Button
        href="/list"
        variant="ghost"
        class="w-full justify-start"
        onclick={() => (mobileMenuOpen = false)}>Get Listed Today</Button
      >
    </div>
  {/if}
</header>
