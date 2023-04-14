<script>
  import { LayerCake, Svg, Canvas } from 'layercake';
  import { formatValue } from '$lib/utils/formatting';
  import { DEFAULT_FORMAT_UID } from '$src/config.js';

  import LineLayer from '../layers/LineLayer.svelte';
  import AxisX from '../axes/AxisX.svelte';
  import AxisY from '../axes/AxisY.svelte';
  import ColorMatrix from '../layers/ColorMatrix.svelte';
  import { getContext } from 'svelte';

  const theme = getContext('theme');

  export let distribution = [];
  export let mean = [];
  export let yearStep;
  export let valueStep;
  export let xKey = 'year';
  export let yKey = 'value';
  export let zKey = 'distribution';
  export let unit = DEFAULT_FORMAT_UID;

  const padding = { top: 0, right: 0, bottom: 15, left: 40 };

  let width = 0;
  let height = 0;
  $: chartWidth = width - padding.left - padding.right;
  $: chartHeight = height - padding.top - padding.bottom;
  $: xStepSize = chartWidth / distribution.length;
  $: yStepSize = chartHeight / distribution[0]?.length;

  $: formatTickY = (d) => formatValue(d, unit);

  $: flatData = distribution.reduce((acc, d) => {
    d.forEach((d) => acc.push(d));
    return acc;
  }, []);
</script>

<div
  class="chart-container"
  bind:clientWidth={width}
  bind:clientHeight={height}
>
  <LayerCake
    custom={{ xStep: yearStep, yStep: valueStep }}
    {padding}
    x={xKey}
    y={yKey}
    z={zKey}
    zRange={['white', $theme.color.category[0]]}
    xRange={[xStepSize / 2, chartWidth - xStepSize / 2]}
    yRange={[chartHeight - yStepSize / 2, yStepSize / 2]}
    data={mean}
    {flatData}
  >
    <Canvas>
      <ColorMatrix />
    </Canvas>
    <Svg>
      <AxisX showTickLines={false} ticks={5} />
      <AxisY showTickLines={false} ticks={4} formatTick={formatTickY} />
      <LineLayer color={$theme.color.background.base} strokeWidth={5} />
      <LineLayer color={$theme.color.category[0]} strokeWidth={3} />
    </Svg>
  </LayerCake>
</div>

<style lang="postcss">
  /*
    The wrapper div needs to have an explicit width and height in CSS.
    It can also be a flexbox child or CSS grid element.
    The point being it needs dimensions since the <LayerCake> element will
    expand to fill it.
  */
  .chart-container {
    width: 100%;
    height: 100%;
  }
</style>
