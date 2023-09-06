<script>
  import { LayerCake, Svg } from 'layercake';
  import { formatValue } from '$lib/utils/formatting';
  import { DEFAULT_FORMAT_UID } from '$src/config.js';
  import Dots from '../layers/Dots.svelte';
  import Sectors from './Sectors.svelte';
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

  $: sortedData = sortBy(data, ['highlight', 'isSelected']);
  export let hoveredSector;
</script>

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
      <AxisX
        {padding}
        formatTick={formatTickX}
        ticks={[-0.5, 0, 1.2]}
        gridClass="chart-gridline--invert"
      />
      <AxisY
        {padding}
        formatTick={formatTickY}
        ticks={[1.3, 1.5, 1.6, 2.3]}
        gridClass="chart-gridline--invert"
      />
      <Sectors bind:hoveredSector />
      <AxisXLabel {padding} label="Warming between 2050 and 2100" />
      <AxisYLabel {padding} label="Warming in 2050" />
      <Dots />
    </Svg>
  </LayerCake>
</div>

<style lang="postcss">
  .chart-container {
    width: 100%;
    height: 100%;
  }
</style>
