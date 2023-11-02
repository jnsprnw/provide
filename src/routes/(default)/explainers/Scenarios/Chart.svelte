<script>
  import LineChart from '$lib/charts/CorridorChart.svelte';

  export let scenarios = [];
  export let variable;
  export let title;
  export let yDomain = [1, null];

  $: chartData = scenarios.map((scenario) => {
    const values = scenario[variable] ?? [];
    const isHighlighted = false;
    return {
      ...scenario,
      values: isHighlighted ? values : values.map(({ year, value }) => ({ year, value })),
    };
  });
</script>

<div class="border-t border-contour-weaker pt-4">
  <p class="text-sm mb-2 font-bold">{title}</p>
  <figure>
    <div class="h-48 mb-2">
      <LineChart
        {yDomain}
        data={chartData}
      />
    </div>
    <figcaption class="text-xs text-contour-weak">
      <slot />
    </figcaption>
  </figure>
</div>
