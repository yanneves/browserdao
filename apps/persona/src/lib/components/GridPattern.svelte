<script>
  let props = $props();
  const uid = $props.id();
</script>

<svg aria-hidden="true" class="absolute inset-0 h-full w-full">
  <defs>
    <pattern
      id={uid}
      width="128"
      height="128"
      patternUnits="userSpaceOnUse"
      {...props}
    >
      <path d="M0 128V.5H128" fill="none" stroke="currentColor" />
    </pattern>
  </defs>
  <rect width="100%" height="100%" fill={`url(#${uid})`} />
</svg>
