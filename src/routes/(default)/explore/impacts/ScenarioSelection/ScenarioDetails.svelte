<script>
  import LineChart from '$lib/charts/CorridorChart.svelte';
  import { MEAN_TEMPERATURE_UID } from '$config';
  import DefinitionItem from '$lib/helper/chart-description/DefinitionItem.svelte';

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

<h3 class="text-lg mb-2 font-bold">{scenario.label}</h3>
<p class="text-foreground-weak mb-5">
  {scenario.description || 'Description missing'}
</p>
<dl class="flex gap-4 mb-5">
  {#if scenario.source}
    <DefinitionItem
      term="Scenario origin"
      definition={scenario.source.label}
      href={scenario.source.href}
    />
  {/if}
</dl>

{#if scenario.characteristics.length}
  <dl class="text-sm flex gap-3 py-4 border-t border-foreground-weaker">
    {#each scenario.characteristics as { year, description }}
      {#if year <= scenario.endYear}
        <div class="flex flex-col gap-y-1 w-1/2">
          <dt class="block font-semibold">
            Until <time datetime={year}>{year}</time>
          </dt>
          <dd>
            <span class="text-foreground-weak">{description}</span>
          </dd>
        </div>
      {/if}
    {/each}
  </dl>
{/if}

<div class="border-t border-foreground-weaker pt-4">
  <p class="text-sm mb-2 font-bold">Global mean temperature in °C</p>
  <figure class="">
    <div class="h-48 mb-2">
      <LineChart yDomain={[1, 3]} data={chartData} />
    </div>
    <figcaption class="text-xs text-foreground-weak">
      <p class="mb-1">
        Median lines correspond to best estimates. Learn more around
        uncertainties <a href="#">here</a>
        .
      </p>
      <dl class="flex gap-4">
        <DefinitionItem term="Model" definition="FaIR v1.6.4" />
        <DefinitionItem
          term="Source"
          definition="Lamboll et al., 2022"
          href="https://essopenarchive.org/doi/full/10.1002/essoar.10511875.1"
        />
      </dl>
    </figcaption>
  </figure>
</div>
