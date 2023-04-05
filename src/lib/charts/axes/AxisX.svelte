<script>
  import { formatValue } from '$lib/utils/formatting';
  import { first, last, range, uniq } from 'lodash-es';
  import { getContext } from 'svelte';
  const { width, xScale, yScale, height } = getContext('LayerCake');

  export let gridlines = true;
  export let gridClass = '';
  export let formatTick = (d) => formatValue(d, 'year');
  export let baseline = false;
  export let snapTicks = false;
  export let ticks = 4;
  export let forceShow = null;
  export let minTickSpace = 30;
  export let ticksHighlighted = [];
  export let x; // Base x position of the axis, usually 0
  export let y; // Base y position of the axis, usually full height or 0
  export let labelY = 10; // Defines the distance between zero position of the chart and the y center of the label
  export let labelOffset = 6; // Places the label so its vertical center aligns with the zero position of the chart
  export let lineStart = 0; // If 0, tick line starts at zero position of the chart
  export let lineLength; // If positive, line extends to bottom, if negative extends to top. Default is -height

  $: xPos = x ?? 0;
  $: yPos = y ?? $height;

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
    <g class="" transform="translate({$xScale(tick)}, 0)">
      {#if gridlines !== false}
        <line
          class={`stroke-foreground-weakest stroke-dasharray-2-3`}
          class:stroke-foreground-weaker={ticksHighlighted.includes(tick)}
          y1={lineStart}
          y2={lineLength ?? -$height}
        />
      {/if}
      <text
        x={isBandwidth ? $xScale.bandwidth() / 2 : 0}
        y={labelOffset + labelY}
        text-anchor={textAnchor(i)}
        class="fill-foreground-weak text-xs"
      >
        {formatTick(tick)}
      </text>
    </g>
  {/each}
</g>
