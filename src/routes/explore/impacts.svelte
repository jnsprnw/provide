<script>
  import { requestData } from "$lib/api/impact-time.js";
  import Tabs from "$lib/helper/tabs/tabs.svelte";
  import Tab from "$lib/helper/tabs/tab.svelte";
  import SelectionMessage from "$lib/selection-message.svelte";
  import TabPrimary from "$lib/helper/tabs/tabPrimary.svelte";
  import TabContent from "$lib/helper/tabs/tab-content.svelte";
  import Sectors from "$lib/explore-impacts/sectors/index.svelte";
  import ImpactAnalysis from "$lib/explore-impacts/impact-analysis/index.svelte";
  import MitigationBenefits from "$lib/explore-impacts/mitigation-benefits/index.svelte";
  import Reversibility from "$lib/explore-impacts/reversibility/index.svelte";
  import GeographySelection from "$lib/geography-selection/index.svelte";
  import ScenarioSelection from "$lib/scenario-selection/index.svelte";

  import Current from "$lib/explore-impacts/Test/Current.svelte";
  import Custom from "$lib/explore-impacts/Test/Custom.svelte";

  import {
    CURRENT_GEOGRAPHY,
    CURRENT_SCENARIOS,
    CURRENT_INDICATOR,
    AVAILABLE_INDICATORS,
  } from "$lib/../stores/store.js";

  function buildRequests(indicators, geography, scenarios) {
    const indicatorList = indicators.map(({ uid }) => uid);
    const scenarioList = scenarios.map(({ uid }) => uid);
    scenarioList.forEach((scenario) => {
      requestData(indicatorList, geography.uid, scenario);
    });
  }

  $: buildRequests(
    $AVAILABLE_INDICATORS,
    $CURRENT_GEOGRAPHY,
    $CURRENT_SCENARIOS
  );
</script>

<svelte:head>
  <title>Explore Impacts</title>
</svelte:head>

<div class="impacts-header container">
  <div class="wrapper">
    <div class="explore-intro">
      <p class="explore-description">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor
        sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
        ut labore et dolore magna aliqua.
        <Current /><br />
        <Custom />
      </p>
    </div>
  </div>
</div>

<div class="impacts-selection container">
  <div class="wrapper">
    <Tabs type="menu">
      <TabPrimary
        label="Geography"
        selectedValues={$CURRENT_GEOGRAPHY?.label || null}
        missingValue="Select a geography"
      />
      <TabPrimary
        label="Scenarios"
        selectedValues={$CURRENT_SCENARIOS.map((d) => d.label)}
        missingValue="Select at least one scenario"
        disabled={$CURRENT_GEOGRAPHY === null}
      />
      <TabPrimary
        label="Indicator"
        selectedValues={$CURRENT_INDICATOR?.label || null}
        missingValue="Select an indicator"
        disabled={$CURRENT_SCENARIOS.length === 0}
      />
      <svelte:fragment slot="content">
        <TabContent>
          <GeographySelection />
        </TabContent>
        <TabContent>
          <ScenarioSelection />
        </TabContent>
        <TabContent>
          <Sectors />
        </TabContent>
      </svelte:fragment>
    </Tabs>
  </div>
</div>

<div class="impacts-analysis container">
  <div class="wrapper">
    <SelectionMessage />
    {#if true || ($CURRENT_GEOGRAPHY !== null && $CURRENT_SCENARIOS !== [] && $CURRENT_INDICATOR !== null)}
      <Tabs type="nav">
        <Tab label="Impact analysis" />
        <Tab label="Mitigation benefits" />
        <Tab label="Reversibility" />
        <svelte:fragment slot="content">
          <TabContent>
            <ImpactAnalysis />
          </TabContent>
          <TabContent>
            <MitigationBenefits />
          </TabContent>
          <TabContent>
            <Reversibility />
          </TabContent>
        </svelte:fragment>
      </Tabs>
    {/if}
  </div>
</div>

<style lang="scss">
  @import "../../styles/global.scss";

  span {
    display: block;
  }

  .impacts-header {
    background-color: var(--color-light-blue100); // TODO
    border-bottom: 1px solid var(--color-light-blue200); // TODO
    padding: 2rem 0 6rem; // TODO
    margin-bottom: -4rem;
  }

  .impacts-selection {
    // border-bottom: 1px solid var(--color-light-blue200); // I think no border is better
  }

  .explore-description {
    font-size: var(--font-size-large-l);
    line-height: var(--font-line-height-base);
    color: var(--color-light-blue700);
  }
</style>
