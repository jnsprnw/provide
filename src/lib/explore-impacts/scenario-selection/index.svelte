<script>
  import Tabs from '$lib/helper/tabs/Tabs.svelte';
  import Tab from '$lib/helper/tabs/Tab.svelte';
  import TabContent from '$lib/helper/tabs/TabContent.svelte';
  import { partition, flatten, get } from 'lodash-es';
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
  import { getContext } from 'svelte';

  let heightScenarioDescription = 130;

  let hoveredScenario;
  $: renderedScenario = hoveredScenario || $CURRENT_SCENARIOS[0];

  $: [primary, secondary] = partition($SCENARIOS, 'isPrimary');
  $: scenarios = flatten([
    { isSpacer: true, label: 'Primary scenarios' },
    primary,
    { isSpacer: true, label: 'Additional scenarios' },
    secondary,
  ]);

  $: [emissionsData, temperatureData] = SCENARIO_DATA_KEYS.map((key) => {
    return $SCENARIOS.map((scenario) => {
      const color = $DICTIONARY_CURRENT_SCENARIOS[scenario.uid]?.color;
      return {
        ...scenario,
        highlight: renderedScenario?.uid === scenario.uid,
        color,
        isSelected: Boolean(color), // This is used for sorting. The hex value of the color does some strange things to the sorting.
        values: scenario[key].data,
        unit: scenario[key].unit,
      };
    });
  });

  $: [emissionsUnit, temperatureUnit] = [emissionsData, temperatureData].map(
    (scenarios) => scenarios[0]?.unit
  );

  const KEY_UNIT_X = 'unitX';
  const KEY_UNIT_Y = 'unitY';

  $: warmingData = $SCENARIOS.map((scenario) => {
    const color = $DICTIONARY_CURRENT_SCENARIOS[scenario.uid]?.color;
    return {
      label: scenario['label'],
      highlight: renderedScenario?.uid === scenario.uid,
      color,
      isSelected: Boolean(color), // This is used for sorting. The hex value of the color does some strange things to the sorting.
      x: scenario.scenarioData['warming2050-2100'].data,
      y: scenario.scenarioData['warming2050'].data,
      [KEY_UNIT_X]: scenario.scenarioData['warming2050-2100'].unit,
      [KEY_UNIT_Y]: scenario.scenarioData['warming2050'].unit,
    };
  });

  $: [warmingUnitX, warmingUnitY] = [KEY_UNIT_X, KEY_UNIT_Y].map((key) =>
    get(warmingData, [0, key])
  );

  let currentWarmingTextUID;

  const warmingTexts = {
    default:
      'See how scenarios compare when it comes to warming and overshooting 1.5°C to 2050 and to 2100. Hover to learn more about the scenario categories.',
    'high-overshoot':
      '<strong>High overshoot</strong> scenarios exceed 1.5°C by more than 0.1°C by 2050, but exhibit a decrease in global mean temperature in the second half of the 21st century. These scenarios are especially useful to see if climate impacts are reversible after warming has stopped and temperatures have been brought back down.',
    'low-overshoot':
      '<strong>Low or no overshoot</strong> scenarios exceed 1.5°C of warming level by at most 0.1°C, and if so exhibit a decrease in global mean temperature in the second half of the 21st century. These scenarios are primarily used to explore climate impacts close to the 1.5°C warming limit of the Paris Agreement.',
    'high-warming':
      'Scenarios with <strong>high continuous warming</strong> exceed 1.5°C of warming by 2050, and see further warming thereafter. They are useful to see the climate impacts that would result from high levels of global warming.',
  };

  $: currentWarmingText =
    get(warmingTexts, currentWarmingTextUID) || get(warmingTexts, 'default');
</script>

<div class="scenario-selection">
  <span class="intro">
    Select the warming scenario(s) you would like to explore
  </span>
  <div class="scenario-list">
    {#each scenarios as scenario}
      {#if scenario.isSpacer}
        <span class="text-label text-label--bold">{scenario.label}</span>
      {:else}
        <Scenario
          labelText={scenario.label}
          bind:group={$CURRENT_SCENARIOS_UID}
          value={scenario.uid}
          on:mouseover={() => (hoveredScenario = scenario)}
          on:mouseleave={() => (hoveredScenario = null)}
        />
      {/if}
    {/each}
  </div>

  <div class="scenario-split">
    <div
      class="scenario-description"
      style={`height: ${heightScenarioDescription}px;`}
    >
      {#if renderedScenario}
        <div bind:clientHeight={heightScenarioDescription}>
          <h3>{renderedScenario.label}</h3>
          <p>{renderedScenario.description || 'Description missing'}</p>
        </div>
      {/if}
    </div>
    <Tabs type="nav" format="compact">
      <Tab label="Overshoot vs warming" />
      <Tab label="Trajectories" />
      <svelte:fragment slot="content">
        <TabContent>
          <div class="scenario-warming">
            <div class="scenario-chart">
              <ScatterplotWarming
                data={warmingData}
                unitX={warmingUnitX}
                unity={warmingUnitY}
                bind:hoveredSector={currentWarmingTextUID}
              />
            </div>
            <div class="quadrant-description">
              <p>{@html currentWarmingText}</p>
            </div>
          </div>
        </TabContent>
        <TabContent>
          <div class="scenario-trajectories">
            <div class="scenario-chart">
              <LineTimeSeries
                data={emissionsData}
                unit={emissionsUnit}
                title="Global GHG emissions"
                ticksYHighlighted={[0]}
                yTicks={4}
                xTicks={4}
              />
            </div>
            <div class="scenario-chart">
              <LineTimeSeries
                data={temperatureData}
                unit={temperatureUnit}
                title="Global mean tempearture"
                yDomain={[1, 3]}
                ticksYHighlighted={[1]}
                ticks={4}
                yTicks={4}
                xTicks={4}
              />
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
    padding-bottom: var(--space-m);

    .scenario-split {
      display: grid;
      grid-template-rows: minmax(130px, auto) auto 1fr;
      grid-gap: var(--font-size-large-xl); // TODO

      .scenario-warming,
      .scenario-trajectories {
        display: grid;
        grid-template-columns: 1fr 1fr;
        align-content: stretch;
        grid-auto-flow: column;
        grid-gap: var(--font-size-large-xl);
      }
    }
  }

  .scenario-description {
    transition: height 0.1s ease-out;
  }

  .scenario-chart,
  .quadrant-description {
    width: 100%;
    height: 280px;
  }
</style>
