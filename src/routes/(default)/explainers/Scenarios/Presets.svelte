<script>
  import { createEventDispatcher } from 'svelte';
  import { writable } from 'svelte/store';
  import { KEY_SCENARIOPRESET_UID as PRESET_ID } from '$config';
  import Tagline from '$lib/helper/Tagline.svelte';
  import SideScrollIndicator from '$lib/helper/SideScrollIndicator.svelte';
  import SubsectionHeadline from '$lib/helper/ContentPages/SubsectionHeadline.svelte';

  const dispatch = createEventDispatcher();

  export let selectedScenarios;
  export let scenarioPresets;
  export let selectedTimeframe;
  const currentPreset = writable(undefined);

  $: scenarioPresetsForCurrentTimeframe = scenarioPresets.filter(({ timeframe }) => timeframe === selectedTimeframe);

  function findPreset(selectedScenarios) {
    // Get a preset from the selected scenarios
    const preset = scenarioPresets.find(({ scenarios }) => selectedScenarios.length === scenarios.length && scenarios.every((scenario) => selectedScenarios.includes(scenario)));
    if (preset && preset[PRESET_ID]) {
      if ($currentPreset !== preset[PRESET_ID]) {
        currentPreset.set(preset[PRESET_ID]);
      }
    } else {
      currentPreset.set(undefined);
    }
  }

  $: findPreset(selectedScenarios); // We use a function here, because currentPreset would trigger this block too early

  $: {
    // Get the scenarios from a preset selection
    if ($currentPreset) {
      const preset = scenarioPresetsForCurrentTimeframe.find(({ [PRESET_ID]: id }) => id === $currentPreset);
      if (preset && preset.scenarios) {
        dispatch('selection', {
          scenarios: preset.scenarios,
        });
      }
    } else if (typeof $currentPreset === 'undefined') {
      dispatch('selection', {
        scenarios: [],
      });
    }
  }
  // Width of the content
  let widthContent = 0;

  function click(value) {
    if ($currentPreset === value) {
      currentPreset.set(undefined);
    } else {
      currentPreset.set(value);
    }
  }
</script>

{#if scenarioPresetsForCurrentTimeframe.length}
  <div>
    <SubsectionHeadline title="Scenarios" subtitle="Click on a research question and see the preselected scenarios that can answer it." slug="presets" />
    <SideScrollIndicator widthOfContent={widthContent} distanceLeft={0} distanceRight={0}>
      <div class="grid gap-x-2.5 min-w-min grid-rows-[auto_1fr]" style="grid-template-columns: repeat({scenarioPresetsForCurrentTimeframe.length * 2}, 1fr);" bind:clientWidth={widthContent}>
        {#each scenarioPresetsForCurrentTimeframe as { uid: value, description, title }}
          {@const checked = value === $currentPreset}
          <button
            {value}
            aria-pressed={checked}
            class="grid h-full px-2.5 min-w-[250px] gap-y-1 text-left rounded-sm aria-pressed:bg-theme-weakest hover:bg-surface-weaker/50 focus:outline-none focus:bg-surface-weaker"
            style="grid-template-rows: subgrid; grid-row: span 2;"
            on:click={() => click(value)}
          >
            <div class="grid py-2" style="grid-template-rows: subgrid; grid-row: span 2;">
              <span class="text-sm text-theme-base font-bold text-theme" class:text-theme-stronger={checked}>
                {title}
              </span>
              <span class="text-xs">{description}</span>
            </div>
          </button>
        {/each}
      </div>
    </SideScrollIndicator>
  </div>
{/if}
