<script>
  import { LayerCake, Svg } from 'layercake';
  import { formatValue } from '$lib/utils/formatting';
  import MultipleLineLayer from './layers/MultipleLineLayer.svelte';
  import AxisX from './axes/AxisX.svelte';
  import AxisY from './axes/AxisY.svelte';
  import { sortBy } from 'lodash-es';
  import MultipleAreaLayer from './layers/MultipleAreaLayer.svelte';
  import { getContext } from 'svelte';

  export let data = [];
  export let xKey = 'year';
  export let yKey = 'value';
  export let unit;
  export let yDomain = undefined;
  export let ticksYHighlighted = [0];
  export let xTicks = 4;
  export let yTicks = 2;

  $: theme = getContext('theme');

  const padding = { top: 10, right: 0, bottom: 20, left: 30 };

  $: flatData = data
    .reduce((memo, group) => {
      group.values.forEach(({ value, min, max, year }) => {
        memo.push({ year, value });
        memo.push({ year, value: min });
        memo.push({ year, value: max });
      });
      return memo;
    }, [])
    .filter((d) => d.value !== undefined);

  $: formatTickY = (d) => formatValue(d, unit);
  $: chartData = sortBy(data, ['isHighlighted', 'isSelected']).map((series) => {
    let color = series.isHighlighted
      ? $theme.color.foreground.weak
      : $theme.color.foreground.weaker;
    let opacity = series.isHighlighted ? 1 : 0.5;
    return {
      ...series,
      color: series.color || color,
      opacity,
    };
  });
</script>

<div class="w-full h-full animate-defer-visibility overflow-hidden">
  <LayerCake {padding} x={xKey} y={yKey} {yDomain} data={chartData} {flatData}>
    <Svg>
      <AxisX showTickLines={false} ticks={xTicks} />
      <AxisY
        {padding}
        ticks={yTicks}
        xTick={-3}
        formatTick={formatTickY}
        ticksHighlighted={ticksYHighlighted}
      />
      <MultipleLineLayer strokeWidth={2.5} />
      <MultipleAreaLayer />
    </Svg>
  </LayerCake>
</div>
