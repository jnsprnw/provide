<script>
  import { getContext } from 'svelte';
  import { area } from 'd3-shape';

  let chartData;
  export { chartData as data };
  export let y0Key = 'min';
  export let y1Key = 'max';
  export let color;

  const { data, xGet, yScale } = getContext('LayerCake');

  $: chartData = chartData || $data;

  $: areaGen = area()
    .x((d) => $xGet(d))
    .y0((d) => $yScale(d[y0Key]))
    .y1((d) => $yScale(d[y1Key]));
</script>

<path class="path-area opacity-20" d={areaGen(chartData)} fill={color} />
