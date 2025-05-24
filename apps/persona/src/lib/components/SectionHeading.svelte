<script>
  let { number, class: classes, children, ...rest } = $props();
</script>

<h2
  class={[
    classes,
    "ring-primary items-cente inline-flex w-full ring-1 ring-inset",
  ]}
  {...rest}
>
  <span
    class="bg-primary px-2 pt-[5px] font-mono text-sm text-black"
    aria-hidden="true"
  >
    {number.padStart(2, "0")}
  </span>
  <span class="text-primary ml-3 text-base font-medium tracking-tight">
    {@render children?.()}
  </span>
</h2>
