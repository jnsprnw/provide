<script>
  import { partition, flatten } from "lodash-es";
  import { getContext } from 'svelte';
  import VirtualList from '@sveltejs/svelte-virtual-list';
  import ScenarioValue from '$lib/scenario-selection/scenario-value.svelte';
  import { CURRENT_SCENARIOS } from '$lib/../stores/store.js';
  import { getUID } from '$lib/utils.js';
  import Scenario from "$lib/scenario-selection/scenario.svelte";

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
    <span class="text-label text-label--bold">{#if !item.isPrimary}additional {/if}scenarios</span>
    {:else}
    <Scenario labelText={item.label} bind:group={$CURRENT_SCENARIOS} value={item} on:mouseover={() => hoverScenario(item)} />
    {/if}
  </VirtualList>

  {#if scenarioHover}
  <div>
    <h3>{ scenarioHover.label }</h3>
    <p>{ scenarioHover.description }</p>
    <dl>
      <ScenarioValue key="ghg-netzero-year" {scenarioHover} />
      <ScenarioValue key="ghg-2030-absolute" {scenarioHover} />
      <ScenarioValue key="ghg-2030-relative" {scenarioHover} />
      <ScenarioValue key="warming-2100" {scenarioHover} />
      <ScenarioValue key="warming-peak-value" {scenarioHover} />
      <ScenarioValue key="warming-peak-year" {scenarioHover} />
      <ScenarioValue key="warming-overshoot-magnitude" {scenarioHover} />
      <ScenarioValue key="warming-overshoot-length" {scenarioHover} />
    </dl>
  </div>
  {/if}
</div>

<style lang="scss">
  @import "../../styles/global.scss";

  .scenario-selection {
    @include selection-panel();
  }

  p:hover {
    cursor: pointer;
    color: blue; // TODO
  }

  p.isActive {
    font-weight: bold;
  }
</style>
