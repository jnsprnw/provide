<script>
  import { formatValue } from '$lib/utils/formatting';
  import { getContext } from 'svelte';
  import { UNITS } from '$stores/meta.js';
  const { width, height, xScale, yScale } = getContext('LayerCake');

  export let ticks = 4;
  export let ticksHighlighted = [0];
  export let showTickLines = true;
  export let showTickLabels = true;

  export let formatTick = (d) => formatValue(d, 'default');

  export let axisLabel;
  export let padding;
  export let showLabel = false;
  export let x; // Base x position of the axis, usually full width or 0
  export let y; // Base y position of the axis, usually 0
  export let labelX = 10; // Defines the distance between zero position of the chart and the x center of the label
  export let lineStart = 0; // If 0, tick line starts at zero position of the chart
  export let lineLength; // If positive, line extends to bottom, if negative extends to top. Default is -height
  export let orientation = 1; // 1 for left hand axis extending to right, -1 if other way around
  export let textAnchor = 'start';

  $: xPos = x ?? orientation === 1 ? 0 : $width;
  $: yPos = y ?? 0;
  $: labelTextAnchor = textAnchor || orientation === 1 ? 'end' : 'start';

  $: tickVals = Array.isArray(ticks) ? ticks : $yScale.ticks(ticks);
</script>

{#if axisLabel || showLabel}
  <text
    transform={`translate(0, ${-padding.top + 9})`}
    class="text-xs fill-foreground-weak">{axisLabel}</text
  >
{/if}
<g transform={`translate(${xPos}, ${yPos})`}>
  {#each tickVals as tick, i}
    <g transform="translate(0, {$yScale(tick)})">
      {#if showTickLines !== false}
        <line
          class={`stroke-foreground-weakest stroke-dasharray-2-3`}
          class:stroke-foreground-weaker={ticksHighlighted.includes(tick)}
          x1={lineStart}
          x2={lineLength ? lineLength * orientation : $width * orientation}
        />
      {/if}
      {#if showTickLabels}
        <text
          x={labelX * -orientation}
          class="fill-foreground-weak text-xs"
          dominant-baseline="middle"
          style="
          text-anchor: {labelTextAnchor};
        "
        >
          {formatTick(tick)}
        </text>
      {/if}
    </g>
  {/each}
  <g transform="translate({[0, $height]})rotate(-90)">
    <slot />
  </g>
</g>
