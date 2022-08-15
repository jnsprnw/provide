<script>
  import { LayerCake, Svg } from 'layercake';
  import { formatValue } from '$lib/utils/formatting';
  import { DEFAULT_FORMAT_UID } from '$lib/../config.js';
  import Dots from '../layers/Dots.svelte';
  import Sectors from '../layers/Sectors.svelte';
  import AxisX from '../axes/AxisX.svelte';
  import AxisY from '../axes/AxisY.svelte';

  export let data = [];
  export let xKey = 'x';
  export let yKey = 'y';
  export let unit = DEFAULT_FORMAT_UID;

  const padding = { top: 5, right: 10, bottom: 20, left: 40 };

  $: formatTick = (d) => formatValue(d, unit);

  $: sortedData = data.slice(0).sort((a, b) =>
    // First sort by `highlight`, then by `color`
    a.highlight && !b.highlight ? 1 : a.color && !b.color ? 1 : -1
  );
</script>

<div class="figure-container">
  <div class="chart-container">
    <LayerCake
      {padding}
      x={xKey}
      y={yKey}
      data={sortedData}
      flatData={sortedData}
    >
    <!-- xNice={true}
      yNice={true} -->
      <Svg>
        <Sectors />
        <AxisX {padding} formatTick={formatTick} />
        <AxisY {padding} formatTick={formatTick} />
        <Dots />
      </Svg>
    </LayerCake>
  </div>
</div>

<style lang="scss">
  .figure-container,
  .chart-container {
    width: 100%;
    height: 100%;
  }
</style>