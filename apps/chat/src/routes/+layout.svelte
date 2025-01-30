<script>
  import "../app.css";

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

{@render children()}
