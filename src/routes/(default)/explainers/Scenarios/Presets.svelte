<script>
  import { RadioGroup, RadioGroupOption } from '@rgossiaux/svelte-headlessui';
  import { createEventDispatcher } from 'svelte';
  import { writable } from 'svelte/store';
  import { KEY_SCENARIOPRESET_UID as PRESET_ID } from '$config';
  import Tagline from '$lib/helper/Tagline.svelte';
  import SideScrollIndicator from '$lib/helper/SideScrollIndicator.svelte';

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
    }
  }
  // Width of the content
  let widthContent = 0;
</script>

{#if scenarioPresetsForCurrentTimeframe.length}
  <div>
    <Tagline class="mb-2">Scenario Presets</Tagline>
    <RadioGroup bind:value={$currentPreset}>
      <SideScrollIndicator
        widthOfContent={widthContent}
        distanceLeft={0}
        distanceRight={0}
      >
        <div
          class="grid gap-x-2.5 min-w-min grid-rows-[auto_1fr]"
          style="grid-template-columns: repeat({scenarioPresetsForCurrentTimeframe.length * 2}, 1fr);"
          bind:clientWidth={widthContent}
        >
          {#each [...scenarioPresetsForCurrentTimeframe, ...scenarioPresetsForCurrentTimeframe] as { uid: value, description, title }}
            <RadioGroupOption
              {value}
              let:checked
              class=" grid  h-full gap-y-1 "
              style="grid-template-rows: subgrid; grid-row: span 2;"
            >
              <div
                aria-selected={checked}
                class="grid min-w-[250px] aria-selected:bg-theme-weakest hover:bg-surface-weaker/50 px-2.5 py-2 rounded-sm"
                style="grid-template-rows: subgrid; grid-row: span 2;"
              >
                <span
                  class="text-sm text-theme-base font-bold text-theme"
                  class:text-theme-stronger={checked}>{title}</span
                >
                <span class="text-xs">{description}</span>
              </div>
            </RadioGroupOption>
          {/each}
        </div>
      </SideScrollIndicator>
    </RadioGroup>
  </div>
{/if}
