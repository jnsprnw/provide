<script>
  import { getContext } from 'svelte';
  import VirtualList from '@sveltejs/svelte-virtual-list';
  import ScenarioValue from '$lib/scenario-selection/scenario-value.svelte';
  import { CURRENT_SCENARIO } from '$lib/../stores/store.js';
  import { formatValues, getUID } from '$lib/utils.js';

  const { getScenarios } = getContext('meta');
  const scenarios = getScenarios();

  let scenarioHover = null;
  $: scenarioHoverUID = getUID(scenarioHover);

  function hoverScenario (value) {
    scenarioHover = value;
  }

  function setScenario (value) {
    CURRENT_SCENARIO.set(getUID(scenarioHover));
  }
</script>

<div class="scenario-selection">
  <VirtualList items={scenarios} let:item height="200px">
    <p on:click={() => hoverScenario(item)} class:isActive={$CURRENT_SCENARIO === getUID(item)}>{item.label}</p>
  </VirtualList>

  {#if scenarioHover}
  <div>
    <h3>{ scenarioHover.label }</h3>
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
    <button on:click={setScenario}>Explore impacts for this scenario</button>
  </div>
  {/if}
</div>

<style lang="scss">
  .scenario-selection {
    background-color: var(--color-light-blue100); // TODO
    margin-top: 2rem;
    margin-bottom: 2rem;
    display: grid;
    grid-template-columns: 1fr 2fr;
  }

  p:hover {
    cursor: pointer;
    color: blue;
  }

  p.isActive {
    font-weight: bold;
  }
</style>
