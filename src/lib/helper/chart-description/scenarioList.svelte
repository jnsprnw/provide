<script>
  import { CURRENT_SCENARIOS } from '$src/stores/state';
  import { formatObjArr } from '$lib/utils.js';
  import ScenarioSingle from './ScenarioSingle.svelte';

  export let scenarios = $CURRENT_SCENARIOS;

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
