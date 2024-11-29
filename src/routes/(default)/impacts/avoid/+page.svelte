<script>
  import ThresholdLevels from './ThresholdLevels/ThresholdLevels.svelte';
  import StudyLocations from './StudyLocations/StudyLocations.svelte';
  import Reference from './Reference/Reference.svelte';
  import ScrollContent from '$lib/helper/ScrollContent/ScrollContent.svelte';
  import SimpleNav from '$lib/helper/ScrollContent/SimpleNav.svelte';
  import { IS_COMBINATION_AVAILABLE, IS_EMPTY_SELECTION } from '$stores/state';
  import { IS_EMPTY_LEVEL_OF_IMPACT, IS_EMPTY_LIKELIHOOD_LEVEL } from '$stores/avoid.js';
  import FallbackMessage from '$lib/helper/FallbackMessage.svelte';
  import SelectionCertaintyLevels from './Selection/CertaintyLevels/CertaintyLevels.svelte';
  import SelectionStudyLocations from './Selection/StudyLocations/StudyLocations.svelte';
  import { writable } from 'svelte/store';
  import QuizButton from '$src/lib/helper/QuizButton.svelte';

  $: isValidSelection = !$IS_EMPTY_SELECTION && $IS_COMBINATION_AVAILABLE && !$IS_EMPTY_LEVEL_OF_IMPACT && !$IS_EMPTY_LIKELIHOOD_LEVEL;

  let THRESHOLD_LEVELS_DATA = writable({});
  let REFERENCE_STORE = writable({});

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
    <div class="md:pr-6 lg:pr-10">
      <hr class="pb-6 mt-4" />
      <QuizButton />
    </div>
  </aside>
  {#each sections as section}
    {#if !section.disabled}
      <section id={section.slug} name={section.slug} class="scroll-mt-4 mb-16 {query} border-b pb-14 border-contour-weaker last:border-none">
        <svelte:component this={section.component} {...section.props} />
      </section>
    {/if}
  {/each}
</ScrollContent>
