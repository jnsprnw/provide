<script>
  import { getContext } from 'svelte';
  const { xRange, yRange } = getContext('LayerCake');
  export let label;
  export let padding;

  $: [xMin, xMax] = $xRange;
  $: [_, yMax] = $yRange;

  $: xMiddle = xMin + (xMax - xMin) / 2;
  $: y = yMax - (padding?.top || 0);
</script>

<g class="axis x-axis x-axis-label">
  <text
    x={xMiddle}
    {y}
    text-anchor="middle"
    class="chart-label chart-label--bold"
    dominant-baseline="haning">{label}</text
  >
</g>

<style lang="postcss">
</style>
