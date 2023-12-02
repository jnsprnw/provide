<script>
  import { LayerCake, Svg } from 'layercake';
  import { formatValue } from '$lib/utils/formatting';
  import { DEFAULT_FORMAT_UID } from '$src/config.js';
  import MultipleLineLayer from '$lib/charts/layers/MultipleLineLayer.svelte';
  import AxisX from '$lib/charts/axes/AxisX.svelte';
  import AxisY from '$lib/charts/axes/AxisY.svelte';
  import AreaLayer from '$lib/charts/layers/AreaLayer.svelte';
  import BoxLayer from '$lib/charts/layers/BoxLayer.svelte';
  import { extent, max, min } from 'd3-array';
  import { scaleBand, scaleSequential } from 'd3-scale';
  import ChartPopover from './ChartPopover.svelte';
  import { flatMap } from 'lodash-es';
  import ColorLegend from '$lib/charts/legends/ColorLegend.svelte';
  import StrokeLegend from './StrokeLegend.svelte';

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
    scenario.values.forEach(({ year, gmt, wlvl, ...d }, i) => {
      // Get global mean temperature of scenario in this year
      ['min', 'max', 'value'].forEach((key) => {
        memo.push({
          year,
          gmt,
          wlvl,
          color: scenario.color,
          value: d[key],
        });
      });
    });
    return memo;
  }, []);

  // Calculate warming level extent to create color scale
  $: minWlvl = min(data, (scenario) => min(scenario.values, (d) => d.wlvl));
  $: maxWlvl = max(data, (scenario) => max(scenario.values, (d) => d.wlvl));
  $: colorScales = data.map((scenario) => scaleSequential(scenario.colorInterpolator).domain([minWlvl, 3]));

  // Data for the mean line
  $: lineData = data.reduce((memo, scenario, i) => {
    // Groups scenario values by warming level but makes sure they overlap
    // by one value and each change in warming level resuts in a new segment
    const gmtSegments = scenario.values.reduce((memo, d) => {
      const prevSegment = memo[memo.length - 1];
      const prevWlvl = prevSegment?.wlvl;
      if (prevWlvl !== d.wlvl || !prevSegment) memo.push({ wlvl: d.wlvl, values: [d] });
      if (prevSegment) prevSegment.values.push(d);
      return memo;
    }, []);

    gmtSegments.forEach(({ wlvl, values }) => {
      const color = colorScales[i](wlvl);
      memo.push({ color, values: values.map((d) => ({ ...d, color })) });
    });
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

  // Data for generating popovers
  $: popoverData = (isMultiLine ? flatMap(lineData, (d) => d.values) : flatData).map((d) => ({
    ...d,
    formattedValue: formatTickY(d.value),
    formattedGmt: formatGmt(d.gmt),
  }));

  $: yDomain = extent(flatData, (d) => d.value);
  $: mainChartWidth = ['w-full', 'w-10/12', 'w-9/12'][data.length - 1];
  $: sideChartWidth = ['', 'w-2/12', 'w-3/12'][data.length - 1];
</script>

<div class="flex items-center" class:justify-between={isMultiLine} class:justify-end={!isMultiLine}>
  {#if isMultiLine}<ColorLegend items={data} />{/if}
  <StrokeLegend {colorScales} />
</div>

<div class="aspect-[2] flex animate-defer-visibility">
  <div class:w-full={!isMultiLine} class="h-full {mainChartWidth}">
    <LayerCake padding={mainChartPadding} x={xKey} y={yKey} {yDomain} data={lineData} {flatData} let:data>
      <Svg>
        <AxisX ticks={xTicks} />
        <AxisY padding={mainChartPadding} ticks={yTicks} xTick={-3} formatTick={formatTickY} ticksHighlighted={ticksYHighlighted} />
        <MultipleLineLayer strokeWidth={4} animate={false} />
        {#if !isMultiLine}
          <AreaLayer data={areaData.values} color={areaData.color} />
        {/if}
        <ChartPopover data={popoverData} />
      </Svg>
    </LayerCake>
  </div>
  {#if isMultiLine}
    <div class="h-full {sideChartWidth}">
      <LayerCake padding={sideChartPadding} x="uid" y={yKey} z="color" {yDomain} data={endBoundsData} xScale={scaleBand()}>
        <Svg>
          <AxisY padding={sideChartPadding} ticks={yTicks} {yDomain} xTick={-3} formatTick={formatTickY} ticksHighlighted={ticksYHighlighted} showTickLabels={false} />
          <BoxLayer formatValue={formatValueY} />
        </Svg>
      </LayerCake>
    </div>
  {/if}
</div>
