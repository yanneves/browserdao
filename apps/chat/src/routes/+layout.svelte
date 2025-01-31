<script>
  import "../app.css";
  import "@fontsource-variable/inter";
  import FilmGrain from "$lib/components/FilmGrain.svelte";

  // eslint-disable-next-line svelte/valid-prop-names-in-kit-pages
  let { children } = $props();
</script>

<svelte:head>
  <title>$BROWSER DAO</title>
  <meta
    name="description"
    content="Control the web's most powerful autonomous browser agents"
  />
</svelte:head>

<FilmGrain>
  <div class="bg-bg-50 h-full"></div>
</FilmGrain>

<main class="mx-auto h-full w-full max-w-sm">
  {@render children()}
</main>
