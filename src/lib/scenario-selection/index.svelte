<script>
  import VirtualList from '@sveltejs/svelte-virtual-list';
  import { SCENARIOS } from '$lib/../config.js';
  import { CURRENT_SCENARIO } from '$lib/../stores/store.js';

  let scenarioHover = null;

  function hoverScenario (value) {
    scenarioHover = value;
  }

  function setScenario (value) {
    CURRENT_SCENARIO.set(scenarioHover.label);
  }
</script>

<div class="scenario-selection">
  <VirtualList items={SCENARIOS} let:item height="200px">
    <p on:click={() => hoverScenario(item)} class:isActive={$CURRENT_SCENARIO === item.label}>{item.label}</p>
  </VirtualList>

  {#if scenarioHover}
  <div>
    <h3>{ scenarioHover.label }</h3>
    <dl>
      <dt>Overshoot magnitude</dt>
      <dd>{ scenarioHover?.scenarioData?.overshootMagnitude?.value }</dd>
      <dt>Overshoot length</dt>
      <dd>{ scenarioHover?.scenarioData?.overshootLength?.value }</dd>
      <dt>Peak warming</dt>
      <dd>{ scenarioHover?.scenarioData?.peakWarming?.value }</dd>
    </dl>
    <button on:click={setScenario}>Explore impacts for this scenario</button>
  </div>
  {/if}
</div>

<style lang="scss">
  .scenario-selection {
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
