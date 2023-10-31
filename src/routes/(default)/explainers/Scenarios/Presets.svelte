<script>
  import { RadioGroup, RadioGroupOption } from '@rgossiaux/svelte-headlessui';
  import { createEventDispatcher } from 'svelte';
  import { writable } from 'svelte/store';
  import { KEY_SCENARIOPRESET_UID as PRESET_ID } from '$config';

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
</script>

<RadioGroup
  bind:value={$currentPreset}
  class="my-6 grid gap-x-2.5"
  style="grid-template-columns: repeat({scenarioPresetsForCurrentTimeframe.length}, minmax(0, 1fr));"
>
  {#each scenarioPresetsForCurrentTimeframe as { uid: value, description, title }}
    <RadioGroupOption
      {value}
      let:checked
    >
      <div
        class:bg-surface-weaker={checked}
        class="grid hover:bg-surface-weaker/50 grid-rows-[auto_1fr] h-full gap-y-1 px-2.5 py-2"
      >
        <span class="text-sm text-theme-base font-bold">{title}</span>
        <span class="text-xs">{description}</span>
      </div>
    </RadioGroupOption>
  {/each}
</RadioGroup>
