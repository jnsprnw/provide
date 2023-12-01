<script>
  import ImpactTime from './ImpactTime/ImpactTime.svelte';
  import ImpactGeo from './ImpactGeo/ImpactGeo.svelte';
  import UnAvoidableRisk from '../UnavoidableRisk/UnavoidableRisk.svelte';
  import ScenarioSelection from './ScenarioSelection/ScenarioSelection.svelte';
  import ScrollContent from '$lib/helper/ScrollContent/ScrollContent.svelte';
  import SimpleNav from '$lib/helper/ScrollContent/SimpleNav.svelte';
  import { IS_COMBINATION_AVAILABLE, IS_EMPTY_SELECTION } from '$stores/state';
  import FallbackMessage from '$lib/helper/FallbackMessage.svelte';
  import { writable } from 'svelte/store';

  $: isValidSelection = !$IS_EMPTY_SELECTION && $IS_COMBINATION_AVAILABLE;
  let UNAVOIDABLE_RISK_STORE = writable({}); // For some very strange reason the store needs to be passed as a prop to the chart. It does not update when it is defined inside the component.

  $: sections = [
    {
      slug: 'impact-time',
      title: 'Timing',
      description: 'How will this climate impact change?',
      component: ImpactTime,
      disabled: !isValidSelection,
    },
    {
      slug: 'impact-geo',
      title: 'Location',
      description: 'Where will impacts hit the hardest?',
      component: ImpactGeo,
      disabled: !$IS_COMBINATION_AVAILABLE,
    },
    {
      slug: 'unavoidable-risk',
      title: '(Un)avoidable risk',
      description: 'What can be avoided through emissions reductions?',
      component: UnAvoidableRisk,
      disabled: !$IS_COMBINATION_AVAILABLE,
      props: {
        store: UNAVOIDABLE_RISK_STORE,
      },
    },
    // {
    //   slug: 'unavoidable-risk',
    //   title: 'Benefits of mitigation',
    //   description: 'How could we benefit from accelerated emissions reductions?',
    //   component: UnAvoidableRisk,
    //   disabled: !$IS_COMBINATION_AVAILABLE,
    // },
    // {
    //   slug: 'unavoidable-risk',
    //   title: 'What can we reverse?',
    //   description: 'How much damage could be reversed once it is done?',
    //   component: UnAvoidableRisk,
    //   disabled: !$IS_COMBINATION_AVAILABLE,
    // },
    { component: FallbackMessage, disabled: isValidSelection },
  ];
</script>

<svelte:head>
  <title>Explore Impacts</title>
</svelte:head>

<ScrollContent
  let:query
  {sections}
  isFullWidth={true}
  hasActiveScetionBar={true}
>
  <nav
    slot="navigation"
    class="flex flex-col gap-4"
  >
    <ScenarioSelection />
    <SimpleNav {sections} />
  </nav>
  {#each sections as section}
    {#if !section.disabled}
      <section
        id={section.slug}
        name={section.slug}
        class="scroll-mt-4 mb-16 {query} border-b pb-14 border-contour-weaker last:border-none"
      >
        <svelte:component
          this={section.component}
          title={section.title}
          {...section.props}
        />
      </section>
    {/if}
  {/each}
</ScrollContent>
