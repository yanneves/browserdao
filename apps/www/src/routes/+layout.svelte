<script>
  import "../app.css";
  import { browser } from "$app/environment";
  import { PUBLIC_FATHOM_KEY } from "$env/static/public";
  import FilmGrain from "../lib/components/FilmGrain.svelte";

  const { children } = $props();
</script>

<svelte:head>
  <title>$BROWSER DAO</title>
  <meta
    name="description"
    content="Control the web's most powerful autonomous browser agents"
  />
</svelte:head>

<FilmGrain>
  <div class="h-full bg-[hsl(210,20%,10%)]"></div>
</FilmGrain>

{@render children()}

{#if browser}
  <script
    src="https://cdn.usefathom.com/script.js"
    data-excluded-domains="localhost"
    data-site={PUBLIC_FATHOM_KEY}
    data-spa="auto"
    defer
  ></script>
{/if}
