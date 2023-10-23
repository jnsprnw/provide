<script>
  import { CURRENT_SCENARIOS_UID } from '$stores/state.js';
  import tooltip from '$lib/utils/tooltip';
  import CheckboxInput from '$lib/helper/CheckboxInput.svelte';
  import Tagline from '$lib/helper/Tagline.svelte';

  export let scenarios;
  export let hoveredScenarioUid;
  export let highlightedScenarioUid;
  export let currentFilterUid;

  const scenarioWarmingCategories = [
    { uid: '1p5', label: 'Paris Agreement consistent up to 2050' },
    { uid: 'medium', label: 'Temperature rise above 1.5°C' },
    { uid: 'high', label: 'Temperature well above 1.5°C' },
  ];

  $: scenariosByCategory = scenarioWarmingCategories.map((category) => ({
    ...category,
    scenarios: scenarios.filter((s) => s.warmingCategory === category.uid),
  }));

  $: console.log({ scenarios });

  function hoverItem(scenario) {
    if (!scenario.disabled) {
      hoveredScenarioUid = scenario.uid;
    }
  }
</script>

{#each scenariosByCategory as category}
  {#if category.scenarios.length}
    <Tagline class="px-4 mt-3 whitespace-nowrap">{category.label}</Tagline>
  {/if}
  {#each category.scenarios as scenario}
    <!-- svelte-ignore a11y-label-has-associated-control -->
    <label
      use:tooltip={{ content: scenario.disabled ? 'This scenario is not available for the selected indicator' : undefined }}
      on:focus={() => hoverItem(scenario)}
      on:mouseover={() => hoverItem(scenario)}
      class="block pl-4 pr-2 py-1.5 border-l-3 whitespace-nowrap grid grid-cols-[auto_1fr_auto] gap-x-2 items-center aria-disabled:text-contour-weakest aria-disabled:cursor-not-allowed"
      class:bg-surface-weaker={highlightedScenarioUid === scenario.uid}
      class:border-theme-base={scenario.isSelected}
      class:border-transparent={!scenario.isSelected}
      aria-disabled={scenario.disabled}
    >
      <CheckboxInput
        class="aria-disabled:cursor-not-allowed aria-disabled:border-red-500"
        name="scenarios"
        disabled={scenario.disabled}
        value={scenario.uid}
        checked={scenario.isSelected}
        on:change={() => CURRENT_SCENARIOS_UID.toggle(scenario.uid, currentFilterUid)}
        on:focus={() => (hoveredScenarioUid = scenario)}
      />
      <span>{scenario.label}</span>
      <span
        class="w-3 h-3 rounded-full inline-block"
        style={`background: ${scenario.color};`}
      />
    </label>
  {/each}
{/each}
