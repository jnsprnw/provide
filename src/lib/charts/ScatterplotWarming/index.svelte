<script>
  import { LayerCake, Svg } from 'layercake';
  import { formatValue } from '$lib/utils/formatting';
  import { DEFAULT_FORMAT_UID } from '$lib/../config.js';
  import Dots from '../layers/Dots.svelte';
  import Sectors from '../layers/Sectors.svelte';
  import AxisX from '../axes/AxisX.svelte';
  import AxisY from '../axes/AxisY.svelte';
  import { sortBy } from 'lodash-es';

  export let data = [];
  export let xKey = 'x';
  export let yKey = 'y';
  export let unit = DEFAULT_FORMAT_UID;

  const padding = { top: 5, right: 10, bottom: 20, left: 40 };

  $: formatTick = (d) => formatValue(d, unit);

  $: sortedData = sortBy(data, ['highlight', 'isSelected'])
  // This sorting is somewhat buggy.
  // $: sortedData = data.slice(0).sort((a, b) =>
  //   // First sort by `highlight`, then by `color`
  //   a.highlight && !b.highlight ? 1 : a.color && !b.color ? 1 : -1
  // );
</script>

<div class="figure-container">
  <div class="chart-container">
    <LayerCake
      {padding}
      x={xKey}
      y={yKey}
      data={sortedData}
      flatData={sortedData}
      xDomain={[-0.5, 1.2]}
      yDomain={[1.3, 2.3]}
    >
    <!-- xNice={true}
      yNice={true} -->
      <Svg>
        <Sectors />
        <AxisX {padding} formatTick={formatTick} ticks={[-0.5, 0, 1.2]} />
        <AxisY {padding} formatTick={formatTick} ticks={[1.3, 1.5, 1.6, 2.3]} />
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