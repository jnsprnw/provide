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
<p>The lines indicates the median estimates for each scenario.</p>

<!-- <p>
  {#if scenarios.length === 1}
    The line indicates the median, while the colour variations shows the spread
    of possible results (the darker the colour, the more likely they are for
    this scenario).
  {:else}
    The lines indicates the median estimates for each scenario.
  {/if}
</p> -->
<style lang="scss">
</style>
