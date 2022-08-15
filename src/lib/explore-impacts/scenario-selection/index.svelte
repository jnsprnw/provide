<script>
  import Tabs from '$lib/helper/tabs/tabs.svelte';
  import Tab from '$lib/helper/tabs/tab.svelte';
  import TabContent from '$lib/helper/tabs/tab-content.svelte';
  import { partition, flatten } from 'lodash-es';
  import VirtualList from '@sveltejs/svelte-virtual-list';
  import {
    CURRENT_SCENARIOS,
    CURRENT_SCENARIOS_UID,
    DICTIONARY_CURRENT_SCENARIOS,
    SCENARIOS,
  } from '$lib/../stores/store.js';
  import Scenario from './scenario.svelte';
  import LineTimeSeries from '$lib/charts/LineTimeSeries.svelte';
  import ScatterplotWarming from '$lib/charts/ScatterplotWarming/index.svelte';
  import { SCENARIO_DATA_KEYS } from '$lib/../config.js';

  let hoveredScenario;
  $: renderedScenario = hoveredScenario || $CURRENT_SCENARIOS[0];

  $: [primary, secondary] = partition($SCENARIOS, 'isPrimary');
  $: scenarios = flatten([
    { isSpacer: true, label: 'Primary scenarios' },
    primary,
    { isSpacer: true, label: 'Additional scenarios' },
    secondary,
  ]);

  $: [emissionsData, temperatureData] = SCENARIO_DATA_KEYS.map(
    (key) => {
      return $SCENARIOS.map((scenario) => {
        return {
          ...scenario,
          highlight: renderedScenario?.uid === scenario.uid,
          color: $DICTIONARY_CURRENT_SCENARIOS[scenario.uid]?.color,
          values: scenario[key], // TODO: How is this working? should be child of scenarioData
        };
      });
    }
  );

  $: warmingData = $SCENARIOS.map((scenario) => {
      return {
        label: scenario['label'],
        highlight: renderedScenario?.uid === scenario.uid,
        color: $DICTIONARY_CURRENT_SCENARIOS[scenario.uid]?.color,
        x: scenario.scenarioData['warming2050-2100'].data,
        y: scenario.scenarioData['warming2050'].data
      };
    });
</script>

<div class="scenario-selection">
  <VirtualList items={scenarios} let:item height="400px">
    <!-- TODO: 400px -->
    {#if item.isSpacer}
      <span class="text-label text-label--bold">{item.label}</span>
    {:else}
      <Scenario
        labelText={item.label}
        bind:group={$CURRENT_SCENARIOS_UID}
        value={item.uid}
        on:mouseover={() => (hoveredScenario = item)}
        on:mouseleave={() => (hoveredScenario = null)}
      />
    {/if}
  </VirtualList>

  <div class="scenario-split">
    <div>
      {#if renderedScenario}
        <h3>{renderedScenario.label}</h3>
        <p>{renderedScenario.description || 'Description missing'}</p>
      {/if}
    </div>
    <Tabs type="nav">
      <Tab label="Overshoot vs warming" />
      <Tab label="Trajectories" />
      <svelte:fragment slot="content">
        <TabContent>
          <div class="scenario-scatterplot">
            <ScatterplotWarming data={warmingData} unit="degrees-celsius" />
            <p>Text describing the chart</p>
          </div>
        </TabContent>
        <TabContent>
          <div class="scenario-trajectories">
            <div class="scenario-chart">
              <LineTimeSeries data={emissionsData} unit="ton" title="Global GHG emissions" />
            </div>
            <div class="scenario-chart">
              <LineTimeSeries data={temperatureData} unit="degrees-celsius" title="Global mean tempearture" />
            </div>
          </div>
        </TabContent>
      </svelte:fragment>
    </Tabs>
  </div>
</div>

<style lang="scss">
  @import '../../../styles/global.scss';

  .scenario-selection {
    @include selection-panel();

    .scenario-split {
      display: grid;
      grid-template-rows: minmax(150px, auto) auto 1fr;
      grid-gap: var(--font-size-large-xs); // TODO

      .scenario-scatterplot {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: var(--font-size-large-xs); // TODO
        height: 200px;
      }

      .scenario-trajectories {
        display: grid;
        grid-template-columns: minmax(200px, auto) 1fr;
        grid-gap: var(--font-size-large-xs); // TODO
      }
    }
  }

  .scenario-chart {
    width: 380px;
    height: 200px;
  }
</style>
