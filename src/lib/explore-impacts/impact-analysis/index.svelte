<script>
  import {
    CURRENT_INDICATOR,
    CURRENT_GEOGRAPHY,
    CURRENT_SCENARIOS,
  } from "$lib/../stores/store.js";

  import { impactTimeDistribution } from "$lib/api/index.js";
  import LineDistributionChart from "$lib/charts/LineDistributionChart.svelte";

  $: console.log($impactTimeDistribution);
</script>

<h2>{$CURRENT_INDICATOR?.label}</h2>
{#if $impactTimeDistribution}
  <div class="distribution-chart">
    <LineDistributionChart
      mean={$impactTimeDistribution.mean}
      distribution={$impactTimeDistribution.distribution}
    />
  </div>
{/if}

<style lang="scss">
  .distribution-chart {
    height: 400px;
    width: 50%;
  }
</style>
