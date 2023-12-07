<script>
  import { formatValue } from '$lib/utils/formatting';

  export let colorScales;
  export let scale;
  export let strokeWidth = 4;
  $: height = colorScales.length * 4 + strokeWidth;
  $: domain = scale.domain();
  $: range = scale.range();
  $: steps = domain.slice(1);
  $: width = steps.length * 32;
  $: stepWidth = width / steps.length;
  $: spacing = height / colorScales.length;
</script>

{#if steps.length > 1}
  <div class="flex items-center gap-3">
    <div class="text-sm text-contour-weak leading-4">
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
              stroke={colorScale(range[i + 1])}
              class="stroke-3"
            />
          {/each}
        {/each}
      </svg>
      <div class="flex justify-around">
          <span />
        {#each steps.slice(0, -1) as step}
          <span class="text-xs font-bold">{formatValue(step, 'degree')}</span>
        {/each}
        <span />
      </div>
    </div>
  </div>
{/if}
