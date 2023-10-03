<script>
  import { RadioGroup, RadioGroupOption } from '@rgossiaux/svelte-headlessui';
  import { createEventDispatcher } from 'svelte';
  import { writable } from 'svelte/store';

  const dispatch = createEventDispatcher();

  export let selectedScenarios;
  const currentPreset = writable(undefined);

  const KEY_UID = 'title';

  const presets = [
    {
      title: '1.5° vs stabilisation',
      description: 'Explore the difference between permanently exceeding 1.5°C and stabilising at a higher level.',
      scenarios: ['curpol', 'curpol-os', 'curpol-sap', 'gs', 'gs-nzghg', 'sp', 'sp-nzghg'],
    },
    {
      title: 'Reversibility',
      description: 'Explore the reversibility  of climate change.',
      scenarios: ['modact-os-1.5c', 'modact-os-1c', 'modact-sap'],
    },
    {
      title: 'Societal risks',
      description: 'Explore differences in societal risks for similar 1.5°C compatible pathways.',
      scenarios: ['ld-nzghg', 'ssp119', 'ssp119-extended'],
    },
    {
      title: 'Peak levels',
      description: 'Look at the effects of overshoot reversibility on different levels of peak warming',
      scenarios: ['ssp534-over-extended', 'ref-1p5', 'ref-1p5-extended'],
    },
  ];

  function findPreset(selectedScenarios) {
    // Get a preset from the selected scenarios
    const preset = presets.find(({ scenarios }) => selectedScenarios.length === scenarios.length && scenarios.every((scenario) => selectedScenarios.includes(scenario)));
    if (preset && preset[KEY_UID]) {
      if ($currentPreset !== preset[KEY_UID]) {
        currentPreset.set(preset[KEY_UID]);
      }
    } else {
      currentPreset.set(undefined);
    }
  }

  $: findPreset(selectedScenarios); // We use a function here, because currentPreset would trigger this block too early

  $: {
    // Get the scenarios from a preset selection
    if ($currentPreset) {
      const preset = presets.find(({ [KEY_UID]: id }) => id === $currentPreset);
      if (preset && preset.scenarios) {
        dispatch('selection', {
          scenarios: preset.scenarios,
        });
      }
    }
  }
</script>

<RadioGroup bind:value={$currentPreset} class="my-6 grid gap-x-2.5" style="grid-template-columns: repeat({presets.length}, minmax(0, 1fr));">
  {#each presets as preset}
    <RadioGroupOption value={preset[KEY_UID]} let:checked>
      <div class:bg-surface-weaker={checked} class="grid hover:bg-surface-weaker/50 grid-rows-[auto_1fr] h-full gap-y-1 px-2.5 py-2">
        <span class="text-sm text-theme-base font-bold">{preset.title}</span>
        <span class="text-xs">{preset.description}</span>
      </div>
    </RadioGroupOption>
  {/each}
</RadioGroup>
