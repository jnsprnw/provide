<script>
  import ScenarioList from '$lib/helper/chart-description/ScenarioList.svelte';

  export let indicator;
  export let geography;
  export let scenarios;
</script>

<p>
  This graph shows how changes in {indicator.label} (expressed in {indicator
    .unit.labelLong}) will play out over time in {geography.label} compared to the reference period 1986-2006 (TODO), according to the
  <ScenarioList {scenarios} />.
</p>

<style lang="scss">
</style>
