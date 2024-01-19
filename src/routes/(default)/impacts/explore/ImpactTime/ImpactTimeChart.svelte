<script>
  import { LayerCake, Svg } from 'layercake';
  import { formatValue, findDecimalsForDistinctValues } from '$lib/utils/formatting';
  import { DEFAULT_FORMAT_UID } from '$src/config.js';
  import MultipleLineLayer from '$lib/charts/layers/MultipleLineLayer.svelte';
  import AxisX from '$lib/charts/axes/AxisX.svelte';
  import AxisY from '$lib/charts/axes/AxisY.svelte';
  import AreaLayer from '$lib/charts/layers/AreaLayer.svelte';
  import BoxLayer from '$lib/charts/layers/BoxLayer.svelte';
  import { extent } from 'd3-array';
  import { scaleBand } from 'd3-scale';
  import ChartPopover from './ChartPopover.svelte';
  import { flatMap } from 'lodash-es';
  import ColorLegend from '$lib/charts/legends/ColorLegend.svelte';
  import StrokeLegend from './StrokeLegend.svelte';

  export let steps;
  export let data = [];
  export let unit = DEFAULT_FORMAT_UID;
  export let indicatorLabel;
  export let ticksYHighlighted = [0];
  export let xTicks = 4;
  export let yTicks = 4;

  $: unitUID = unit?.uid ?? DEFAULT_FORMAT_UID;

  let xKey = 'year';
  let yKey = 'value';

  const mainChartPadding = { top: 20, right: 0, bottom: 30, left: 40 };
  const sideChartPadding = { ...mainChartPadding, right: 0, left: 20 };
  $: isMultiLine = data.length > 1;

  $: flatData = data.reduce((memo, scenario) => {
    scenario.values.forEach(({ year, gmt, wlvl, ...d }) => {
      // Get global mean temperature of scenario in this year
      ['min', 'max', 'value'].forEach((key) => {
        memo.push({
          year,
          gmt,
          wlvl,
          color: scenario.color,
          value: d[key],
          scenario: scenario.label,
        });
      });
    });
    return memo;
  }, []);

  $: requiredDecimalsForTooltips = findDecimalsForDistinctValues(
    flatData.map(({ value }) => value),
    unitUID,
    0,
    2
  );
  $: formatTooltipValueY = (d) => formatValue(d, unitUID, { decimals: requiredDecimalsForTooltips });

  $: colorScales = data.map((scenario) => scenario.colorInterpolator);

  // Data for the mean line (with coloring according to the GMT)
  $: lineData = data.reduce((memo, scenario, i) => {
    // Groups scenario values by warming level but makes sure they overlap
    // by one value and each change in warming level resuts in a new segment
    const gmtSegments = scenario.values.reduce((memo, d) => {
      const prevSegment = memo[memo.length - 1];
      const prevWlvl = prevSegment?.step; // We use the step to better identify the coloring
      if (prevWlvl !== d.step || !prevSegment) memo.push({ step: d.step, wlvl: d.wlvl, values: [d], scenario: scenario.label });
      if (prevSegment) prevSegment.values.push(d);
      return memo;
    }, []);

    gmtSegments.forEach(({ values, step, scenario }) => {
      const color = colorScales[i](step); // The step is used in the color scale
      memo.push({ color, step, values: values.map((d) => ({ ...d, color })), scenario });
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
      color: colorScales[i](entry.step),
      ...entry,
    };
  });

  $: requiredDecimalsForBoxplots = findDecimalsForDistinctValues(endBoundsData.map(({ value, min, max }) => [min, max, value]).flat());
  $: formatBoxplotValueY = (d) => formatValue(d, unitUID, { addSuffix: false, decimals: requiredDecimalsForBoxplots });

  // Data for generating popovers
  $: popoverData = (isMultiLine ? flatMap(lineData, (d) => d.values.map((v) => ({ ...v, scenario: d.scenario }))) : flatData).map((d) => ({
    ...d,
    formattedValue: `${formatTooltipValueY(d.value)}${unit?.label ? ` ${unit.label}` : ''}`,
    formattedGmt: d.gmt,
    label: indicatorLabel,
  }));

  $: yDomain = extent(flatData, (d) => d.value);
  $: mainChartWidth = ['w-full', 'w-10/12', 'w-9/12'][data.length - 1];
  $: sideChartWidth = ['', 'w-2/12', 'w-3/12'][data.length - 1];
</script>

<div class="flex items-center mb-5" class:justify-between={isMultiLine} class:justify-end={!isMultiLine}>
  {#if isMultiLine}<ColorLegend items={data} />{/if}
  <StrokeLegend {colorScales} scale={steps} />
</div>

<div class="aspect-[2] flex animate-defer-visibility">
  <div class:w-full={!isMultiLine} class="h-full {mainChartWidth}">
    <LayerCake padding={mainChartPadding} x={xKey} y={yKey} {yDomain} data={lineData} {flatData} let:data>
      <Svg>
        <AxisX ticks={xTicks} snapTicks={true} />
        <AxisY
          padding={mainChartPadding}
          axisLabel={indicatorLabel ? `${indicatorLabel}${unit?.label ? ` in ${unit.label}` : ''}` : undefined}
          ticks={yTicks}
          xTick={-3}
          ticksHighlighted={ticksYHighlighted}
        />
        {#if !isMultiLine}
          <AreaLayer data={areaData.values} color={areaData.color} />
        {/if}
        <MultipleLineLayer strokeWidth={4} animate={false} />
        <ChartPopover data={popoverData} />
      </Svg>
    </LayerCake>
  </div>
  {#if isMultiLine}
    <div class="h-full {sideChartWidth}">
      <LayerCake padding={sideChartPadding} x="uid" y={yKey} z="color" {yDomain} data={endBoundsData} xScale={scaleBand()}>
        <Svg>
          <AxisY padding={sideChartPadding} ticks={yTicks} {yDomain} xTick={-3} ticksHighlighted={ticksYHighlighted} showTickLabels={false} />
          <BoxLayer formatValue={formatBoxplotValueY} />
        </Svg>
      </LayerCake>
    </div>
  {/if}
</div>
