<script>
  import ImpactTime from './ImpactTime/ImpactTime.svelte';
  import ImpactGeo from './ImpactGeo/ImpactGeo.svelte';
  import UnAvoidableRisk from '../UnavoidableRisk/UnavoidableRisk.svelte';
  import ScenarioSelection from './ScenarioSelection/ScenarioSelection.svelte';
  import ScrollContent from '$lib/helper/ScrollContent/ScrollContent.svelte';
  import SimpleNav from '$lib/helper/ScrollContent/SimpleNav.svelte';
  import { IS_COMBINATION_AVAILABLE, IS_EMPTY_SELECTION } from '$stores/state';
  import FallbackMessage from '$lib/helper/FallbackMessage.svelte';

  $: isValidSelection = !$IS_EMPTY_SELECTION && $IS_COMBINATION_AVAILABLE;

  $: sections = [
    {
      slug: 'impact-time',
      title: 'Timing',
      description: 'How will this climate impact change?',
      component: ImpactTime,
      disabled: !isValidSelection,
      props: {
        tagline: 'Timing',
      },
    },
    {
      slug: 'impact-geo',
      title: 'Location',
      description: 'Where will impacts hit the hardest?',
      component: ImpactGeo,
      disabled: !isValidSelection,
      props: {
        tagline: 'Location',
      },
    },
    {
      slug: 'unavoidable-risk',
      title: '(Un)avoidable risk',
      description: 'What can be avoided through emissions reductions?',
      component: UnAvoidableRisk,
      disabled: !isValidSelection,
      props: {
        tagline: '(Un)avoidable risk',
      },
    },
    { component: FallbackMessage, disabled: isValidSelection },
  ];
</script>

<ScrollContent let:query {sections} isFullWidth={true} hasActiveScetionBar={true}>
  <nav slot="navigation" class="flex flex-col gap-4">
    <ScenarioSelection />
    <SimpleNav {sections} />
  </nav>
  {#each sections as section}
    {#if !section.disabled}
      <section id={section.slug} name={section.slug} class="scroll-mt-4 mb-16 {query} pb-14 border-contour-weakest border-b last:border-none">
        <svelte:component this={section.component} {...section.props} />
      </section>
    {/if}
  {/each}
</ScrollContent>
