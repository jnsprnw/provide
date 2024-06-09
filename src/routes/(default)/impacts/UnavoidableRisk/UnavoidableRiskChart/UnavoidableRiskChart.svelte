<script>
  import { formatValue } from '$lib/utils/formatting';
  import { Html, LayerCake, Svg } from 'layercake';
  import { scaleBand } from 'd3-scale';
  import AxisX from '$lib/charts/axes/AxisX.svelte';
  import AxisY from '$lib/charts/axes/AxisY.svelte';
  import RiskLabels from './RiskLabels.svelte';
  import RiskLevels from './RiskLevels.svelte';
  import RiskRanges from './RiskRanges.svelte';

  export let data;
  export let xDomain;
  export let currentScenarios;

  const unit = 'percent';
  const xKey = 'year';
  const yKey = 'value';
  const padding = { top: 5, right: 0, bottom: 20, left: 42 };
  const yDomain = [0, 1];

  $: formatTickX = (d) => (typeof d === 'string' ? d : formatValue(d, 'year'));

  $: flatData = data.reduce((memo, group) => {
    return memo.concat(group.values);
  }, []);
</script>

<div class="h-full flex">
  <div class="h-full w-8/12">
    <LayerCake {data} x={xKey} y={yKey} {xDomain} {padding} {yDomain} xScale={scaleBand().paddingOuter(0.2).paddingInner(0.15)} {flatData}>
      <Svg>
        <AxisX showTickLines={false} {padding} formatTick={formatTickX} />
        <AxisY ticksHighlighted={yDomain} {unit} />
        <RiskRanges />
        <RiskLevels {currentScenarios} />
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
