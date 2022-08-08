<script>
  import { partition, flatten } from 'lodash-es';
  import VirtualList from '@sveltejs/svelte-virtual-list';
  import {
    CURRENT_SCENARIOS,
    DICTIONARY_ALT_CURRENT_SCENARIOS,
    AVAILABLE_SCENARIOS,
  } from '$lib/../stores/store.js';
  import Scenario from '$lib/scenario-selection/scenario.svelte';
  import LineTimeSeries from '$lib/charts/LineTimeSeries.svelte';

  let hoveredScenario;

  const [primary, secondary] = partition($AVAILABLE_SCENARIOS, 'isPrimary');
  const scenarios = flatten([
    { isSpacer: true, label: 'Primary scenarios' },
    primary,
    { isSpacer: true, label: 'Additional scenarios' },
    secondary,
  ]);

  $: [temperatureData, emissionsData] = ['temperature', 'emissions'].map(
    (key) => {
      return $AVAILABLE_SCENARIOS
        .map((scenario) => {
          return {
            ...scenario,
            highlight: hoveredScenario?.uid === scenario.uid,
            color: $DICTIONARY_ALT_CURRENT_SCENARIOS[scenario.uid]?.color,
            values: scenario[key],
          };
        })
        .sort((a, b) => (a.color && !b.color ? 1 : -1));
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
        bind:group={$CURRENT_SCENARIOS}
        value={item}
        on:mouseover={() => (hoveredScenario = item)}
        on:mouseleave={() => (hoveredScenario = null)}
      />
    {/if}
  </VirtualList>

  <div class="scenario-split">
    <div>
      {#if hoveredScenario}
        <h3>{hoveredScenario.label}</h3>
        <p>{hoveredScenario.description}</p>
      {/if}
    </div>
    <div class="scenario-charts">
      <div class="scenario-chart">
        <LineTimeSeries data={emissionsData} unit="celsius" />
      </div>
      <div class="scenario-chart">
        <LineTimeSeries data={temperatureData} unit="integer" />
      </div>
      <!-- { JSON.stringify($SCENARIOS_TIMESERIES_TEMPERATURE_DATA) } -->
    </div>
  </div>
</div>

<style lang="scss">
  @import '../../styles/global.scss';

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
