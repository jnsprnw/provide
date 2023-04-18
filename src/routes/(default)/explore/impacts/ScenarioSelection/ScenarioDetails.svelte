<script>
  import LineChart from '$lib/charts/CorridorChart.svelte';
  import { MEAN_TEMPERATURE_UID } from '$config';

  export let scenarios;
  export let scenario;

  $: chartData = scenarios.map((scenario) => {
    const values = scenario[MEAN_TEMPERATURE_UID];
    return {
      ...scenario,
      values: scenario.isHighlighted
        ? values
        : values.map(({ year, value }) => ({ year, value })),
    };
  });
</script>

<h3 class="text-lg font-bold">{scenario.label}</h3>
<div class="mb-4">
  <p class="text-sm text-foreground-weak">
    Source: <a
      href={scenario.source.href}
      target="_blank"
      rel="noreferrer"
      class="text-theme-base">{scenario.source.label}</a
    >
  </p>
  <p class="text-sm text-foreground-weak mb-4">
    Model: <span class="text-foreground-base">{scenario.model}</span>
  </p>
</div>
<p class="text-foreground-weak">
  {scenario.description || 'Description missing'}
</p>
{#if scenario.characteristics.length}
  <dl
    class="text-sm pt-4 border-t border-foreground-weaker mt-4 grid grid-cols-2 gap-x-4 gap-y-4"
  >
    {#each scenario.characteristics as { year, description }}
      <div class="flex flex-col gap-y-1">
        <dt class="block font-semibold">
          Until <time datetime={year}>{year}</time>
        </dt>
        <dd>
          <span class="text-foreground-weak">{description}</span>
        </dd>
      </div>
    {/each}
  </dl>
  <figure class="pt-5 mt-5 border-t border-foreground-weaker">
    <p class="text-sm font-bold">Global mean temperature in °C</p>
    <div class="h-44">
      <LineChart yDomain={[1, 3]} data={chartData} />
    </div>
    <figcaption class="text-sm text-foreground-weak">
      Median lines correspond to best estimates. Learn more around uncertainties <a
        href="#">here</a
      >.
    </figcaption>
  </figure>
{/if}
