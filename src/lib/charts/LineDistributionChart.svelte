<script>
  import { LayerCake, Svg, Canvas, Html } from 'layercake';
  import { formatValue } from '$lib/utils/formatting';
  import { DEFAULT_FORMAT_UID } from '$lib/../config.js';

  import LineLayer from './layers/LineLayer.svelte';
  import AxisX from './axes/AxisX.svelte';
  import AxisY from './axes/AxisY.svelte';
  import { extent } from 'd3-array';
  import ColorMatrix from './layers/ColorMatrix.svelte';
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

  const padding = { top: 5, right: 10, bottom: 20, left: 40 };

  $: formatTickY = (d) => formatValue(d, unit);

  $: flatData = distribution
    .reduce((acc, d) => {
      d.forEach((d) => acc.push(d));
      return acc;
    }, [])
    .filter((d) => d.distribution > 0.001); // TODO: This is only for now since we don't need all the tiny values in the grid
</script>

<div class="chart-container">
  <LayerCake
    custom={{ xStep: yearStep, yStep: valueStep }}
    {padding}
    x={xKey}
    y={yKey}
    z={zKey}
    zRange={['white', $theme.color.category[0]]}
    data={mean}
    {flatData}
  >
    <Canvas>
      <ColorMatrix />
    </Canvas>
    <Svg>
      <AxisX
        gridlines={false}
        ticks={6}
        {padding}
      />
      <AxisY ticks={4} xTick={-3} formatTick={formatTickY} {padding} />
      <LineLayer color={$theme.color.background.base} strokeWidth={5} />
      <LineLayer color={$theme.color.category[0]} strokeWidth={3} />
    </Svg>
  </LayerCake>
</div>

<style lang="scss">
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
