<script>
  import { LayerCake, Svg } from 'layercake';
  import { formatValue } from '$lib/utils/formatting';
  import { DEFAULT_FORMAT_UID } from '$lib/../config.js';
  import Dots from '../layers/Dots.svelte';
  import Sectors from '../layers/Sectors.svelte';
  import AxisX from '../axes/AxisX.svelte';
  import AxisY from '../axes/AxisY.svelte';
  import { sortBy } from 'lodash-es';
  import AxisXLabel from '../axes/AxisXLabel.svelte';
  import AxisYLabel from '../axes/AxisYLabel.svelte';

  export let data = [];
  export let xKey = 'x';
  export let yKey = 'y';
  export let unitX = DEFAULT_FORMAT_UID;
  export let unitY = DEFAULT_FORMAT_UID;

  const padding = { top: 5, right: 15, bottom: 20, left: 40 };

  $: formatTickX = (d) => formatValue(d, unitX);
  $: formatTickY = (d) => formatValue(d, unitY);

  $: console.log({ unitX, formatTickX }, formatTickX(0.5))

  $: sortedData = sortBy(data, ['highlight', 'isSelected'])
  // This sorting is somewhat buggy.
  // $: sortedData = data.slice(0).sort((a, b) =>
  //   // First sort by `highlight`, then by `color`
  //   a.highlight && !b.highlight ? 1 : a.color && !b.color ? 1 : -1
  // );
  export let hoveredSector;
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
      <Svg>
        <Sectors bind:hoveredSector={hoveredSector} />
        <AxisXLabel {padding} label="Warming between 2050 and 2100" />
        <AxisYLabel {padding} label="Warming in 2050" />
        <AxisX {padding} formatTick={formatTickX} ticks={[-0.5, 0, 1.2]} gridClass="chart-grid--invert" />
        <AxisY {padding} formatTick={formatTickY} ticks={[1.3, 1.5, 1.6, 2.3]} gridClass="chart-grid--invert" />
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