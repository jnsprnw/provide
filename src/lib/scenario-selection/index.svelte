<script>
  import { partition, flatten } from "lodash-es";
  import { getContext } from 'svelte';
  import VirtualList from '@sveltejs/svelte-virtual-list';
  import { CURRENT_SCENARIOS } from '$lib/../stores/store.js';
  import { SCENARIOS_TIMESERIES_TEMPERATURE_DATA } from '$lib/../stores/scenarios-timeseries.js';
  import Scenario from "$lib/scenario-selection/scenario.svelte";
  import LineTimeSeries from "$lib/charts/LineTimeSeries.svelte";

  const { getScenarios } = getContext('meta');
  const [primary, secondary] = partition(getScenarios(), 'isPrimary');
  const scenarios = flatten([{ isSpacer: true, isPrimary: true }, primary, { isSpacer: true }, secondary]);

  let scenarioHover = null;

  function hoverScenario (value) {
    scenarioHover = value;
  }
</script>

<div class="scenario-selection">
  <VirtualList items={scenarios} let:item height="400px"> <!-- TODO: 400px -->
    {#if item.isSpacer}
    <span class="text-label text-label--bold">{#if !item.isPrimary}Additional{:else}Primary{/if} scenarios</span>
    {:else}
    <Scenario labelText={item.label} bind:group={$CURRENT_SCENARIOS} value={item} on:mouseover={() => hoverScenario(item)} />
    {/if}
  </VirtualList>

  <div class="scenario-split">
    <div>
      {#if scenarioHover}
      <h3>{ scenarioHover.label }</h3>
      <p>{ scenarioHover.description }</p>
      {/if}
    </div>
    <div class="scenario-charts">
      <LineTimeSeries data={$SCENARIOS_TIMESERIES_TEMPERATURE_DATA} unit="celsius" />
      <!-- { JSON.stringify($SCENARIOS_TIMESERIES_TEMPERATURE_DATA) } -->
    </div>
  </div>
</div>

<style lang="scss">
  @import "../../styles/global.scss";

  .scenario-selection {
    @include selection-panel();

    .scenario-split {
      display: grid;
      grid-template-rows: minmax(200px, auto) 1fr;
      grid-gap: var(--font-size-large-xs); // TODO
    }
  }
</style>
