<script>
  import { CURRENT_SCENARIOS_UID } from '$stores/state.js';
  import tooltip from '$lib/utils/tooltip';
  import CheckboxInput from '$lib/helper/CheckboxInput.svelte';
  import Tagline from '$lib/helper/Tagline.svelte';
  import Primary from '$lib/helper/icons/Primary.svelte';

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
    {@const isSelected = scenario.isSelected}
    {@const isDisabled = scenario.disabled}
    {@const uid = scenario.uid}
    <!-- svelte-ignore a11y-label-has-associated-control -->
    <label
      use:tooltip={{ content: isDisabled ? 'This scenario is not available for the selected indicator' : undefined, delay: [200, 0] }}
      on:focus={() => hoverItem(scenario)}
      on:mouseover={() => hoverItem(scenario)}
      class="transition-colors pl-4 pr-2 py-1.5 border-r-3 whitespace-nowrap grid grid-cols-[auto_1fr_auto] gap-x-2 items-center aria-disabled:text-contour-weakest aria-disabled:cursor-not-allowed"
      class:bg-surface-weaker={highlightedScenarioUid === uid}
      class:border-theme-base={isSelected}
      class:border-transparent={!isSelected}
      style="border-right-color: {scenario.color ?? 'transparent'};"
      aria-disabled={isDisabled}
    >
      <CheckboxInput
        class="aria-disabled:cursor-not-allowed aria-disabled:border-red-500"
        style="accent-color: {scenario.color ?? 'transparent'}"
        name="scenarios"
        disabled={isDisabled}
        value={uid}
        checked={isSelected}
        on:change={() => CURRENT_SCENARIOS_UID.toggle(uid, currentFilterUid)}
        on:focus={() => (hoveredScenarioUid = scenario)}
      />
      <span
        class="transition-colors"
        class:font-bold={isSelected}
        class:text-theme-base={isSelected}>{scenario.label}</span
      >
      {#if scenario.isPrimary}
        <Primary
          {isSelected}
          {isDisabled}
        />
      {/if}
    </label>
  {/each}
{/each}
