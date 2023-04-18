<script>
  import { CURRENT_SCENARIOS_UID } from '$stores/state.js';
  import CheckboxInput from '$lib/helper/CheckboxInput.svelte';
  import { groupBy } from 'lodash-es';
  import Tagline from '$lib/helper/Tagline.svelte';

  export let scenarios;
  export let hoveredScenarioUid;
  export let highlightedScenarioUid;
  export let currentFilterUid;

  const scenarioWarmingCategories = [
    { uid: '1p5', label: '2050 warming around 1.5°C' },
    { uid: 'medium', label: 'Medium 2050 warming' },
    { uid: 'high', label: 'High 2050 warming' },
  ];

  $: scenariosByCategory = scenarioWarmingCategories.map((category) => ({
    ...category,
    scenarios: scenarios.filter((s) => s.warmingCategory === category.uid),
  }));
</script>

{#each scenariosByCategory as category}
  {#if category.scenarios.length}
    <Tagline class="px-4 mt-3">{category.label}</Tagline>
  {/if}
  {#each category.scenarios as scenario}
    <!-- svelte-ignore a11y-label-has-associated-control -->
    <label
      on:focus={() => (hoveredScenarioUid = scenario.uid)}
      on:mouseover={() => (hoveredScenarioUid = scenario.uid)}
      on:mouseleave={() => (hoveredScenarioUid = null)}
      class="pl-4 pr-2 py-1.5 border-l-3 whitespace-nowrap"
      class:bg-background-weaker={highlightedScenarioUid === scenario.uid}
      class:border-theme-base={scenario.isSelected}
      class:border-transparent={!scenario.isSelected}
    >
      <CheckboxInput
        name="scenarios"
        value={scenario.uid}
        checked={scenario.isSelected}
        on:change={() =>
          CURRENT_SCENARIOS_UID.toggle(scenario.uid, currentFilterUid)}
        on:focus={() => (hoveredScenarioUid = scenario)}
      />
      {scenario.label}
      <span
        class="w-3 h-3 rounded-full inline-block"
        style={`background: ${scenario.color};`}
      />
    </label>
  {/each}
{/each}
