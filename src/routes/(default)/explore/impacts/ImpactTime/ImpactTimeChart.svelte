<script>
  import { Html, LayerCake, Svg } from 'layercake';
  import { formatValue } from '$lib/utils/formatting';
  import { DEFAULT_FORMAT_UID } from '$src/config.js';
  import MultipleLineLayer from '$lib/charts/layers/MultipleLineLayer.svelte';
  import AxisX from '$lib/charts/axes/AxisX.svelte';
  import AxisY from '$lib/charts/axes/AxisY.svelte';
  import MultipleAreaLayer from '$lib/charts/layers/MultipleAreaLayer.svelte';
  import BoxLayer from '$lib/charts/layers/BoxLayer.svelte';
  import { extent } from 'd3-array';
  import { scaleBand } from 'd3-scale';
  import ChartTooltips from './ChartTooltips.svelte';
  import { MEAN_TEMPERATURE_UID } from '$config';

  export let data = [];
  export let unit = DEFAULT_FORMAT_UID;
  export let ticksYHighlighted = [0];
  export let xTicks = 4;
  export let yTicks = 4;

  let xKey = 'year';
  let yKey = 'value';

  const mainChartPadding = { top: 20, right: 0, bottom: 30, left: 40 };
  const sideChartPadding = { ...mainChartPadding, right: 0, left: 20 };
  $: isMultiLine = data.length > 1;

  const formatGmt = (d) => formatValue(d, 'degrees-celsius');
  $: formatTickY = (d) => formatValue(d, unit);
  $: formatValueY = (d) => formatValue(d, unit, { addSuffix: false });

  $: flatData = data.reduce((memo, group) => {
    group.values.forEach(({ year, ...d }, i) => {
      // Get global mean temperature of scenario in this year
      const gmt = group[MEAN_TEMPERATURE_UID].data[i][1];
      ['min', 'max', 'value'].forEach((key) => {
        memo.push({
          year,
          formattedGmt: formatGmt(gmt),
          value: d[key],
          formattedValue: formatTickY(d[key]),
          key,
        });
      });
    });
    return memo;
  }, []);

  $: endBoundsData = data.map((group) => {
    return {
      ...group,
      uid: group.uid,
      ...group.values[group.values.length - 1],
    };
  });

  $: renderedDatapoints = isMultiLine
    ? flatData.filter((d) => d.key === 'value')
    : flatData;

  $: yDomain = extent(flatData, (d) => d.value);
  $: mainChartWidth = ['w-full', 'w-10/12', 'w-9/12'][data.length - 1];
  $: sideChartWidth = ['', 'w-2/12', 'w-3/12'][data.length - 1];
</script>

<div class="aspect-video flex">
  <div class:w-full={!isMultiLine} class="h-full {mainChartWidth}">
    <LayerCake
      padding={mainChartPadding}
      x={xKey}
      y={yKey}
      {yDomain}
      {data}
      {flatData}
      let:data
    >
      <Svg>
        <AxisX ticks={xTicks} />
        <AxisY
          padding={mainChartPadding}
          ticks={yTicks}
          xTick={-3}
          formatTick={formatTickY}
          ticksHighlighted={ticksYHighlighted}
        />
        <MultipleLineLayer animate={false} />
        {#if !isMultiLine}
          <MultipleAreaLayer />
        {/if}
      </Svg>
      <Html>
        <ChartTooltips
          data={renderedDatapoints}
          {formatGmt}
          formatValue={formatTickY}
        />
      </Html>
    </LayerCake>
  </div>
  {#if isMultiLine}
    <div class="h-full {sideChartWidth}">
      <LayerCake
        padding={sideChartPadding}
        x="uid"
        y={yKey}
        z="color"
        {yDomain}
        data={endBoundsData}
        xScale={scaleBand()}
      >
        <Svg>
          <AxisY
            padding={sideChartPadding}
            ticks={yTicks}
            {yDomain}
            xTick={-3}
            formatTick={formatTickY}
            ticksHighlighted={ticksYHighlighted}
            showTickLabels={false}
          />
          <BoxLayer formatValue={formatValueY} />
        </Svg>
      </LayerCake>
    </div>
  {/if}
</div>
