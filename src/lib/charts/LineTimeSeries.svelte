<script>
  import { Html, LayerCake, Svg } from 'layercake';
  import { formatValue } from '$lib/utils/formatting';
  import { DEFAULT_FORMAT_UID } from '$lib/../config.js';
  import MultipleLineLayer from './layers/MultipleLineLayer.svelte';
  import AxisX from './axes/AxisX.svelte';
  import AxisY from './axes/AxisY.svelte';
  import { getContext } from 'svelte';

  const theme = getContext('theme');

  export let data = [];
  export let xKey = 'year';
  export let yKey = 'value';
  export let unit = DEFAULT_FORMAT_UID;
  export let title;

  // TODO: Get unit label

  const padding = { top: 0, right: 20, bottom: 20, left: 20 };

  const flatten = (data) =>
    data.reduce((memo, group) => {
      return memo.concat(group.values);
    }, []);

  $: formatTickY = (d) => formatValue(d, unit);

  $: sortedData = data.slice(0).sort((a, b) =>
    // First sort by `highlight`, then by `color`
    a.highlight && !b.highlight ? 1 : a.color && !b.color ? 1 : -1
  );
</script>

<div class="figure-container">
  <header>
    <h5 class="title-chart title-chart--title">{title}</h5> <small class="title-chart title-chart--small">in {unit}</small>
  </header>
  <div class="chart-container">
    <LayerCake
      {padding}
      x={xKey}
      y={yKey}
      data={sortedData}
      flatData={flatten(sortedData)}
    >
      <Svg>
        <AxisX
          gridlines={false}
          ticks={6}
          padding={{ top: 10, left: 0, right: 0 }}
        />
        <AxisY ticks={4} xTick={-3} formatTick={formatTickY} />
        <MultipleLineLayer />
      </Svg>
    </LayerCake>
  </div>
</div>

<style lang="scss">
  .figure-container, .chart-container {
    width: 100%;
    height: 100%;
  }

  .figure-container {
    display: grid;
    grid-template-rows: auto 1fr;
    gap: var(--size-spacer-large-s);

    header {
      & > * {
        display: inline-block
      }
    }
  }
</style>
