<script>
	import { line, area, curveCardinal } from 'd3-shape';
	import { extent } from 'd3-array';
	import { scaleLinear } from 'd3-scale';
	import { flatten } from "lodash-es";
	import { CURRENT_GEOGRAPHY_UID, CURRENT_SCENARIOS_UID, CURRENT_GEOGRAPHY } from '$lib/../stores/store.js';
	import { IMPACT_TIME_CACHE } from "$lib/../stores/impact-time.js";
	import { handle } from "$lib/api/api.js";
	import { END_IMPACT_TIME } from "$lib/../config.js";

	export let indicator = '';

	$: uid = indicator.uid;

	$: datum = handle(END_IMPACT_TIME, "get", { geography: $CURRENT_GEOGRAPHY_UID, scenarios: $CURRENT_SCENARIOS_UID, indicator: uid }, $IMPACT_TIME_CACHE).map(response => {
		const { data, status } = response;
		if (status === 'success' && data) {
			return data.data[uid] || [];
		} else {
			return [];
		}
	})

	$: years = flatten(datum.map(scenario => scenario.map(([year]) => year)))

	$: values = flatten(flatten(datum.map(scenario => scenario.map(([, v1, v2, v3]) => [v1, v2, v3]))))

	let width = 10;
	let height = 10;

  $: x = scaleLinear()
	    .domain(extent(years))
	    .range([0, width]);

  $: y = scaleLinear()
    .domain(extent(values))
    .range([height, 0]);

  $: lineGenerator = line()
  	.curve(curveCardinal) // TODO: Probably without
    .x(d => x(d[0]))
    .y(d => y(d[1]));

  $: areaGenerator = area()
  	.curve(curveCardinal) // TODO: Probably without
    .x(d => x(d[0]))
    .y0(d => y(d[2]))
    .y1(d => y(d[3]));

	$: lines = datum.map(scenario => lineGenerator(scenario));
	$: areas = datum.map(scenario => areaGenerator(scenario));

	$: title = `This chart displays ${indicator?.label} in ${$CURRENT_GEOGRAPHY?.label} starting in year TODO until TODO`
</script>

<div class="line-chart--preview" bind:clientWidth={width} bind:clientHeight={height} {title}>
	<svg style={`width: ${width}px; height: ${height}px`}>
		{#if datum.length === 1}
		<g>
			{#each areas as area}
			<path d={area} class="chart-area" />
			{/each}
		</g>
		{/if}
		<g>
			{#each lines as line, i}
			<path d={line} class={`chart-line color-line-${i}`} />
			{/each}
		</g>
		<desc>
			{ JSON.stringify(indicator) }
			{ $CURRENT_GEOGRAPHY_UID }
			{ $CURRENT_SCENARIOS_UID }
			{ years }
			{ values }
			{ extent(years) }
			{ extent(values) }
			{ x.range() }
			{ y.range() }
			{ JSON.stringify(datum) }
		</desc>
	</svg>
</div>

<style lang="scss">
	.line-chart--preview {
		width: 100%;
		height: 100%;

		.chart-line {
			fill: none;
			// stroke: var(--color-light-blue700); // TODO

			&.color-line-0 {
	      stroke: var(--color-light-category-0);
	    }
	    &.color-line-1 {
	      stroke: var(--color-light-category-1);
	    }
	    &.color-line-2 {
	      stroke: var(--color-light-category-2);
	    }
		}

		.chart-area {
			fill: var(--color-light-blue300); // TODO
			stroke: none;
		}
	}
</style>