<script>
  import { getContext } from 'svelte';

  const { data, xGet, z, zGet, xScale, yScale } = getContext('LayerCake');

  export let color = '#ab00d6';
</script>

{#each $data as d}
  <g transform={`translate(${$xGet(d)}, ${$yScale(d.max)})`}>
    <rect
      height={$yScale(d.min) - $yScale(d.max)}
      width={10}
      style={`fill: ${$z(d)}; opacity: .5`}
    />
  </g>
{/each}
