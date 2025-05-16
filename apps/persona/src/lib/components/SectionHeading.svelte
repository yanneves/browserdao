<script>
  let { number, class: classes, children, ...rest } = $props();
</script>

<h2
  class={[
    classes,
    "inline-flex items-center rounded-full px-4 py-1 text-orange-600 ring-1 ring-blue-600 ring-inset",
  ]}
  {...rest}
>
  <span class="font-mono text-sm" aria-hidden="true">
    {number.padStart(2, "0")}
  </span>
  <span class="ml-3 h-3.5 w-px bg-orange-600/20"></span>
  <span class="ml-3 text-base font-medium tracking-tight">
    {@render children?.()}
  </span>
</h2>
