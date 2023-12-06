<script>
  import SectionHeadline from '$lib/helper/ContentPages/SectionHeadline.svelte';
  import TermSection from './TermSection.svelte';
  import ScrollContent from '$lib/helper/ScrollContent/ScrollContent.svelte';
  import NestedNav from '$lib/helper/ScrollContent/NestedNav.svelte';
  import Scenarios from './Scenarios/Scenarios.svelte';
  import ScenariosIntro from './Scenarios/ScenariosIntro.svelte';
  import PageIntro from '$lib/site/PageIntro.svelte';
  import { ANCHOR_EXPLAINER_SCENARIOS } from '$config';
  export let data;

  $: ({ scenarios, selectableTimeframes, defaultTimeframe, scenarioPresets } = data);

  $: sections = [
    {
      slug: ANCHOR_EXPLAINER_SCENARIOS,
      title: 'Scenarios',
      component: ScenariosIntro,
      sections: [{ component: Scenarios, scenarios, selectableTimeframes, defaultTimeframe, scenarioPresets }],
    },
    ...data.content.map(({ title, slug, sections }) => ({
      slug,
      title,
      component: SectionHeadline,
      sections: sections.map((s) => ({ ...s, component: TermSection })),
    })),
  ];
</script>

<PageIntro>
  <div class="flex flex-col gap-y-3.5">
    <h1 class="text-4xl font-bold">Explainers</h1>
    <p class="max-w-xl">Learn more about key concepts in the Climate risk dashboard.</p>
  </div>
</PageIntro>

<ScrollContent isFullWidth={true}>
  <NestedNav
    slot="navigation"
    {sections}
  />
  {#each sections as section}
    <section class="mb-8">
      <svelte:component
        this={section.component}
        {...section}
      />
      {#each section.sections as part}
        <svelte:component
          this={part.component}
          {...part}
        />
      {/each}
    </section>
  {/each}
</ScrollContent>
