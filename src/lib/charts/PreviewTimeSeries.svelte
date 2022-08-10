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
  $: chartData = isMultiLine ? data : data[0];
</script>

<div class="chart-container">
  <LayerCake x={xKey} y={yKey} data={chartData.values} flatData={flatten(data)}>
    <Svg>
      {#if isMultiLine}
        <MultipleLineLayer />
      {:else}
        <AreaLayer color={chartData.color} />
        <LineLayer color={chartData.color} />
      {/if}
    </Svg>
  </LayerCake>
</div>

<style lang="scss">
  .chart-container {
    width: 100%;
    height: 100%;
  }
</style>
