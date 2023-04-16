<script>
  import { formatValue } from '$lib/utils/formatting';
  import { range } from 'd3-array';

  export let colorScales;
  export let strokeWidth = 4;
  $: height = colorScales.length * 4 + strokeWidth;
  $: domain = colorScales[0].domain();
  $: steps = range(domain[0], domain[1] + 0.5, 0.5);
  $: width = steps.length * 32;
  $: stepWidth = width / steps.length;
  $: spacing = height / colorScales.length;
</script>

<div class="flex items-center gap-3">
  <div class="text-sm text-foreground-weak leading-4">
    Global Mean Temperature
  </div>
  <div>
    <svg {width} {height}>
      {#each steps as step, i}
        {#each colorScales as colorScale, j}
          <line
            x1={i * stepWidth}
            x2={(i + 1) * stepWidth}
            y1={j * spacing + strokeWidth}
            y2={j * spacing + strokeWidth}
            stroke={colorScale(step)}
            class="stroke-3"
          />
        {/each}
      {/each}
    </svg>
    <div class="flex justify-around">
      {#each steps as step}
        <span class="text-xs font-bold">{formatValue(step, 'degree')}</span>
      {/each}
    </div>
  </div>
</div>
