<script>
  let { class: classes, variant = "solid", children, ...rest } = $props();

  const styles = {
    solid:
      "inline-flex justify-center py-1 px-4 text-base font-medium tracking-tight shadow-sm focus:outline-hidden text-foreground hover:bg-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground active:bg-foreground active:text-foreground/80 disabled:opacity-30 disabled:hover:text-foreground",
    outline:
      "inline-flex justify-center border border-l-6 py-[calc(--spacing(1)-1px)] px-[calc(--spacing(4)-1px)] text-base font-medium tracking-tight focus:outline-hidden border-foreground text-foreground hover:border-foreground hover:bg-foreground/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground active:text-foreground active:bg-foreground/20 active:text-foreground/70 disabled:opacity-40 disabled:hover:text-foreground disabled:hover:bg-transparent",
  };
</script>

<svelte:element
  this={typeof rest.href === "undefined" ? "button" : "a"}
  class={[styles[variant], classes]}
  {...rest}
>
  {@render children?.()}</svelte:element
>
