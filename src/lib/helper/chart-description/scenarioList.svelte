<script>
  import {
    CURRENT_SCENARIOS,
  } from '$lib/../stores/store';
  import { formatObjArr } from '$lib/utils.js';
  export let scenarios = $CURRENT_SCENARIOS;

  $: scenarioList = formatObjArr(scenarios, 'label');
</script>

{#each scenarioList as { type, value }}
  {#if type === 'element'}
    <em
      class="text-scenario-label"
      style={`text-decoration-color: ${value.color}`}>
      { value.label }
    </em>
  {:else}
    { value }
  {/if}
{/each}
scenario{#if scenarioList.length > 1}s{/if}
