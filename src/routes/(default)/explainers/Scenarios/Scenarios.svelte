<script>
  import Presets from './Presets.svelte';
  import CrossLink from './CrossLink.svelte';
  import Warning from './Warning.svelte';
  import Table from './Table/Table.svelte';
  import Tagline from '$lib/helper/Tagline.svelte';
  import PillGroup from '$lib/controls/PillGroup/PillGroup.svelte';
  import { writable } from 'svelte/store';
  import _ from 'lodash-es';

  export let scenarios;
  export let selectableTimeframes;
  export let defaultTimeframe;
  export let scenarioPresets;

  const filterLabel = 'Pick a timeframe';

  $: selectedTimeframe = defaultTimeframe;

  const selectedScenarios = writable([]);

  function handlePreset(event) {
    selectedScenarios.set(event.detail.scenarios);
  }
</script>

<div class="flex flex-col gap-y-5">
  <div>
    <Tagline class="mb-2">{filterLabel}</Tagline>
    <PillGroup bind:currentUid={selectedTimeframe} options={selectableTimeframes} />
  </div>
  <Presets {selectedTimeframe} bind:selectedScenarios={$selectedScenarios} on:selection={handlePreset} {scenarioPresets} />
  <Table {selectedTimeframe} {scenarios} bind:selectedScenarios={$selectedScenarios} />
  <footer class="flex gap-x-6">
    <Warning selectedScenarios={$selectedScenarios} />
    <CrossLink selectedScenarios={$selectedScenarios} />
  </footer>
</div>
