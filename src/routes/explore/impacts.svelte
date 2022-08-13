<script>
  import Tabs from '$lib/helper/tabs/tabs.svelte';
  import Tab from '$lib/helper/tabs/tab.svelte';
  import SelectionMessage from '$lib/selection-message.svelte';
  import TabPrimary from '$lib/helper/tabs/tabPrimary.svelte';
  import TabContent from '$lib/helper/tabs/tab-content.svelte';
  import ImpactAnalysis from '$lib/explore-impacts/impact-analysis/index.svelte';
  import UnAvoidableRisk from '$lib/explore-impacts/un-avoidable-risk/index.svelte';
  import MitigationBenefits from '$lib/explore-impacts/mitigation-benefits/index.svelte';
  import Reversibility from '$lib/explore-impacts/reversibility/index.svelte';
  import GeographySelection from '$lib/explore-impacts/geography-selection/index.svelte';
  import ScenarioSelection from '$lib/explore-impacts/scenario-selection/index.svelte';
  import IndicatorSelection from '$lib/explore-impacts/indicator-selection/index.svelte';

  import {
    CURRENT_GEOGRAPHY,
    CURRENT_SCENARIOS,
    CURRENT_INDICATOR,
  } from '$lib/../stores/store.js';
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
          <IndicatorSelection />
        </TabContent>
      </svelte:fragment>
    </Tabs>
  </div>
</div>

<div class="impacts-analysis container">
  <div class="wrapper">
    <SelectionMessage />
    <Tabs type="nav" selected={1}>
      <Tab label="Impact analysis" />
      <Tab label="(Un)avoidable risk" />
      <Tab label="Mitigation benefits" />
      <Tab label="Reversibility" />
      <svelte:fragment slot="content">
        <TabContent>
          <ImpactAnalysis />
        </TabContent>
        <TabContent>
          <UnAvoidableRisk />
        </TabContent>
        <TabContent>
          <MitigationBenefits />
        </TabContent>
        <TabContent>
          <Reversibility />
        </TabContent>
      </svelte:fragment>
    </Tabs>
  </div>
</div>

<style lang="scss">
  @import '../../styles/global.scss';

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
