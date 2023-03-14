<script>
  import ScenarioList from '$lib/helper/chart-description/ScenarioList.svelte';

  export let indicator;
  export let geography;
  export let scenarios;
  export let parameters;
</script>

<p>
  This graph shows how changes in {indicator.label} (expressed in {indicator
    .unit.labelLong}) will play out over time in {geography.label} compared to the
  reference period {parameters?.reference?.label}, according to the
  <ScenarioList {scenarios} />.
</p>

<p>
  {#if scenarios.length === 1}
    The line indicates the median estimate for this scenario, while the coloured
    area shows the confidence interval that illustrates model uncertainty,
    arising from imperfect knowledge of the amount of global warming caused by
    greenhouse gas emissions and of the local response to global warming.
  {:else}
    The lines indicate the median estimates for each scenario.
  {/if}
</p>

<style lang="postcss">
</style>
