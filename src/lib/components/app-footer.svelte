<script lang="ts">
  import { page } from "$app/state";
  import { HugeiconsIcon } from "@hugeicons/svelte";
  import {
    LayoutGridIcon,
    Location01Icon,
    MailSend01Icon,
    Search01Icon,
  } from "@hugeicons/core-free-icons";
  import { Button } from "$lib/components/ui/button";
  import { Separator } from "$lib/components/ui/separator";
</script>

<footer class="mt-16 bg-background">
  <div
    class="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 py-12 text-center md:grid-cols-[1fr_2fr] md:gap-16 md:text-left"
  >
    <div class="mx-auto max-w-sm space-y-4 md:mx-0">
      <a
        href="/"
        class="font-display text-2xl font-bold leading-tight text-foreground md:text-3xl"
      >
        WitnessExperts.com
      </a>
      <p class="text-sm text-muted-foreground">
        America's trusted directory for connecting attorneys with qualified
        expert witnesses.
      </p>
    </div>

    <div class="flex flex-row justify-between gap-8">
      <nav
        class="flex flex-col items-center gap-3 md:items-start"
        aria-labelledby="footer-find-heading"
      >
        <h4
          id="footer-find-heading"
          class="text-xs font-semibold tracking-wider text-muted-foreground uppercase"
        >
          Find an Expert
        </h4>
        <ul class="flex flex-col items-center gap-1 md:items-start">
          <li>
            <Button href="/categories" variant="ghost" size="sm" class="px-0!">
              <HugeiconsIcon
                icon={LayoutGridIcon}
                data-icon="inline-start"
                strokeWidth={2}
                class="text-muted-foreground size-4 mr-1"
              />
              Search by Category
            </Button>
          </li>
          <li>
            <Button
              href="/search?location=1"
              variant="ghost"
              size="sm"
              class="px-0!"
            >
              <HugeiconsIcon
                icon={Location01Icon}
                data-icon="inline-start"
                strokeWidth={2}
                class="text-muted-foreground size-4 mr-1"
              />
              Search by Location
            </Button>
          </li>
          <li>
            <Button href="/search" variant="ghost" size="sm" class="px-0!">
              <HugeiconsIcon
                icon={Search01Icon}
                data-icon="inline-start"
                strokeWidth={2}
                class="text-muted-foreground size-4 mr-1"
              />
              Search by Keyword
            </Button>
          </li>
          <li>
            <Button href="/request" variant="ghost" size="sm" class="px-0!">
              <HugeiconsIcon
                icon={MailSend01Icon}
                data-icon="inline-start"
                strokeWidth={2}
                class="text-muted-foreground size-4 mr-1"
              />
              Request an Expert
            </Button>
          </li>
        </ul>
      </nav>

      <nav
        class="flex flex-col items-center gap-3 md:items-start"
        aria-labelledby="footer-experts-heading"
      >
        <h4
          id="footer-experts-heading"
          class="text-xs font-semibold tracking-wider text-muted-foreground uppercase"
        >
          Experts
        </h4>
        <ul class="flex flex-col items-center gap-1 md:items-start">
          {#if !page.data.session?.user}
            <li>
              <Button href="/register" variant="ghost" size="sm" class="px-0!">
                Get Listed Today</Button
              >
            </li>
          {/if}
          <li>
            <Button href="/login" variant="ghost" size="sm" class="px-0!"
              >Member login</Button
            >
          </li>
          <li>
            <Button href="/register" variant="ghost" size="sm" class="px-0!">
              Create account</Button
            >
          </li>
          <li>
            <Button href="/fees" variant="ghost" size="sm" class="px-0!">
              Fees & Practices</Button
            >
          </li>
        </ul>
      </nav>

      <nav
        class="flex flex-col items-center gap-3 md:items-start"
        aria-labelledby="footer-resources-heading"
      >
        <h4
          id="footer-resources-heading"
          class="text-xs font-semibold tracking-wider text-muted-foreground uppercase"
        >
          Resources
        </h4>
        <ul class="flex flex-col items-center gap-1 md:items-start">
          <li>
            <Button href="/library" variant="ghost" size="sm" class="px-0!"
              >Expert Library</Button
            >
          </li>
          <li>
            <Button href="/blog" variant="ghost" size="sm" class="px-0!"
              >Blog</Button
            >
          </li>
        </ul>
      </nav>

      <nav
        class="flex flex-col items-center gap-3 md:items-start"
        aria-labelledby="footer-company-heading"
      >
        <h4
          id="footer-company-heading"
          class="text-xs font-semibold tracking-wider text-muted-foreground uppercase"
        >
          Company
        </h4>
        <ul class="flex flex-col items-center gap-1 md:items-start">
          <li>
            <Button href="/about" variant="ghost" size="sm" class="px-0!"
              >About Us</Button
            >
          </li>
          <li>
            <Button href="/terms" variant="ghost" size="sm" class="px-0!"
              >Terms & Conditions</Button
            >
          </li>
          <li>
            <Button href="/privacy" variant="ghost" size="sm" class="px-0!"
              >Privacy Policy</Button
            >
          </li>
          <li>
            <Button href="/contact" variant="ghost" size="sm" class="px-0!"
              >Contact Us</Button
            >
          </li>
        </ul>
      </nav>
    </div>
  </div>

  <Separator />

  <div class="mx-auto max-w-6xl px-6 py-6">
    <div
      class="flex flex-col gap-4 text-center text-sm text-muted-foreground md:flex-row md:justify-between md:text-left"
    >
      <p>
        © {new Date().getFullYear()} WitnessExperts.com. All Rights Reserved.
      </p>
      <p>
        Use for marketing or solicitation is prohibited. WitnessExperts.com is a
        trademark.
      </p>
    </div>
  </div>
</footer>
