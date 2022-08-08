<script>
  import { LayerCake, Svg } from 'layercake';
  import { formatValue } from '$lib/utils/formatting';
  import { DEFAULT_FORMAT_UID } from '$lib/../config.js';
  import MultipleLineLayer from './layers/MultipleLineLayer.svelte';
  import AxisX from './axes/AxisX.svelte';
  import AxisY from './axes/AxisY.svelte';
  import { getContext } from 'svelte';

  const theme = getContext('theme');

  export let data = [];
  export let xKey = 'year';
  export let yKey = 'value';
  export let unit = DEFAULT_FORMAT_UID;

  const padding = { top: 0, right: 20, bottom: 20, left: 20 };

  const flatten = (data) =>
    data.reduce((memo, group) => {
      return memo.concat(group.values);
    }, []);

  $: formatTickY = (d) => formatValue(d, unit);
</script>

<div class="chart-container">
  <LayerCake {padding} x={xKey} y={yKey} {data} flatData={flatten(data)}>
    <Svg>
      <AxisX
        gridlines={false}
        ticks={6}
        padding={{ top: 10, left: 0, right: 0 }}
      />
      <AxisY ticks={4} xTick={-3} formatTick={formatTickY} />
      <MultipleLineLayer base={$theme.color.background.base} />
    </Svg>
  </LayerCake>
</div>

<style lang="scss">
  .chart-container {
    width: 100%;
    height: 100%;
  }
</style>
