<script>
  import { partition, flatten } from "lodash-es";
  import { getContext } from 'svelte';
  import VirtualList from '@sveltejs/svelte-virtual-list';
  import { CURRENT_SCENARIOS, HOVER_SCENARIO } from '$lib/../stores/store.js';
  import { SCENARIOS_TIMESERIES_TEMPERATURE_DATA, SCENARIOS_TIMESERIES_EMISSIONS_DATA } from '$lib/../stores/scenarios-timeseries.js';
  import Scenario from "$lib/scenario-selection/scenario.svelte";
  import LineTimeSeries from "$lib/charts/LineTimeSeries.svelte";

  const { getScenarios } = getContext('meta');
  const [primary, secondary] = partition(getScenarios(), 'isPrimary');
  const scenarios = flatten([{ isSpacer: true, isPrimary: true }, primary, { isSpacer: true }, secondary]);
</script>

<div class="scenario-selection">
  <VirtualList items={scenarios} let:item height="400px"> <!-- TODO: 400px -->
    {#if item.isSpacer}
    <span class="text-label text-label--bold">{#if !item.isPrimary}Additional{:else}Primary{/if} scenarios</span>
    {:else}
    <Scenario labelText={item.label} bind:group={$CURRENT_SCENARIOS} value={item} on:mouseover={() => HOVER_SCENARIO.set(item)} on:mouseleave={() => HOVER_SCENARIO.set(null)} />
    {/if}
  </VirtualList>

  <div class="scenario-split">
    <div>
      {#if $HOVER_SCENARIO}
      <h3>{ $HOVER_SCENARIO.label }</h3>
      <p>{ $HOVER_SCENARIO.description }</p>
      {/if}
    </div>
    <div class="scenario-charts">
      <LineTimeSeries data={$SCENARIOS_TIMESERIES_TEMPERATURE_DATA} unit="celsius" />
      <LineTimeSeries data={$SCENARIOS_TIMESERIES_EMISSIONS_DATA} unit="integer" />
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

      .scenario-charts {
        display: grid;
        grid-template-columns: minmax(200px, auto) 1fr;
        grid-gap: var(--font-size-large-xs); // TODO
      }
    }
  }
</style>
