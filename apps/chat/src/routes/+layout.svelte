<script>
  import "../app.css";
  import "@fontsource-variable/inter";

  let { children } = $props();
</script>

<svelte:head>
  <title>Browser.icu</title>
  <meta
    name="description"
    content="Control the web's most powerful autonomous browser agents"
  />
</svelte:head>

{@render children()}
