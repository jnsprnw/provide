<script>
  import { Html, LayerCake, Svg } from 'layercake';
  import { formatValue } from '$lib/utils/formatting';
  import { DEFAULT_FORMAT_UID } from '$src/config.js';
  import MultipleLineLayer from '$lib/charts/layers/MultipleLineLayer.svelte';
  import AxisX from '$lib/charts/axes/AxisX.svelte';
  import AxisY from '$lib/charts/axes/AxisY.svelte';
  import AreaLayer from '$lib/charts/layers/AreaLayer.svelte';
  import BoxLayer from '$lib/charts/layers/BoxLayer.svelte';
  import { extent, groups, max, min, range } from 'd3-array';
  import { scaleBand, scaleLinear, scaleSequential } from 'd3-scale';
  import ChartTooltips from './ChartTooltips.svelte';

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

  $: flatData = data.reduce((memo, scenario) => {
    scenario.values.forEach(({ year, gmt, ...d }, i) => {
      // Get global mean temperature of scenario in this year
      ['min', 'max', 'value'].forEach((key) => {
        memo.push({
          year,
          color: scenario.color,
          formattedGmt: formatGmt(gmt),
          value: d[key],
          formattedValue: formatTickY(d[key]),
          key,
        });
      });
    });
    return memo;
  }, []);

  $: minWlvl = min(data, (scenario) => min(scenario.values, (d) => d.wlvl));
  $: maxWlvl = max(data, (scenario) => max(scenario.values, (d) => d.wlvl));
  $: wlvlExtent = [minWlvl, maxWlvl];
  $: colorScales = data.map((scenario) =>
    scaleSequential(scenario.colorInterpolator).domain(wlvlExtent)
  );

  // Data for the mean line
  $: lineData = data.reduce((memo, scenario, i) => {
    // Groups scenario values by warming level but makes sure they overlap
    // by one value and each change in warming level resuts in a new segment
    const gmtSegments = scenario.values.reduce((memo, d) => {
      const prevSegment = memo[memo.length - 1];
      const prevWlvl = prevSegment?.wlvl;
      if (prevWlvl !== d.wlvl || !prevSegment)
        memo.push({ wlvl: d.wlvl, values: [d] });
      if (prevSegment) prevSegment.values.push(d);
      return memo;
    }, []);

    gmtSegments.forEach(({ wlvl, values }) =>
      memo.push({ color: colorScales[i](wlvl), values })
    );
    return memo;
  }, []);

  // Data for area chart
  $: areaData = data[0];

  // Data for boxplots
  $: endBoundsData = data.map((scenario, i) => {
    const entry = scenario.values[scenario.values.length - 1];
    return {
      ...scenario,
      uid: scenario.uid,
      color: colorScales[i](entry.wlvl),
      ...entry,
    };
  });

  // Data for generating tooltips
  $: tooltipData = isMultiLine
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
      data={lineData}
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
          <AreaLayer data={areaData.values} color={areaData.color} />
        {/if}
        <ChartTooltips data={tooltipData} />
      </Svg>
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
