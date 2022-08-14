<script>
  import { getContext } from 'svelte';
  const { data, xGet, yGet } = getContext('LayerCake');
</script>

{#each $data as dot}
  <circle
    class="dot"
    class:highlight={dot.highlight}
    cx={$xGet(dot)}
    cy={$yGet(dot)}
    r={dot.color || dot.highlight ? 8 : 4}
    style={`fill: ${dot.color}`}
  />
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
