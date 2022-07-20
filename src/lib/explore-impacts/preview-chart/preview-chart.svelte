<script>
	import { line, area, curveCardinal } from 'd3-shape';
	import { min, max } from 'd3-array';
	import { scaleLinear } from 'd3-scale';
	import { range } from "lodash-es";

	import { CURRENT_GEOGRAPHY } from '$lib/../stores/store.js';
	export let indicator = '';

	let value = 0;
	const data = range(20).map(d => {
		value += Math.random() * 10;
		const min = value - Math.random() * 50;
		const max = value + Math.random() * 50;
		return {
			date: 2000 + d,
			value,
			min,
			max
		}
	})

	let width = 10;
	let height = 10;

  $: x = scaleLinear()
	    .domain([2000, 2020])
	    .range([0, width]);

  $: y = scaleLinear()
    .domain([min(data.map(({ min }) => min)), max(data.map(({ max }) => max))])
    .range([height, 0]);

  $: lineGenerator = line()
  	.curve(curveCardinal) // TODO: Probably without
    .x(d => x(d.date))
    .y(d => y(d.value));

  $: areaGenerator = area()
  	.curve(curveCardinal) // TODO: Probably without
    .x(d => x(d.date))
    .y0(d => y(d.min))
    .y1(d => y(d.max));

	$: dLine = lineGenerator(data);
	$: dArea = areaGenerator(data);

	$: title = `This chart displays ${indicator?.label} in ${$CURRENT_GEOGRAPHY?.label} starting in year TODO until TODO`
</script>

<div class="line-chart--preview" bind:clientWidth={width} bind:clientHeight={height} {title}>
	<svg style={`width: ${width}px; height: ${height}px`}>
		<path d={dArea} class="chart-area" />
		<path d={dLine} class="chart-line" />
		<desc>
			{ title }
		</desc>
	</svg>
</div>

<style lang="scss">
	.line-chart--preview {
		width: 100%;
		height: 100%;

		.chart-line {
			fill: none;
			stroke: var(--color-light-blue700); // TODO
		}

		.chart-area {
			fill: var(--color-light-blue300); // TODO
			stroke: none;
		}
	}
</style>