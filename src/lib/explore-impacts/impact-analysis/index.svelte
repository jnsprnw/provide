<script>
  import { get } from "lodash-es";
  import { IMPACT_TIME_DATA } from "$lib/../stores/impact-time.js";
  import { IMPACT_TIME_DISTRIBUTION_DATA } from "$lib/../stores/impact-time-distribution.js";
  import { IMPACT_GEO_DATA } from "$lib/../stores/impact-geo.js";
  import { CURRENT_INDICATOR_UID } from "$lib/../stores/store.js";
  import LineDistributionChart from "$lib/charts/LineDistributionChart.svelte";
</script>
<p>{ $CURRENT_INDICATOR_UID }</p>

<h2>Impact Time</h2>
{#each $IMPACT_TIME_DATA as scenario}
  {#if get(scenario, "status") === "success"}
    <p>
    	Status: { get(scenario, "status") }<br />
      Data sample: { JSON.stringify(get(scenario, ["data", "data", $CURRENT_INDICATOR_UID, 0])) }
    </p>
  {:else}
    <p>Status: {get(scenario, "status")}</p>
  {/if}
{/each}

<h2>Impact Time Distribution</h2>
{ get($IMPACT_TIME_DISTRIBUTION_DATA, ["status"]) }
{ JSON.stringify(get($IMPACT_TIME_DISTRIBUTION_DATA, ['data', 'data', 'distribution', 0])) }

<h2>Impact Geo</h2>
{ get($IMPACT_GEO_DATA, ["status"]) }
{ JSON.stringify(get($IMPACT_GEO_DATA, ['data', 'data', 0])) }

<!-- {#if $IMPACT_TIME_DISTRIBUTION_DATA?.status === "success"}
  <div class="distribution-chart">
    <LineDistributionChart
      mean={$IMPACT_TIME_DISTRIBUTION_DATA.mean}
      distribution={$IMPACT_TIME_DISTRIBUTION_DATA.distribution}
    />
  </div>
{/if} -->
<style lang="scss">
  .distribution-chart {
    height: 400px;
    width: 50%;
  }
</style>
