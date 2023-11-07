<script>
  import ThresholdLevels from './ThresholdLevels/ThresholdLevels.svelte';
  import StudyLocations from './StudyLocations/StudyLocations.svelte';
  import UnAvoidableRisk from '../UnavoidableRisk/UnavoidableRisk.svelte';
  import Reference from './Reference/Reference.svelte';
  import ScrollContent from '$lib/helper/ScrollContent/ScrollContent.svelte';
  import SimpleNav from '$lib/helper/ScrollContent/SimpleNav.svelte';
  import { IS_COMBINATION_AVAILABLE, IS_EMPTY_SELECTION, SELECTABLE_SCENARIOS } from '$stores/state';
  import { SCENARIOS_IN_AVOIDING_IMPACTS, KEY_SCENARIO_TIMEFRAME } from '$config';
  import THEME from '$styles/theme-store.js';
  import FallbackMessage from '$lib/helper/FallbackMessage.svelte';
  import SelectionCertaintyLevels from './Selection/CertaintyLevels/CertaintyLevels.svelte';
  import SelectionStudyLocations from './Selection/StudyLocations/StudyLocations.svelte';
  import { writable } from 'svelte/store';

  $: isValidSelection = !$IS_EMPTY_SELECTION && $IS_COMBINATION_AVAILABLE;

  let THRESHOLD_LEVELS_DATA = writable({});

  $: currentScenarios = SCENARIOS_IN_AVOIDING_IMPACTS.map((uid) => $SELECTABLE_SCENARIOS.find((scenario) => scenario.uid === uid))
    .filter(Boolean)
    .map(({ uid, label, [KEY_SCENARIO_TIMEFRAME]: timeframe }, i) => ({ uid, label, [KEY_SCENARIO_TIMEFRAME]: timeframe, color: $THEME.color.category.base[i] }));

  $: sections = [
    {
      slug: 'threshold-levels',
      title: 'Threshold levels',
      description: 'Lorem ipsum dolor dolor dolor',
      component: ThresholdLevels,
      store: THRESHOLD_LEVELS_DATA,
    },
    {
      slug: 'locations',
      title: 'Locations',
      description: 'Lorem ipsum dolor dolor dolor',
      component: StudyLocations,
      store: THRESHOLD_LEVELS_DATA,
    },
    {
      slug: 'unavoidable-risk',
      title: 'Avoidable vs. unavoidable',
      description: 'What can be avoided through emissions reductions?',
      component: UnAvoidableRisk,
      disabled: !$IS_COMBINATION_AVAILABLE,
      currentScenarios: currentScenarios,
    },
  ];
</script>

<svelte:head>
  <title>Avoiding Impacts</title>
</svelte:head>

<ScrollContent
  let:query
  {sections}
  isFullWidth={true}
  navContainerClass="md:border-r border-contour-weaker"
>
  <aside
    slot="navigation"
    class="flex flex-col gap-4"
  >
    <div class="mr-2 mb-2 border-b border-contour-weakest pb-6 flex flex-col">
      <Reference />
      <SelectionCertaintyLevels />
      <SelectionStudyLocations />
    </div>
    <SimpleNav {sections} />
  </aside>
  {#each sections as section}
    {#if !section.disabled}
      <section
        id={section.slug}
        name={section.slug}
        class="scroll-mt-4 mb-16 {query} border-b pb-14 border-contour-weaker last:border-none"
      >
        <svelte:component
          this={section.component}
          {...section}
        />
      </section>
    {/if}
  {/each}
</ScrollContent>
