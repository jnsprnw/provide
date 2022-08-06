<script>
  import { LayerCake, Svg } from 'layercake';
  import { formatValue } from '$lib/utils/formatting';
  import { DEFAULT_FORMAT_UID } from '$lib/../config.js';
  import { scaleOrdinal } from 'd3-scale';

  import MultipleLineLayer from './layers/MultipleLineLayer.svelte';
  import AxisX from './axes/AxisX.svelte';
  import AxisY from './axes/AxisY.svelte';
  import { getContext } from 'svelte';

  const theme = getContext('theme');

  export let data = [];
  // export let yearStep;
  // export let valueStep;
  export let xKey = 'year';
  export let yKey = 'value';
  export let zKey = 'stroke';
  export let unit = DEFAULT_FORMAT_UID;

  const padding = { top: 0, right: 20, bottom: 20, left: 20 };

  const flatten = (data) =>
    data.reduce((memo, group) => {
      return memo.concat(group.values);
    }, []);

  $: formatTickY = (d) => formatValue(d, unit);
</script>

<div class="chart-container">
  <LayerCake
    {padding}
    x={xKey}
    y={yKey}
    z={zKey}
    zScale={scaleOrdinal()}
    zDomain={[
      'category-3-disabled',
      'category-1-hovered',
      'category-2-0',
      'category-2-1',
      'category-2-2',
    ]}
    zRange={[
      $theme.color.petrol100,
      'red',
      $theme.color.category[0],
      $theme.color.category[1],
      $theme.color.category[2],
    ]}
    {data}
    flatData={flatten(data)}
  >
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
