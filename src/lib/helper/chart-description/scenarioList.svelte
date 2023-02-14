<script>
  import { CURRENT_SCENARIOS } from '$src/stores/store';
  import { formatObjArr } from '$lib/utils.js';
  export let scenarios = $CURRENT_SCENARIOS;
  import ScenarioSingle from './ScenarioSingle.svelte';

  $: scenarioList = formatObjArr(scenarios, 'label');
</script>

{#each scenarioList as { type, value }}
  {#if type === 'element'}
    <ScenarioSingle scenario={value} />
  {:else}
    {value}
  {/if}
{/each}
scenario{#if scenarioList.length > 1}s{/if}
