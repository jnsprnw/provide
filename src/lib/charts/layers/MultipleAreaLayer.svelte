<script>
  import { getContext } from 'svelte';
  import { area } from 'd3-shape';
  import { some } from 'lodash-es';

  export let y0Key = 'min';
  export let y1Key = 'max';

  const { data, xGet, yScale } = getContext('LayerCake');

  $: areaGen = area()
    .x((d) => $xGet(d))
    .y0((d) => $yScale(d[y0Key]))
    .y1((d) => $yScale(d[y1Key]));

  $: chartData = $data.filter(({ values }) =>
    some(values, (d) => d.min !== undefined && d.max !== undefined)
  );
</script>

{#each chartData as d}
  <path class="path-area" d={areaGen(d.values)} fill={d.color} />
{/each}

<style>
  .path-area {
    opacity: 0.3;
  }
</style>
