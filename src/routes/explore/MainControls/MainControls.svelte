<script>
  import Tabs from '$lib/helper/tabs/Tabs.svelte';
  import TabContent from '$lib/helper/tabs/TabContent.svelte';
  import TabPrimary from '$lib/helper/tabs/TabPrimary.svelte';
  import GeographySelection from './GeographySelection/GeographySelection.svelte';
  import ScenarioSelection from './ScenarioSelection/ScenarioSelection.svelte';
  import IndicatorSelection from './IndicatorSelection/IndicatorSelection.svelte';
  import {
    CURRENT_GEOGRAPHY,
    CURRENT_SCENARIOS,
    CURRENT_INDICATOR,
  } from '$stores/state.js';
</script>

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
