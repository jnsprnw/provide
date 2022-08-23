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
  export let xTick = undefined;
  export let yTick = 0;
  export let dxTick = 0;
  export let dyTick = 0;
  export let forceShow = null;
  export let minTickSpace = 30;
  export let ticksHighlighted = [];

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
    y1={$yScale.range()[0] + 0.5}
    y2={$yScale.range()[0] + 0.5}
    x1="0"
    x2={$width}
  />
{/if}
{#each visibleTicks as tick, i}
  <g
    class="tick tick-{tick}"
    transform="translate({$xScale(tick)},{$yScale.range()[0]})"
  >
    {#if gridlines !== true}
      <line
        class={`chart-grid ${gridClass}`}
        class:chart-grid--highlighed={ticksHighlighted.includes(tick)}
        y1={-$height}
        y2="0"
        x1="0"
        x2="0"
      />
    {/if}
    <text
      x={xTick || isBandwidth ? $xScale.bandwidth() / 2 : 0}
      y={yTick}
      dx={dxTick}
      dy={dyTick}
      text-anchor={textAnchor(i)}
      class="chart-tick"
    >
      {formatTick(tick)}
    </text>
  </g>
{/each}
