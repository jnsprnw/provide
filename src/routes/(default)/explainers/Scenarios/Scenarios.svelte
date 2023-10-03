<script>
  import Presets from './Presets.svelte';
  import Table from './Table/Table.svelte';
  import { writable } from 'svelte/store';

  export let scenarios;

  const selectedScenarios = writable([]);

  function handlePreset(event) {
    selectedScenarios.set(event.detail.scenarios);
  }
</script>

<h2>Scenarios list</h2>
<Presets bind:selectedScenarios={$selectedScenarios} on:selection={handlePreset} />
<Table {scenarios} bind:selectedScenarios={$selectedScenarios} />
