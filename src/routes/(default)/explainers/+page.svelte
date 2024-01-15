<script>
  import ScrollContent from '$lib/helper/ScrollContent/ScrollContent.svelte';
  import NestedNav from '$lib/helper/ScrollContent/NestedNav.svelte';
  import Scenarios from './Scenarios/Scenarios.svelte';
  import ScenariosIntro from './Scenarios/ScenariosIntro.svelte';
  import PageIntro from '$lib/site/PageIntro.svelte';
  import { ANCHOR_EXPLAINER_SCENARIOS, LABEL_EXPLAINERS } from '$config';
  export let data;

  $: ({ scenarios, selectableTimeframes, defaultTimeframe, scenarioPresets, content } = data);

  $: sections = [
    {
      props: {
        slug: ANCHOR_EXPLAINER_SCENARIOS,
        title: 'Scenarios',
      },
      component: ScenariosIntro,
      content: true,
      sections: [{ component: Scenarios, props: { scenarios, selectableTimeframes, defaultTimeframe, scenarioPresets } }],
    },
  ];
</script>

<PageIntro>
  <div class="flex flex-col gap-y-3.5">
    <h1 class="text-4xl font-bold">{LABEL_EXPLAINERS}</h1>
    <p class="max-w-xl">Learn more about key concepts in the Climate risk dashboard.</p>
  </div>
</PageIntro>

<ScrollContent isFullWidth={true} {sections}>
  <NestedNav slot="navigation" {sections} />
  {#each sections as section}
    <section class="pb-12 mb-12 border-b border-contour-weakest last:border-0 last:mb-0">
      <svelte:component this={section.component} {...section.props} />
      {#each section.sections as part}
        <svelte:component this={part.component} {...part.props} />
      {/each}
    </section>
  {/each}
</ScrollContent>
