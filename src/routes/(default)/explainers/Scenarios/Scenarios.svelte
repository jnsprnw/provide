<script>
  import Presets from './Presets.svelte';
  import CrossLink from './CrossLink.svelte';
  import Warning from './Warning.svelte';
  import Chart from './Chart.svelte';
  import Table from './Table/Table.svelte';
  import Tagline from '$lib/helper/Tagline.svelte';
  import PillGroup from '$lib/controls/PillGroup/PillGroup.svelte';
  import { writable } from 'svelte/store';
  import { extractTimeframe } from '$utils/meta.js';
  import THEME from '$styles/theme-store.js';
  import { MAX_NUMBER_SELECTABLE_SCENARIOS } from '$config';
  import _ from 'lodash-es';

  export let scenarios;
  export let selectableTimeframes;
  export let defaultTimeframe;
  export let scenarioPresets;

  $: selectedTimeframe = defaultTimeframe;
  $: scenariosListed = scenarios
    .filter((s) => extractTimeframe(s) === selectedTimeframe)
    .map((scenario) => {
      const scenarioSelectedIndex = $selectedScenarios.indexOf(scenario.uid);
      const isSelected = $selectedScenarios.includes(scenario.uid) && scenarioSelectedIndex < MAX_NUMBER_SELECTABLE_SCENARIOS;
      const color = isSelected ? $THEME.color.category.base[scenarioSelectedIndex] : undefined;
      return {
        ...scenario,
        isSelected,
        color,
      };
    });

  const selectedScenarios = writable([]);

  function handlePreset(event) {
    selectedScenarios.set(event.detail.scenarios);
  }
</script>

<div class="flex flex-col gap-y-5">
  <div>
    <Tagline class="mb-2">Pick a timeframe</Tagline>
    <PillGroup
      bind:currentUid={selectedTimeframe}
      options={selectableTimeframes}
    />
  </div>
  <Presets
    {selectedTimeframe}
    bind:selectedScenarios={$selectedScenarios}
    on:selection={handlePreset}
    {scenarioPresets}
  />
  <Table
    {scenariosListed}
    bind:selectedScenarios={$selectedScenarios}
  />
  <footer class="grid gap-x-6 grid-cols-2">
    <Warning selectedScenarios={$selectedScenarios} />
    <CrossLink selectedScenarios={$selectedScenarios} />
  </footer>
  <Chart scenarios={scenariosListed} />
</div>
