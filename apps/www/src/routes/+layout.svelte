<script>
  import "../app.css";

  const { children } = $props();
</script>

<svelte:head>
  <title>$BROWSER DAO</title>
  <meta
    name="description"
    content="Control the web's most powerful autonomous browser agents"
  />
</svelte:head>

{@render children()}
