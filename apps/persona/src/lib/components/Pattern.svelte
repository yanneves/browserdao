<script>
  let {
    size = 40,
    gapX = 16,
    gapY = 8,
    pattern = [
      [0, 1, 0, 1, 1, 0, 1, 0],
      [1, 0, 1, 1, 0, 0, 0, 1],
      [0, 1, 0, 1, 1, 0, 1, 0],
      [1, 0, 1, 1, 0, 0, 0, 1],
    ],
    ...rest
  } = $props();
  const uid = $props.id();

  let width = $derived(
    pattern[0].length * size + (pattern[0].length - 1) * gapX,
  );
  let height = $derived(pattern.length * size + (pattern.length - 1) * gapY);
</script>

<svg aria-hidden="true" {width} {height} {...rest}>
  <defs>
    <symbol id="{uid}-0" width={size} height={size}>
      <rect class="fill-orange-500" width={size} height={size} />
      <circle
        class="fill-orange-600"
        cx={size / 2}
        cy={size / 2}
        r={size * (13 / 40)}
      />
    </symbol>
    <symbol id="{uid}-1" width={size} height={size}>
      <circle
        class="fill-orange-300"
        cx={size / 2}
        cy={size / 2}
        r={size / 2}
      />
      <rect
        class="fill-orange-600"
        width={size / 2}
        height={size / 2}
        x={size / 4}
        y={size / 4}
      />
    </symbol>
  </defs>
  {#each pattern as row, rowIndex (rowIndex)}
    {#each row as shape, columnIndex (columnIndex)}
      <use
        key="{rowIndex}-{columnIndex}"
        href="#{uid}-{shape}"
        x={columnIndex * size + columnIndex * gapX}
        y={rowIndex * size + rowIndex * gapY}
      />
    {/each}
  {/each}
</svg>
