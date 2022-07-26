<script>
  import { formatValue } from "$lib/utils/formatting";
  import { first, last, range, uniq } from "lodash-es";
  import { getContext } from "svelte";
  const { width, height, xScale, yScale } = getContext("LayerCake");

  export let padding = { top: 0, left: 0, right: 0, bottom: 0 };
  export let gridlines = true;
  export let formatTick = (d) => formatValue(d, "year");
  export let baseline = false;
  export let snapTicks = false;
  export let ticks = 4;
  export let xTick = undefined;
  export let yTick = 0;
  export let dxTick = 0;
  export let dyTick = 0;
  export let forceShow = null;
  export let minTickSpace = 30;

  $: isBandwidth = typeof $xScale.bandwidth === "function";

  $: xDomain = $xScale.domain();
  $: endTicks = forceShow
    ? uniq([first(xDomain), forceShow, last(xDomain)])
    : [first(xDomain), last(xDomain)];

  $: fullTicks = Array.isArray(ticks)
    ? ticks
    : isBandwidth
    ? $xScale.domain()
    : typeof ticks === "function"
    ? ticks($xScale.ticks())
    : $xScale.ticks(ticks);

  $: visibleTicks =
    $width / fullTicks.length < minTickSpace ? endTicks : fullTicks;

  $: textAnchor = (i) => {
    if (snapTicks) {
      if (i === 0) {
        return "start";
      }
      if (i === visibleTicks.length - 1) {
        return "end";
      }
    }
    return "middle";
  };
</script>

<g class="axis x-axis">
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
      transform="translate({$xScale(tick)},{$yScale.range()[0] + padding.top})"
    >
      {#if gridlines !== false}
        <line
          y1={$yScale.range()[1] - $yScale.range()[0]}
          y2="0"
          x1="0"
          x2="0"
        />
      {/if}
      <!-- <text
        class="bg"
        x="{xTick || isBandwidth ? $xScale.bandwidth() / 2 : 0}"
        y="{yTick}"
        dx="{dxTick}"
        dy="{dyTick}"
        text-anchor="{textAnchor(i)}">
        {formatTick(tick)}
      </text> -->
      <text
        x={xTick || isBandwidth ? $xScale.bandwidth() / 2 : 0}
        y={yTick}
        dx={dxTick}
        dy={dyTick}
        text-anchor={textAnchor(i)}
      >
        {formatTick(tick)}
      </text>
    </g>
  {/each}

  <g transform="translate({[0, $yScale.range()[0]]})">
    <slot />
  </g>
</g>

<style lang="scss">
  .tick {
    font-size: var(--font-size-s);
  }

  line,
  .tick line {
    //@include gridline();
  }

  rect {
    fill: none;
    stroke: var(--color-foreground-weaker);
    stroke-width: 1;
  }

  .tick text {
    // text-anchor: middle;
    alignment-baseline: middle;
    font-size: var(--font-size-s);
    fill: var(--color-text-weaker);
  }

  // .bg {
  //   stroke-width: 5;
  //   fill: var(--color-background-weaker);
  //   stroke: var(--color-background-weaker);
  // }

  .baseline {
    stroke-dasharray: 0;
  }
</style>
