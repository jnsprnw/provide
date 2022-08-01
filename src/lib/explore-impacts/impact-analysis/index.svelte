<script>
  import { get } from "lodash-es";
  import { IMPACT_TIME_DATA } from "$lib/../stores/impact-time.js";
  import { CURRENT_INDICATOR_UID } from "$lib/../stores/store.js";
  import LineDistributionChart from "$lib/charts/LineDistributionChart.svelte";

  let data = null;
  IMPACT_TIME_DATA.subscribe((value) => {
    data = value;
  });

</script>
<h3>{ $CURRENT_INDICATOR_UID }</h3>

{#each data as scenario}
  {#if get(scenario, "status") === "success"}
    <h3>
    	Status: { get(scenario, "status") }<br />
      Data sample: { JSON.stringify(get(scenario, ["data", "data", $CURRENT_INDICATOR_UID, 0])) }
    </h3>
  {:else}
    <h3>Status: {get(scenario, "status")}</h3>
  {/if}
{/each}

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
