<script>
  import Tabs from '$lib/helper/tabs/tabs.svelte';
  import Tab from '$lib/helper/tabs/tab.svelte';
  import TabContent from '$lib/helper/tabs/tab-content.svelte';
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
        unit: scenario[key].unit
      };
    });
  });

  $: [emissionsUnit, temperatureUnit] = [emissionsData, temperatureData].map(scenarios => scenarios[0]?.unit)

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
      [KEY_UNIT_Y]: scenario.scenarioData['warming2050'].unit
    };
  });

  $: [warmingUnitX, warmingUnitY] = [KEY_UNIT_X, KEY_UNIT_Y].map(key => get(warmingData, [0, key]))

  let currentWarmingTextUID;

  const warmingTexts = {
    default:
      'Some text about this graph that explains how to read it and what can be read from it. It shouldn’t be much longer than 3-4 brief sentences without explaining all scenarios in detail it should summarize the key points.',
    'high-overshoot':
      '<strong>High Overshoot</strong> Pathways lead to an exceedance of the 1.5°C global warming level by more than 0.1°C by 2050, and exhibit a decrease in Global Mean Temperature in the second half of the 21st century. Such scenarios can be especially useful to explore the reversibility of climate impacts after global warming has stabilised and as it is being reverted.',
    'low-overshoot':
      '<strong>Low or No Overshoot</strong> Pathways lead to an exceedance of the 1.5°C global warming level by at most 0.1°C, and may exhibit a decrease in Global Mean Temperature in the second half of the 21st century. Such scenarios can be especially used to explore climate impacts if global warming is being kept at levels compatible with the Long-Term Temperature Goal of the Paris Agreement.',
    'high-warming':
      'Pathways with <strong>High Continuous Warming</strong> lead to an exceedance of the 1.5°C global warming level by 2050, and exhibit further global warming thereafter. Such scenarios can be especially used to explore climate impacts for high levels of global warming.',
  };

  $: currentWarmingText =
    get(warmingTexts, currentWarmingTextUID) || get(warmingTexts, 'default');
</script>

<div class="scenario-selection">
  <span class="intro">
    Select one or more scenarios for which you would like to explore impacts
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
    <div class="scenario-description" style={`height: ${heightScenarioDescription}px;`}>
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
