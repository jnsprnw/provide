<script>
  import Presets from './Presets.svelte';
  import CrossLink from './CrossLink.svelte';
  import Warning from './Warning.svelte';
  import Chart from './Chart.svelte';
  import Table from './Table/Table.svelte';
  import SubsectionHeadline from '$lib/helper/ContentPages/SubsectionHeadline.svelte';
  import PillGroup from '$lib/controls/PillGroup/PillGroup.svelte';
  import { writable } from 'svelte/store';
  import { extractTimeframe } from '$utils/meta.js';
  import THEME from '$styles/theme-store.js';
  import { LABEL_SCENARIOS_TIMELINES, LABEL_SCENARIOS_TIMEFRAMES, MAX_NUMBER_SELECTABLE_SCENARIOS, MEAN_TEMPERATURE_UID, EMISSIONS_UID, PATH_DOCUMENTATION } from '$config';
  import DefinitionItem from '$lib/helper/chart-description/DefinitionItem.svelte';
  import { getContext } from 'svelte';
  const { query } = getContext('scrollContent');

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

<div class="flex flex-col gap-y-10 mt-10 pt-10 {query}">
  <div>
    <SubsectionHeadline title={LABEL_SCENARIOS_TIMEFRAMES} subtitle="2100 for the majority of climate impacts, 2300 for longer term impacts (glaciers and oceans)." />
    <PillGroup bind:currentUid={selectedTimeframe} options={selectableTimeframes} />
  </div>

  <Presets {selectedTimeframe} bind:selectedScenarios={$selectedScenarios} on:selection={handlePreset} {scenarioPresets} />

  <Table {scenariosListed} {selectedTimeframe} bind:selectedScenarios={$selectedScenarios} />
  <footer class="grid gap-x-6 grid-cols-2">
    <Warning selectedScenarios={$selectedScenarios} />
    <CrossLink selectedScenarios={$selectedScenarios} />
  </footer>
  <div>
    <SubsectionHeadline title={LABEL_SCENARIOS_TIMELINES} subtitle="Select a scenario to see progress over time." />
    <div class="grid gap-x-6 grid-cols-2">
      <Chart scenarios={scenariosListed} variable={MEAN_TEMPERATURE_UID} title="Global mean temperature in °C" yDomain={[1, null]}>
        <p class="mt-1 mb-2 text-contour-weaker">
          The lines in the graph represent best estimates. Learn more about uncertainties <a class="underline decoration-theme-weakest hover:decoration-theme-weaker" href="/{PATH_DOCUMENTATION}"
            >here</a
          >.
        </p>
        <dl class="flex gap-4">
          <DefinitionItem term="Model" definition="FaIR v1.6.4" />
          <DefinitionItem term="Source" definition="Lamboll et al., 2022" href="https://essopenarchive.org/doi/full/10.1002/essoar.10511875.1" />
        </dl>
      </Chart>
      <Chart scenarios={scenariosListed} variable={EMISSIONS_UID} title="Global greenhouse gas emissions in GtCO₂eq/yr" yDomain={[null, null]}>
        <p class="mt-1 mb-2 text-contour-weaker">
          The lines in the graph represent best estimates. Learn more about uncertainties <a class="underline decoration-theme-weakest hover:decoration-theme-weaker" href="/{PATH_DOCUMENTATION}"
            >here</a
          >.
        </p>
        <dl class="flex gap-4">
          <DefinitionItem term="Model" definition="FaIR v1.6.4" />
          <DefinitionItem term="Source" definition="Lamboll et al., 2022" href="https://essopenarchive.org/doi/full/10.1002/essoar.10511875.1" />
        </dl>
      </Chart>
    </div>
  </div>
</div>
