<script>
  import { formatValue } from "$lib/utils/formatting";
  import { getContext } from "svelte";
  const { width, height, xScale, yScale } = getContext("LayerCake");

  export let padding = { top: 0, left: 0, right: 0, bottom: 0 };

  export let ticks = 4;
  export let gridlines = true;

  export let xTick = 0;
  export let yTick = 0;
  export let dxTick = 0;
  export let dyTick = 0;
  export let tickPadding = 3;
  export let tickSize;
  export let textAnchor = "end";
  export let rightToLeft = false;
  export let formatTick = (d) => formatValue(d, "default");

  $: tickLength = (tickSize ?? $width) - tickPadding;

  $: isBandwidth = typeof $yScale.bandwidth === "function";

  $: tickVals = Array.isArray(ticks)
    ? ticks
    : isBandwidth
    ? $yScale.domain()
    : $yScale.ticks(ticks);

  const TICK_PADDING = 5;
</script>

<g class="axis y-axis" transform="translate({-padding.left}, 0)">
  {#each tickVals as tick, i}
    <g
      class="tick tick-{tick}"
      transform="translate({$xScale.range()[0] +
        (isBandwidth ? padding.left : padding.left - TICK_PADDING)},
      {$yScale(tick)})"
    >
      {#if gridlines !== false}
        <line
          x1={rightToLeft ? -tickPadding : tickPadding}
          x2={rightToLeft ? -tickLength : tickLength}
          y1={yTick + (isBandwidth ? $yScale.bandwidth() / 2 : 0)}
          y2={yTick + (isBandwidth ? $yScale.bandwidth() / 2 : 0)}
        />
      {/if}
      <!-- <text
        x="{xTick}"
        y="{yTick + (isBandwidth ? $yScale.bandwidth() / 2 : 0)}"
        dx="{isBandwidth ? -5 : dxTick}"
        dy="{isBandwidth ? 4 : dyTick}"
        class="bg"
        style="text-anchor:{isBandwidth ? 'end' : textAnchor};">
        {formatTick(tick)}
      </text> -->
      <text
        x={xTick}
        y={yTick + (isBandwidth ? $yScale.bandwidth() / 2 : 0)}
        dx={isBandwidth ? -5 : dxTick}
        dy={isBandwidth ? 0 : dyTick}
        class="chart-tick"
        style="
          text-anchor:{isBandwidth ? 'end' : textAnchor};
        "
      >
        {formatTick(tick)}
      </text>
    </g>
  {/each}
  <g transform="translate({[0, $height]})rotate(-90)">
    <slot />
  </g>
</g>

<style lang="scss">
  .tick line {
    //@include gridline();
  }

  .tick.tick-0 line {
    stroke-dasharray: 0;
    stroke: var(--color-foreground-weaker);
  }

  // .bg {
  //   stroke-width: 5;
  //   fill: var(--color-background-weaker);
  //   stroke: var(--color-background-weaker);
  // }
</style>
