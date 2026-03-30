<script lang="ts">
  import "../app.css";
  import favicon from "$lib/assets/favicon.svg";
  import Header from "$lib/components/Header.svelte";
  import Footer from "$lib/components/Footer.svelte";

  let { children, data } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<Header session={data.session} />
<main class="bg-background min-h-[calc(100vh-4rem-200px)] flex-1">
  {@render children()}
</main>
<Footer />
