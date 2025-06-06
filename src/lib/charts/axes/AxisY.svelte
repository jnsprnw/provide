<script>
  import { formatRange } from '$lib/utils/formatting';
  import { getContext } from 'svelte';
  const { width, height, yScale } = getContext('LayerCake');

  export let ticks = 4;
  export let ticksHighlighted = [0];
  export let showTickLines = true;
  export let showTickLabels = true;

  export let axisLabel = undefined;
  export let padding = {};
  export let x = undefined; // Base x position of the axis, usually full width or 0
  export let y = 0; // Base y position of the axis, usually 0
  export let labelX = 10; // Defines the distance between zero position of the chart and the x center of the label
  export let lineStart = 0; // If 0, tick line starts at zero position of the chart
  export let lineLength = undefined; // If positive, line extends to bottom, if negative extends to top. Default is -height
  export let orientation = 1; // 1 for left hand axis extending to right, -1 if other way around
  export let textAnchor = 'start';
  export let unit = 'default';

  $: xPos = x ?? orientation === 1 ? 0 : $width;
  $: yPos = y;
  $: labelTextAnchor = textAnchor || orientation === 1 ? 'end' : 'start';

  $: tickVals = Array.isArray(ticks) ? ticks : $yScale.ticks(ticks);
  $: tickLabels = formatRange(tickVals, unit);
</script>

{#if axisLabel}
  <text transform={`translate(${-(padding?.left ?? 0) / 2}, ${-(padding?.top ?? 0) / 2})`} dominant-baseline="middle" class="text-xs fill-contour-weaker">↑ {axisLabel}</text>
{/if}
<g transform={`translate(${xPos}, ${yPos})`}>
  {#each tickVals as tick, i}
    <g transform="translate(0, {$yScale(tick)})">
      {#if showTickLines !== false}
        <line
          class={`stroke-contour-weakest stroke-dasharray-2-3`}
          class:stroke-contour-weaker={ticksHighlighted.includes(tick)}
          x1={lineStart}
          x2={lineLength ? lineLength * orientation : $width * orientation}
        />
      {/if}
      {#if showTickLabels}
        <text x={labelX * -orientation} class="fill-contour-weak text-xs" dominant-baseline="middle" style="text-anchor: {labelTextAnchor};">
          {tickLabels.values[i]}
          <title>{tickLabels.values[i]}</title>
        </text>
      {/if}
    </g>
  {/each}
  <g transform="translate({[0, $height]})rotate(-90)">
    <slot />
  </g>
</g>
