<script>
  import { get } from "lodash-es";
  import { requestData } from "$lib/api/impact-time.js";
  import {
    CURRENT_INDICATOR,
    IMPACT_TIME_DATA,
    CURRENT_INDICATOR_UID,
    CURRENT_GEOGRAPHY_UID,
    CURRENT_SCENARIOS_UID,
  } from "$lib/../stores/store.js";
  import {
    IMPACT_TIME_DISTRIBUTION_DATA,
    IMPACT_TIME_DATA_2,
  } from "$lib/api/endpoints.js";
  import LineDistributionChart from "$lib/charts/LineDistributionChart.svelte";

  $: console.log($IMPACT_TIME_DISTRIBUTION_DATA);

  let indicator = null;
  CURRENT_INDICATOR_UID.subscribe((value) => {
    indicator = value;
  });

  let geography = null;
  CURRENT_GEOGRAPHY_UID.subscribe((value) => {
    geography = value;
  });

  let scenarios = null;
  CURRENT_SCENARIOS_UID.subscribe((value) => {
    scenarios = value;
  });

  function buildRequests(indicator, geography, scenarios) {
    scenarios.forEach((scenario) => {
      requestData([indicator], geography, scenario);
    });
  }

  $: buildRequests(indicator, geography, scenarios);
</script>

<h2>{$CURRENT_INDICATOR?.label}</h2>
{#each scenarios as scenario}
  {#if get( $IMPACT_TIME_DATA, [scenario, geography, indicator, "status"] ) === "success"}
    <h3>
      Data sample: {JSON.stringify(
        get($IMPACT_TIME_DATA, [scenario, geography, indicator, "data", 0, 0])
      )}
    </h3>
  {:else}
    <h3>Loading {scenario} {geography} {indicator}</h3>
  {/if}
{/each}

{#if $IMPACT_TIME_DISTRIBUTION_DATA.status === "success"}
  <div class="distribution-chart">
    <LineDistributionChart
      mean={$IMPACT_TIME_DISTRIBUTION_DATA.mean}
      distribution={$IMPACT_TIME_DISTRIBUTION_DATA.distribution}
    />
  </div>
{/if}

<style lang="scss">
  .distribution-chart {
    height: 400px;
    width: 50%;
  }
</style>
