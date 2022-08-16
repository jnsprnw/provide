<script>
  import { LayerCake, Svg } from 'layercake';
  import { DEFAULT_FORMAT_UID } from '$lib/../config.js';
  import { formatValue } from '$lib/utils/formatting';
  import AxisX from '../axes/AxisX.svelte';
  import AxisY from '../axes/AxisY.svelte';
  import { scaleBand } from 'd3-scale';
  import RiskLevels from './RiskLevels.svelte';
  import { getContext } from 'svelte';

  export let data;
  export let xKey = 'year';
  export let yKey = 'value';
  export let unit = DEFAULT_FORMAT_UID;

  const theme = getContext('theme');

  $: formatTickY = (d) => formatValue(d, unit);

  const padding = { top: 5, right: 10, bottom: 20, left: 40 };

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
    xScale={scaleBand().paddingOuter(0.2).paddingInner(0.2)}
    flatData={flatten(data)}
  >
    <Svg>
      <RiskLevels hatchingColor={$theme.color.foreground.weakest} />
      <AxisX {padding} />
      <AxisY
        formatTick={formatTickY}
        ticksHighlighted={[0, 1]} />
    </Svg>
  </LayerCake>
</div>

<style lang="scss">
  .chart-container {
    width: 100%;
    height: 100%;
  }
</style>
