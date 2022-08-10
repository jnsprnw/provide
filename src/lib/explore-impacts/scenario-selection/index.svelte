<script>
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

  let hoveredScenario;
  $: renderedScenario = hoveredScenario || $CURRENT_SCENARIOS[0];

  $: [primary, secondary] = partition($SCENARIOS, 'isPrimary');
  $: scenarios = flatten([
    { isSpacer: true, label: 'Primary scenarios' },
    primary,
    { isSpacer: true, label: 'Additional scenarios' },
    secondary,
  ]);

  $: [temperatureData, emissionsData] = ['mean-temperature', 'emissions'].map(
    (key) => {
      return $SCENARIOS.map((scenario) => {
        return {
          ...scenario,
          highlight: renderedScenario?.uid === scenario.uid,
          color: $DICTIONARY_CURRENT_SCENARIOS[scenario.uid]?.color,
          values: scenario[key],
        };
      });
    }
  );
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
    <div class="scenario-charts">
      <div class="scenario-chart">
        <LineTimeSeries data={emissionsData} unit="celsius" />
      </div>
      <div class="scenario-chart">
        <LineTimeSeries data={temperatureData} unit="integer" />
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  @import '../../../styles/global.scss';

  .scenario-selection {
    @include selection-panel();

    .scenario-split {
      display: grid;
      grid-template-rows: minmax(200px, auto) 1fr;
      grid-gap: var(--font-size-large-xs); // TODO

      .scenario-charts {
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
