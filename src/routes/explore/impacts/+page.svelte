<script>
  import Tabs from '$lib/helper/tabs/Tabs.svelte';
  import Tab from '$lib/helper/tabs/Tab.svelte';
  import TabPrimary from '$lib/helper/tabs/TabPrimary.svelte';
  import TabContent from '$lib/helper/tabs/TabContent.svelte';
  import ImpactTime from '$lib/explore-impacts/ImpactTime/ImpactTime.svelte';
  import ImpactGeo from '$lib/explore-impacts/ImpactGeo/ImpactGeo.svelte';
  import UnAvoidableRisk from '$lib/explore-impacts/UnavoidableRisk/UnavoidableRisk.svelte';
  import MitigationBenefits from '$lib/explore-impacts/MitigationBenefits/MitigationBenefits.svelte';
  import Reversibility from '$lib/explore-impacts/Reversibility/Reversibility.svelte';
  import GeographySelection from '$lib/explore-impacts/GeographySelection/GeographySelection.svelte';
  import ScenarioSelection from '$lib/explore-impacts/ScenarioSelection/ScenarioSelection.svelte';
  import IndicatorSelection from '$lib/explore-impacts/IndicatorSelection/IndicatorSelection.svelte';

  import {
    CURRENT_GEOGRAPHY,
    CURRENT_SCENARIOS,
    CURRENT_INDICATOR,
    ALL_PARAMETERS_SELECTED,
  } from '$stores/state.js';
</script>

<svelte:head>
  <title>Explore Impacts</title>
</svelte:head>

<div class="impacts-header container">
  <div class="wrapper">
    <div class="explore-intro">
      <p class="explore-description">
        Explore how different levels of climate action will lead to different
        climate impacts for countries, cities, and more. See where risk
        escalates and under what conditions impacts could be avoided.
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
    <Tabs type="nav" selected={0}>
      <Tab label="Impact overview" />
      <Tab label="(Un)avoidable risk" />
      <Tab label="Mitigation benefits" disabled={true} />
      <Tab label="Reversibility" disabled={true} />

      <svelte:fragment slot="content">
        {#if $ALL_PARAMETERS_SELECTED}
          <div class="wrapper vertical-space">
            <TabContent>
              <ImpactTime />
              <ImpactGeo />
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
          </div>
        {/if}
      </svelte:fragment>
    </Tabs>
  </div>
</div>

<style lang="scss">
  //@import '../../styles/global.scss';

  span {
    display: block;
  }

  .impacts-header {
    background-color: var(--color-background-stronger);
    border-bottom: 1px solid var(--color-foreground-weaker);
    padding: var(--space-xl) 0 calc(var(--space-xl) + 4rem); // TODO
    margin-bottom: -4rem;
  }

  .impacts-selection {
    margin-bottom: var(--space-xl);
    border-bottom: 1px solid var(--color-foreground-weaker);
  }

  .explore-description {
    font-size: var(--font-size-l);
    max-width: 60ch;
    line-height: var(--font-line-height-base);
    color: var(--color-brand-stronger);
  }
</style>
