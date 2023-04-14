<script>
  import { LayerCake, Svg } from 'layercake';
  import { formatValue } from '$lib/utils/formatting';
  import { DEFAULT_FORMAT_UID } from '$src/config.js';
  import MultipleLineLayer from '$lib/charts/layers/MultipleLineLayer.svelte';
  import AxisX from '$lib/charts/axes/AxisX.svelte';
  import AxisY from '$lib/charts/axes/AxisY.svelte';
  import MultipleAreaLayer from '$lib/charts/layers/MultipleAreaLayer.svelte';
  import BoxLayer from '$lib/charts/layers/BoxLayer.svelte';
  import { extent, min } from 'd3-array';
  import { scaleBand } from 'd3-scale';

  export let data = [];
  export let unit = DEFAULT_FORMAT_UID;
  export let ticksYHighlighted = [0];
  export let xTicks = 4;
  export let yTicks = 4;

  let xKey = 'year';
  let yKey = 'value';

  const mainChartPadding = { top: 20, right: 0, bottom: 30, left: 40 };
  const sideChartPadding = { ...mainChartPadding, right: 0, bottom: 30 };

  $: flatData = data.reduce((memo, group) => {
    group.values.forEach(({ min, value, max, year }) => {
      memo.push({ year, value: min });
      memo.push({ year, value });
      memo.push({ year, value: max });
    });
    return memo;
  }, []);

  $: formatTickY = (d) => formatValue(d, unit);
  $: endBoundsData = data.map((group) => {
    return {
      ...group,
      id: group.scenario.uid,
      ...group.values[group.values.length - 1],
    };
  });

  $: yDomain = extent(flatData, (d) => d.value);

  $: xDomainBoxes = endBoundsData.map((d) => d.id);
  $: isMultiLine = data.length > 1;
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
          <MultipleAreaLayer color={data[0].color} />
        {/if}
      </Svg>
    </LayerCake>
  </div>
  <div class="h-full {sideChartWidth}">
    <LayerCake
      padding={sideChartPadding}
      x="id"
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
        <BoxLayer />
      </Svg>
    </LayerCake>
  </div>
</div>
