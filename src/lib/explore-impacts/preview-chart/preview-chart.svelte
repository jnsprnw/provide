<script>
	import { line, area, curveCardinal } from 'd3-shape';
	import { extent } from 'd3-array';
	import { scaleLinear } from 'd3-scale';
	import { flatten } from "lodash-es";
	import { get } from "lodash-es";
	import { IMPACT_TIME_DATA, CURRENT_GEOGRAPHY_UID, CURRENT_SCENARIOS_UID, CURRENT_GEOGRAPHY } from '$lib/../stores/store.js';

	export let indicator = '';

	function buildDatum(data, scenarios, geography, indicator) {
		return scenarios.map(scenario => {
			const datum = get(data, [scenario, geography, indicator?.uid, 'data']);
			if (datum) {
				return datum;
			} else {
				return [[null, null, null, null]]
			}
		})
	}

	$: data = buildDatum($IMPACT_TIME_DATA, $CURRENT_SCENARIOS_UID, $CURRENT_GEOGRAPHY_UID, indicator)

	$: years = flatten(data.map(year => year.map(d => d[0])))

	$: values = flatten(flatten(data.map(year => year.map(([, v1, v2, v3]) => [v1, v2, v3]))))

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

	$: lines = data.map(scenario => lineGenerator(scenario));
	$: areas = data.map(scenario => areaGenerator(scenario));

	$: title = `This chart displays ${indicator?.label} in ${$CURRENT_GEOGRAPHY?.label} starting in year TODO until TODO`
</script>

<div class="line-chart--preview" bind:clientWidth={width} bind:clientHeight={height} {title}>
	<svg style={`width: ${width}px; height: ${height}px`}>
		{#if data.length === 1}
		{#each areas as area}
		<path d={area} class="chart-area" />
		{/each}
		{/if}
		{#each lines as line, i}
		<path d={line} class={`chart-line color-line-${i}`} />
		{/each}
		<desc>
			{ JSON.stringify(indicator) } { $CURRENT_GEOGRAPHY_UID } { $CURRENT_SCENARIOS_UID }
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