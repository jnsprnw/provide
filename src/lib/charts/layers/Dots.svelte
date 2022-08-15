<script>
  import { getContext } from 'svelte';
  const { data, xGet, yGet } = getContext('LayerCake');

  const R_BIG = 8;
  const R_SMALL = 4;
</script>

{#each $data as dot}
  <g transform={`translate(${$xGet(dot)}, ${$yGet(dot)})`}>
    <circle
      class="dot"
      class:highlight={dot.highlight}
      r={dot.color || dot.highlight ? R_BIG : R_SMALL}
      style={`fill: ${dot.color}`}
    />
    {#if dot.highlight}
    <g transform={`translate(${0}, ${-1 * R_BIG - 4})`}>
      <text
        class="chart-label chart-label--bold chart-label--bg"
        text-anchor="middle">
        { dot.label }
      </text>
      <text
        class="chart-label chart-label--bold"
        text-anchor="middle">
        { dot.label }
      </text>
    </g>
    {/if}
    <text>
  </g>
{/each}

<style lang="scss">
  .dot {
    stroke-width: 2px;
    fill: var(--color-background-weakest);
    stroke: var(--color-background-base);
    stroke-opacity: 0.75;

    // &.highlight {
    //   stroke-width: 4px;
    // }
  }
</style>
