<script>
  import { DEFAULT_FORMAT_UID } from '$src/config.js';
  import { formatValue } from '$lib/utils/formatting';
  import { Html, LayerCake, Svg } from 'layercake';
  import { scaleBand } from 'd3-scale';
  import AxisX from '$lib/charts/axes/AxisX.svelte';
  import AxisY from '$lib/charts/axes/AxisY.svelte';
  import Message from '$lib/charts/Message.svelte';
  import RiskLabels from './RiskLabels.svelte';
  import RiskLevels from './RiskLevels.svelte';
  import RiskRanges from './RiskRanges.svelte';

  export let data;
  export let xKey = 'year';
  export let yKey = 'value';
  export let unit = DEFAULT_FORMAT_UID;

  $: formatTickY = (d) => formatValue(d, unit);
  $: formatTickX = (d) => (typeof d === 'string' ? d : formatValue(d, 'year'));

  const padding = { top: 5, right: 0, bottom: 20, left: 0 };
  $: flatData = data.reduce((memo, group) => {
    return memo.concat(group.values);
  }, []);
</script>

<div class="h-full flex">
  <div class="h-full w-8/12">
    <LayerCake
      {data}
      x={xKey}
      y={yKey}
      {padding}
      yDomain={[0, 1]}
      xScale={scaleBand().paddingOuter(0.2).paddingInner(0.15)}
      {flatData}
    >
      <Svg>
        <AxisX showTickLines={false} {padding} formatTick={formatTickX} />
        <AxisY formatTick={formatTickY} ticksHighlighted={[0, 1]} />
        <!-- <Message /> -->
        <RiskRanges />

        <RiskLevels />
      </Svg>
    </LayerCake>
  </div>
  <div class="h-full w-4/12">
    <LayerCake {padding} {data} x={xKey} y={yKey} yDomain={[0, 1]} {flatData}>
      <Html>
        <RiskLabels />
      </Html>
    </LayerCake>
  </div>
</div>
