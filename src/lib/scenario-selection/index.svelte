<script>
  import { getContext } from 'svelte';
  import VirtualList from '@sveltejs/svelte-virtual-list';
  import { CURRENT_SCENARIO } from '$lib/../stores/store.js';
  import { formatValues, getUID } from '$lib/utils.js';

  const { getScenarios } = getContext('meta');
  const scenarios = getScenarios();

  let scenarioHover = null;

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
      <dt>Overshoot magnitude</dt>
      <dd>{ formatValues(scenarioHover?.scenarioData?.overshootMagnitude?.value, 'celsius') }</dd>
      <dt>Overshoot length</dt>
      <dd>{ formatValues(scenarioHover?.scenarioData?.overshootLength?.value, 'year', true) }</dd>
      <dt>Peak warming</dt>
      <dd>{ formatValues(scenarioHover?.scenarioData?.peakWarming?.value, 'celsius') }</dd>
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
