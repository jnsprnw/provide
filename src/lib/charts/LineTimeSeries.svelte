<script>
  import { LayerCake, Svg } from 'layercake';
  import { formatValue } from '$lib/utils/formatting';
  import { DEFAULT_FORMAT_UID } from '$lib/../config.js';
  import MultipleLineLayer from './layers/MultipleLineLayer.svelte';
  import AxisX from './axes/AxisX.svelte';
  import AxisY from './axes/AxisY.svelte';
  import { sortBy } from 'lodash-es';
  import Unit from '$lib/helper/chart-description/Unit.svelte';
  import MultipleAreaLayer from './layers/MultipleAreaLayer.svelte';

  export let data = [];
  export let xKey = 'year';
  export let yKey = 'value';
  export let unit = DEFAULT_FORMAT_UID;
  export let title;
  export let yDomain = undefined;
  export let ticksYHighlighted = [0];
  export let xTicks = 4;
  export let yTicks = 4;

  const padding = { top: 5, right: 10, bottom: 30, left: 40 };

  const flatten = (data) =>
    data.reduce((memo, group) => {
      group.values.forEach(({ min, value, max, year }) => {
        memo.push({ year, value: min });
        memo.push({ year, value });
        memo.push({ year, value: max });
      });
      return memo;
    }, []);

  $: formatTickY = (d) => formatValue(d, unit);

  $: sortedData = sortBy(data, ['highlight', 'isSelected']);
  $: isMultiLine = data.length > 1;
</script>

<div class="figure-container" class:hasTitle={title}>
  {#if title}
    <header>
      <h5 class="title-chart title-chart--title">{title}</h5>
      <small class="title-chart title-chart--small">in <Unit {unit} /></small>
    </header>
  {/if}
  <div class="chart-container">
    <LayerCake
      {padding}
      x={xKey}
      y={yKey}
      {yDomain}
      data={sortedData}
      flatData={flatten(data)}
    >
      <Svg>
        <AxisX ticks={xTicks} />
        <AxisY
          ticks={yTicks}
          xTick={-3}
          formatTick={formatTickY}
          ticksHighlighted={ticksYHighlighted}
        />

        <MultipleLineLayer />
        {#if !isMultiLine}
          <MultipleAreaLayer color={data[0].color} />
        {/if}
      </Svg>
    </LayerCake>
  </div>
</div>

<style lang="scss">
  .figure-container,
  .chart-container {
    width: 100%;
    height: 100%;
  }

  .figure-container {
    &.hasTitle {
      display: grid;
      grid-template-rows: auto 1fr;
      gap: var(--size-spacer-large-s);

      header {
        & > * {
          display: inline-block;
        }
      }
    }
  }
</style>
