<script>
  import ThresholdLevels from './ThresholdLevels/ThresholdLevels.svelte';
  import StudyLocations from './StudyLocations/StudyLocations.svelte';
  import CurrentStatus from './CurrentStatus/CurrentStatus.svelte';
  import ScrollContent from '$lib/helper/ScrollContent/ScrollContent.svelte';
  import SimpleNav from '$lib/helper/ScrollContent/SimpleNav.svelte';
  import { IS_COMBINATION_AVAILABLE, IS_EMPTY_SELECTION } from '$stores/state';
  import FallbackMessage from '$lib/helper/FallbackMessage.svelte';
  import SelectionCertaintyLevels from './Selection/CertaintyLevels/CertaintyLevels.svelte';
  import SelectionStudyLocations from './Selection/StudyLocations/StudyLocations.svelte';
  import { writable } from 'svelte/store';

  $: isValidSelection = !$IS_EMPTY_SELECTION && $IS_COMBINATION_AVAILABLE;

  let THRESHOLD_LEVELS_DATA = writable({});

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
    <CurrentStatus />
    <SelectionCertaintyLevels />
    <SelectionStudyLocations />
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
