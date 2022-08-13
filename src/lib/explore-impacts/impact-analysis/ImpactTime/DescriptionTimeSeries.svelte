<script>
  import ScenarioList from '$lib/helper/chart-description/scenarioList.svelte';

  export let indicator;
  export let geography;
  export let scenarios;
</script>

<p>
  This graph shows how absolute changes in {indicator.label} (expressed in {indicator
    .unit.labelLong}) will play out over time in {geography.label} at different global
  warming levels compared to the reference period 1986-2006 (TODO), based on the
  <ScenarioList {scenarios} />.
</p>

<style lang="scss">
</style>
