<script>
  import { getContext } from 'svelte';
  const { yRange, xRange } = getContext('LayerCake');
  export let padding;
  export let label;

  $: [yMin, yMax] = $yRange;
  $: [_, xMax] = $xRange;

  $: yMiddle = yMin + (yMax - yMin) / 2;
  $: x = xMax + (padding?.right || 0);
</script>

<g class="axis x-axis x-axis-label">
  <text
    transform={`rotate(90 ${x} ${yMiddle})`}
    {x}
    y={yMiddle}
    text-anchor="middle"
    class="chart-label chart-label--bold"
    dominant-baseline="hanging">{label}</text
  >
</g>

<style lang="scss">
</style>
