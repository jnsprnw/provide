<script>
  import { line, area, curveCardinal } from 'd3-shape';
  import { extent } from 'd3-array';
  import { scaleLinear } from 'd3-scale';
  import { flatten } from 'lodash-es';
  import {
    CURRENT_GEOGRAPHY_UID,
    CURRENT_SCENARIOS_UID,
    CURRENT_SCENARIOS,
    CURRENT_GEOGRAPHY,
  } from '$lib/../stores/store.js';
  import { IMPACT_TIME_CACHE } from '$lib/../stores/impact-time.js';
  import { handle } from '$lib/api/api.js';
  import { END_IMPACT_TIME } from '$lib/../config.js';

  export let indicator = '';

  $: uid = indicator.uid;

  $: datum = handle(
    END_IMPACT_TIME,
    'get',
    {
      geography: $CURRENT_GEOGRAPHY_UID,
      scenarios: $CURRENT_SCENARIOS_UID,
      indicator: uid,
    },
    $IMPACT_TIME_CACHE
  ).map((response, i) => {
    const { data, status } = response;
    const color = $CURRENT_SCENARIOS[i].color;
    if (status === 'success' && data) {
      return { color, values: data.data[uid] || [] };
    } else {
      return { color, values: [] };
    }
  });

  $: years = flatten(
    datum.map((scenario) => scenario.values.map(([year]) => year))
  );

  $: values = flatten(
    flatten(
      datum.map((scenario) =>
        scenario.values.map(([, v1, v2, v3]) => [v1, v2, v3])
      )
    )
  );

  let width = 10;
  let height = 10;

  $: x = scaleLinear().domain(extent(years)).range([0, width]);

  $: y = scaleLinear().domain(extent(values)).range([height, 0]);

  $: lineGenerator = line()
    .curve(curveCardinal) // TODO: Probably without
    .x((d) => x(d[0]))
    .y((d) => y(d[1]));

  $: areaGenerator = area()
    .curve(curveCardinal) // TODO: Probably without
    .x((d) => x(d[0]))
    .y0((d) => y(d[2]))
    .y1((d) => y(d[3]));

  $: title = indicator.description; // `This chart displays ${indicator?.label} in ${$CURRENT_GEOGRAPHY?.label} starting in year TODO until TODO`;
</script>

<div
  class="line-chart--preview"
  bind:clientWidth={width}
  bind:clientHeight={height}
  {title}
>
  <svg style={`width: ${width}px; height: ${height}px`}>
    <g>
      {#if datum.length === 1}
        <path
          d={areaGenerator(datum[0].values)}
          style={`fill: ${datum[0].color}`}
          class="chart-area"
        />
      {/if}
      {#each datum as d, i}
        <path
          d={lineGenerator(d.values)}
          style={`stroke: ${d.color}`}
          class="chart-line"
        />
      {/each}
    </g>
    <desc>
      {JSON.stringify(indicator)}
      {$CURRENT_GEOGRAPHY_UID}
      {$CURRENT_SCENARIOS_UID}
      {years}
      {values}
      {extent(years)}
      {extent(values)}
      {x.range()}
      {y.range()}
      {JSON.stringify(datum.values)}
    </desc>
  </svg>
</div>

<style lang="scss">
  .line-chart--preview {
    width: 100%;
    height: 100%;
  }

  .chart-line {
    fill: none;
  }

  .chart-area {
    opacity: 0.3;
    stroke: none;
  }
</style>
