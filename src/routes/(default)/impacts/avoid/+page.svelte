<script>
  import ThresholdLevels from './ThresholdLevels/ThresholdLevels.svelte';
  import StudyLocations from './StudyLocations/StudyLocations.svelte';
  import UnAvoidableRisk from '../UnavoidableRisk/UnavoidableRisk.svelte';
  import Reference from './Reference/Reference.svelte';
  import ScrollContent from '$lib/helper/ScrollContent/ScrollContent.svelte';
  import SimpleNav from '$lib/helper/ScrollContent/SimpleNav.svelte';
  import { IS_COMBINATION_AVAILABLE, IS_EMPTY_SELECTION, SELECTABLE_SCENARIOS } from '$stores/state';
  import { IS_EMPTY_LEVEL_OF_IMPACT, IS_EMPTY_LIKELIHOOD_LEVEL } from '$stores/avoid.js';
  import { SCENARIOS_IN_AVOIDING_IMPACTS, KEY_SCENARIO_TIMEFRAME } from '$config';
  import THEME from '$styles/theme-store.js';
  import FallbackMessage from '$lib/helper/FallbackMessage.svelte';
  import SelectionCertaintyLevels from './Selection/CertaintyLevels/CertaintyLevels.svelte';
  import SelectionStudyLocations from './Selection/StudyLocations/StudyLocations.svelte';
  import { writable } from 'svelte/store';

  $: isValidSelection = !$IS_EMPTY_SELECTION && $IS_COMBINATION_AVAILABLE && !$IS_EMPTY_LEVEL_OF_IMPACT && !$IS_EMPTY_LIKELIHOOD_LEVEL;

  let THRESHOLD_LEVELS_DATA = writable({});
  let REFERENCE_STORE = writable({});

  $: currentScenarios = SCENARIOS_IN_AVOIDING_IMPACTS.map((uid) => $SELECTABLE_SCENARIOS.find((scenario) => scenario.uid === uid))
    .filter(Boolean)
    .map(({ uid, label, [KEY_SCENARIO_TIMEFRAME]: timeframe }, i) => ({ uid, label, [KEY_SCENARIO_TIMEFRAME]: timeframe, color: $THEME.color.category.base[i] }));

  $: sections = [
    { component: FallbackMessage, disabled: isValidSelection },
    {
      slug: 'threshold-levels',
      title: 'Impact Level',
      description: 'When will the impact level be exceeded?',
      component: ThresholdLevels,
      disabled: !isValidSelection,
      props: {
        store: THRESHOLD_LEVELS_DATA,
        tagline: 'Impact Level',
      },
    },
    {
      slug: 'locations',
      title: 'Locations',
      description: 'When will the impact level be exceeded across different locations?',
      component: StudyLocations,
      disabled: !isValidSelection,
      props: {
        store: THRESHOLD_LEVELS_DATA,
        tagline: 'Locations',
      },
    },
    // {
    //   slug: 'unavoidable-risk',
    //   title: '(Un)avoidable risk',
    //   description: 'What can be avoided through emissions reductions?',
    //   component: UnAvoidableRisk,
    //   disabled: !isValidSelection,
    //   props: {
    //     currentScenarios: currentScenarios,
    //   },
    // },
  ];
</script>

<ScrollContent let:query {sections} isFullWidth={true} hasActiveScetionBar={true}>
  <aside slot="navigation" class="flex flex-col gap-4 pb-24">
    <div class="mr-2 mb-2 border-b border-contour-weakest pb-6 flex flex-col gap-y-6 pr-6 lg:pr-12">
      <Reference store={REFERENCE_STORE} />
      <SelectionCertaintyLevels />
      <SelectionStudyLocations />
    </div>
    <SimpleNav {sections} />
  </aside>
  {#each sections as section}
    {#if !section.disabled}
      <section id={section.slug} name={section.slug} class="scroll-mt-4 mb-16 {query} border-b pb-14 border-contour-weaker last:border-none">
        <svelte:component this={section.component} {...section.props} />
      </section>
    {/if}
  {/each}
</ScrollContent>
