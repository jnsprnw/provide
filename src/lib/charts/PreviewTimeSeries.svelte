<script>
  import { LayerCake, Svg } from 'layercake';
  import AreaLayer from './layers/AreaLayer.svelte';
  import LineLayer from './layers/LineLayer.svelte';
  import MultipleLineLayer from './layers/MultipleLineLayer.svelte';

  export let data = [];
  export let xKey = 'year';
  export let yKey = 'value';

  const flatten = (data) =>
    data.reduce((memo, group) => {
      group.values.forEach(({ min, value, max, year }) => {
        memo.push({ year, value: min });
        memo.push({ year, value });
        memo.push({ year, value: max });
      });
      return memo;
    }, []);

  $: isMultiLine = data.length > 1;
</script>

<div class="chart-container">
  {#if isMultiLine}
    <LayerCake x={xKey} y={yKey} {data} flatData={flatten(data)}>
      <Svg>
        <MultipleLineLayer />
      </Svg>
    </LayerCake>
  {:else}
    <LayerCake x={xKey} y={yKey} data={data[0].values} flatData={flatten(data)}>
      <Svg>
        <AreaLayer color={data[0].color} />
        <LineLayer color={data[0].color} />
      </Svg>
    </LayerCake>
  {/if}
</div>

<style lang="postcss">
  .chart-container {
    width: 100%;
    height: 100%;
  }
</style>
