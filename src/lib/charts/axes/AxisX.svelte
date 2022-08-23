<script>
  import { formatValue } from '$lib/utils/formatting';
  import { first, last, range, uniq } from 'lodash-es';
  import { getContext } from 'svelte';
  const { width, xScale, yScale, height } = getContext('LayerCake');

  export let gridlines = true;
  export let gridClass = '';
  export let formatTick = (d) => formatValue(d, 'year');
  export let baseline = true;
  export let snapTicks = false;
  export let ticks = 4;
  export let forceShow = null;
  export let minTickSpace = 30;
  export let ticksHighlighted = [];
  export let x; // Base x position of the axis, usually 0
  export let y; // Base y position of the axis, usually full height or 0
  export let labelPadding = 10; // Defines the distance between zero position of the chart and the y center of the label
  export let labelOffset = 5; // Places the label so its vertical center aligns with the zero position of the chart
  export let lineStart = 0; // If 0, tick line starts at zero position of the chart
  export let lineLength; // If positive, line extends to bottom, if negative extends to top. Default is -height

  $: xPos = x ?? 0;
  $: yPos = y ?? $yScale.range()[0];

  $: isBandwidth = typeof $xScale.bandwidth === 'function';

  $: xDomain = $xScale.domain();
  $: endTicks = forceShow
    ? uniq([first(xDomain), forceShow, last(xDomain)])
    : [first(xDomain), last(xDomain)];

  $: fullTicks = Array.isArray(ticks)
    ? ticks
    : isBandwidth
    ? $xScale.domain()
    : typeof ticks === 'function'
    ? ticks($xScale.ticks())
    : $xScale.ticks(ticks);

  $: visibleTicks =
    $width / fullTicks.length < minTickSpace ? endTicks : fullTicks;

  $: textAnchor = (i) => {
    if (snapTicks) {
      if (i === 0) {
        return 'start';
      }
      if (i === visibleTicks.length - 1) {
        return 'end';
      }
    }
    return 'middle';
  };
</script>

{#if baseline === true}
  <line
    class="baseline"
    y1={$yScale.range()[0]}
    y2={$yScale.range()[0]}
    x1="0"
    x2={$width}
  />
{/if}

<g transform={`translate(${xPos}, ${yPos})`}>
  {#each visibleTicks as tick, i}
    <g class="tick tick-{tick}" transform="translate({$xScale(tick)}, 0)">
      {#if gridlines !== false}
        <line
          class={`chart-gridline ${gridClass}`}
          class:chart-gridline--highlighed={ticksHighlighted.includes(tick)}
          y1={lineStart}
          y2={lineLength ?? -$height}
          x1="0"
          x2="0"
        />
      {/if}
      <text
        x={isBandwidth ? $xScale.bandwidth() / 2 : 0}
        y={labelOffset + labelPadding}
        text-anchor={textAnchor(i)}
        class="chart-tick"
      >
        {formatTick(tick)}
      </text>
    </g>
  {/each}
</g>

<style>
  .baseline {
    stroke: var(--color-foreground-weakest);
    shape-rendering: crispEdges;
  }
</style>
