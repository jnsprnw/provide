<script>
  import { getContext } from 'svelte';
  import { area } from 'd3-shape';
  export let y0Key = 'min';
  export let y1Key = 'max';
  export let color;

  const { data, xGet, yScale } = getContext('LayerCake');

  $: areaGen = area()
    .x((d) => $xGet(d))
    .y0((d) => $yScale(d[y0Key]))
    .y1((d) => $yScale(d[y1Key]));
</script>

<path class="path-area" d={areaGen($data)} fill={color} />

<style>
  .path-area {
    opacity: 0.3;
  }
</style>
