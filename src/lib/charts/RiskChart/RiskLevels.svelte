<script>
  import { UNAVOIDABLE_UID } from '$src/config';
  import { getContext } from 'svelte';
  import { forceSimulation, forceX, forceY, forceCollide } from 'd3-force';

  const { data, xScale, yGet, height, xGet, yScale } = getContext('LayerCake');

  const radius = 8;

  // Sort array to have active scenarios at top
  $: scenarios = $data.filter((d) => d.uid !== UNAVOIDABLE_UID).sort((a, b) => Boolean(a.color) - Boolean(b.color));

  $: nodes = scenarios.map(({ values, label: scenarioLabel, color }) => {
    const isSelectedScenario = Boolean(color);
    return values.map(({ year, value, formattedValue }) => {
      return {
        year,
        value,
        formattedValue,
        scenario: scenarioLabel,
        color,
        isSelectedScenario,
        radius: radius - (isSelectedScenario ? 0 : 2), // The scelected scenarios are slightly bigger
        fy: isSelectedScenario ? $yScale(value) : undefined // Fix the y-position of selected scenarios
      }
    })
  }).flat();

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
    for (let i = 0, n = Math.ceil(Math.log(simulation.alphaMin()) / Math.log(1 - simulation.alphaDecay())); i < n; ++i) {
      simulation.tick();
    }
  }
</script>

{#if $height > 0}
  <g>
    {#each simulation.nodes() as { x, y, color, isSelectedScenario, radius, scenario }}
      <g style="transform: translate({x}px, {y}px);" class="transition-transform" class:opacity-70={!isSelectedScenario}>
        <circle
          class="opacity-50 stroke-[4px] stroke-background-base"
          r={radius}
        />
        <circle
          class:fill-background-weakest={!isSelectedScenario}
          style={`fill: ${color};`}
          r={radius}
        >
          <title>{ scenario }</title>
        </circle>
      </g>
    {/each}
  </g>
{/if}
