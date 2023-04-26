<script>
  import { UNAVOIDABLE_UID } from '$src/config';
  import { getContext } from 'svelte';
  import { forceSimulation, forceX, forceY, forceCollide } from 'd3-force';
  import tooltip from '$lib/utils/tooltip';
  import tooltipTemplate from './tooltip-template.html?raw';
  import renderTemplate from '$lib/utils/renderTemplate';

  const { data, xScale, yGet, height, xGet, yScale } = getContext('LayerCake');

  const radius = 8;

  // Sort array to have active scenarios at top
  $: scenarios = $data
    .filter((d) => d.uid !== UNAVOIDABLE_UID)
    .sort((a, b) => Boolean(a.color) - Boolean(b.color));

  $: nodes = scenarios
    .map(({ values, label: scenario, color }) => {
      const isSelectedScenario = Boolean(color);
      return values.map(({ year, value, formattedValue }) => {
        return {
          year,
          value,
          formattedValue,
          scenario,
          color,
          isSelectedScenario,
          radius: radius - (isSelectedScenario ? 0 : 2), // The scelected scenarios are slightly bigger
          fy: isSelectedScenario ? $yScale(value) : undefined, // Fix the y-position of selected scenarios
          tooltipContent: renderTemplate(tooltipTemplate, {
            year,
            formattedValue,
            scenario,
          }),
        };
      });
    })
    .flat();

  $: middle = $xScale.bandwidth() / 2;

  $: simulation = forceSimulation(nodes)
    .force(
      'x',
      forceX()
        .x((d) => $xGet(d) + middle)
        .strength(0.1)
    )
    .force(
      'y',
      forceY()
        .y((d) => $yGet(d))
        .strength(0.98)
    )
    .force('collide', forceCollide(radius + 1))
    .stop();

  $: {
    for (
      let i = 0,
        n = Math.ceil(
          Math.log(simulation.alphaMin()) /
            Math.log(1 - simulation.alphaDecay())
        );
      i < n;
      ++i
    ) {
      simulation.tick();
    }
  }
</script>

{#if $height > 0}
  <g>
    {#each simulation.nodes() as { x, y, color, isSelectedScenario, tooltipContent, radius, scenario }}
      <g
        style="transform: translate({x}px, {Math.min(y, $height)}px);"
        class="transition-transform"
        class:opacity-80={!isSelectedScenario}
      >
        <circle
          class:fill-background-weakest={!isSelectedScenario}
          class="stroke-[1.5px] stroke-background-base"
          style={`fill: ${color};`}
          r={radius}
          use:tooltip={{ content: tooltipContent }}
        >
          <title>{scenario}</title>
        </circle>
      </g>
    {/each}
  </g>
{/if}
