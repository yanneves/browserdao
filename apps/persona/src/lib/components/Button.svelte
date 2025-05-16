<script>
  let {
    class: classes,
    variant = "solid",
    color = "zinc",
    children,
    ...rest
  } = $props();

  const baseStyles = {
    solid:
      "inline-flex justify-center rounded-md py-1 px-4 text-base font-semibold tracking-tight shadow-sm focus:outline-hidden",
    outline:
      "inline-flex justify-center rounded-md border py-[calc(--spacing(1)-1px)] px-[calc(--spacing(4)-1px)] text-base font-semibold tracking-tight focus:outline-hidden",
  };

  const variantStyles = {
    solid: {
      zinc: "bg-zinc-900 text-white hover:bg-zinc-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 active:bg-zinc-700 active:text-white/80 disabled:opacity-30 disabled:hover:bg-zinc-900",
      blue: "bg-orange-600 text-white hover:bg-orange-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 active:bg-orange-700 active:text-white/80 disabled:opacity-30 disabled:hover:bg-orange-600",
      white:
        "bg-zinc-950 text-orange-600 hover:text-orange-700 focus-visible:text-orange-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:bg-orange-50 active:text-orange-900/80 disabled:opacity-40 disabled:hover:text-orange-600",
    },
    outline: {
      zinc: "border-zinc-200 text-zinc-100 hover:border-zinc-300 hover:bg-zinc-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-600 active:border-zinc-200 active:bg-zinc-950 active:text-zinc-100/70 disabled:opacity-40 disabled:hover:border-zinc-200 disabled:hover:bg-transparent",
      blue: "border-orange-300 text-orange-600 hover:border-orange-400 hover:bg-orange-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 active:text-orange-600/70 disabled:opacity-40 disabled:hover:border-orange-300 disabled:hover:bg-transparent",
    },
  };
</script>

<svelte:element
  this={typeof rest.href === "undefined" ? "button" : "a"}
  class={[
    baseStyles[variant],
    variant === "outline"
      ? variantStyles.outline[color]
      : variant === "solid"
        ? variantStyles.solid[color]
        : undefined,
    classes,
  ]}
  {...rest}
>
  {@render children?.()}</svelte:element
>
