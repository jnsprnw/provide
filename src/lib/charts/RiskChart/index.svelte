<script>
  import { LayerCake, Svg } from 'layercake';
  import { DEFAULT_FORMAT_UID } from '$lib/../config.js';
  import AxisX from '../axes/AxisX.svelte';
  import AxisY from '../axes/AxisY.svelte';
  import { scaleBand } from 'd3-scale';
  import RiskLevels from './RiskLevels.svelte';

  export let data;
  export let xKey = 'year';
  export let yKey = 'value';
  export let unit = DEFAULT_FORMAT_UID;

  const padding = { top: 0, right: 20, bottom: 0, left: 20 };

  const flatten = (data) =>
    data.reduce((memo, group) => {
      return memo.concat(group.values);
    }, []);
</script>

<div class="chart-container">
  <LayerCake
    {data}
    x={xKey}
    y={yKey}
    yDomain={[0, 1]}
    xScale={scaleBand()}
    flatData={flatten(data)}
  >
    <Svg>
      <RiskLevels />
      <AxisX {padding} />
      <AxisY />
    </Svg>
  </LayerCake>
</div>

<style lang="scss">
  .chart-container {
    width: 100%;
    height: 100%;
  }
</style>
