<script>
  import { Html, LayerCake, Svg } from 'layercake';
  import { DEFAULT_FORMAT_UID } from '$lib/../config.js';
  import { formatValue } from '$lib/utils/formatting';
  import AxisX from '../axes/AxisX.svelte';
  import AxisY from '../axes/AxisY.svelte';
  import Message from '../Message.svelte';
  import { scaleBand } from 'd3-scale';
  import RiskLevels from './RiskLevels.svelte';
  import { getContext } from 'svelte';
  import RiskLabels from './RiskLabels.svelte';

  export let data;
  export let xKey = 'year';
  export let yKey = 'value';
  export let unit = DEFAULT_FORMAT_UID;

  const theme = getContext('theme');

  $: formatTickY = (d) => formatValue(d, unit);
  $: formatTickX = (d) => (typeof d === 'string' ? d : formatValue(d, 'year'));

  const padding = { top: 5, right: 0, bottom: 20, left: 0 };

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
    {padding}
    yDomain={[0, 1]}
    xScale={scaleBand().paddingOuter(0.2).paddingInner(0.2)}
    flatData={flatten(data)}
  >
    <Svg>
      <AxisX gridlines={false} {padding} formatTick={formatTickX} />
      <AxisY formatTick={formatTickY} ticksHighlighted={[0, 1]} />
      <Message />
      <RiskLevels hatchingColor={$theme.color.foreground.weakest} />
    </Svg>
    <Html>
      <div class="labels">
        <RiskLabels />
      </div>
    </Html>
  </LayerCake>
</div>

<style lang="scss">
  .chart-container {
    width: 75%;
    height: 100%;
  }

  .labels {
    position: absolute;
    // Is contained within element that has 75% width of its parent but
    // needs to fill up the remaining 25% hence -> (100 - 75)/75 = 35.7
    width: 35.7%;
    left: 100%;
  }
</style>
