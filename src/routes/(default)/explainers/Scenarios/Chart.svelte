<script>
  import LineChart from '$lib/charts/CorridorChart.svelte';
  import { MEAN_TEMPERATURE_UID, PATH_DOCUMENTATION } from '$config';
  import DefinitionItem from '$lib/helper/chart-description/DefinitionItem.svelte';

  export let scenarios = [];

  $: chartData = scenarios.map((scenario, n) => {
    const values = scenario[MEAN_TEMPERATURE_UID];
    const isHighlighted = false;
    return {
      ...scenario,
      values: isHighlighted ? values : values.map(({ year, value }) => ({ year, value })),
    };
  });
</script>

<div class="border-t border-contour-weaker pt-4">
  <p class="text-sm mb-2 font-bold">Global mean temperature in °C</p>
  <figure class="">
    <div class="h-48 mb-2">
      <LineChart
        yDomain={[1, null]}
        data={chartData}
      />
    </div>
    <figcaption class="text-xs text-contour-weak">
      <p class="mt-1 mb-2 text-contour-weaker">
        The lines in the graph represent best estimates. Learn more about uncertainties <a
          class="underline decoration-theme-weakest hover:decoration-theme-weaker"
          href="/{PATH_DOCUMENTATION}">here</a
        >.
      </p>
      <dl class="flex gap-4">
        <DefinitionItem
          term="Model"
          definition="FaIR v1.6.4"
        />
        <DefinitionItem
          term="Source"
          definition="Lamboll et al., 2022"
          href="https://essopenarchive.org/doi/full/10.1002/essoar.10511875.1"
        />
      </dl>
    </figcaption>
  </figure>
</div>
