<script>
  import Presets from './Presets.svelte';
  import CrossLink from './CrossLink.svelte';
  import Table from './Table/Table.svelte';
  import { writable } from 'svelte/store';

  export let scenarios;

  const selectedScenarios = writable([]);

  function handlePreset(event) {
    selectedScenarios.set(event.detail.scenarios);
  }
</script>

<div class="flex flex-col gap-y-5">
  <Presets bind:selectedScenarios={$selectedScenarios} on:selection={handlePreset} />
  <Table {scenarios} bind:selectedScenarios={$selectedScenarios} />
  <CrossLink selectedScenarios={$selectedScenarios} />
</div>
