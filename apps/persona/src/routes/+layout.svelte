<script>
  import "@fontsource-variable/inter";
  import "@fontsource-variable/space-grotesk";
  import "../app.css";

  const { children } = $props();
</script>

<svelte:head>
  <title>Browser.icu Persona NFTs</title>
  <meta name="description" content="The synthetic users of the agentic web" />
</svelte:head>

{@render children()}
