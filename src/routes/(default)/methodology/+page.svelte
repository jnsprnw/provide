<script>
  import ModelSection from './ModelSection.svelte';
  import ScenarioSection from './BaseSection.svelte';
  import SectionIntro from './SectionIntro.svelte';
  import ScrollContent from '$lib/helper/ScrollContent/ScrollContent.svelte';
  import NestedNav from '$lib/helper/ScrollContent/NestedNav.svelte';
  import { ANCHOR_DOCS_SCENARIOS, ANCHOR_DOCS_MODELS, ANCHOR_DOCS_DATA_PROCESSING, LABEL_DOCUMENTATION } from '$config';
  import PageIntro from '$lib/site/PageIntro.svelte';
  import { SCENARIOS } from '$stores/meta';
  import ScenarioSelector from './ScenarioSelector.svelte';

  export let data;

  $: ({ modelsIntro, models, scenarios, scenariosIntro, dataProcessing, dataProcessingIntro } = data.content);

  $: sections = [
    {
      slug: ANCHOR_DOCS_SCENARIOS,
      title: 'Scenarios',
      component: SectionIntro,
      content: scenariosIntro,
      sections: [
        // {
        //   title: 'Scenario finder',
        //   slug: 'scenario-finder',
        //   component: ScenarioSelector,
        //   scenarios: $SCENARIOS,
        // },
        ...scenarios.map((s) => ({ ...s, component: ScenarioSection })),
      ],
    },
    {
      slug: ANCHOR_DOCS_MODELS,
      title: 'Models',
      component: SectionIntro,
      content: modelsIntro,
      sections: models.map((m) => ({ ...m, component: ModelSection })),
    },
    {
      slug: ANCHOR_DOCS_DATA_PROCESSING,
      title: 'Data processing',
      component: SectionIntro,
      content: dataProcessingIntro,
      sections: dataProcessing,
    },
  ];
</script>

<PageIntro>
  <div class="flex flex-col gap-y-3.5">
    <h1 class="text-4xl font-bold">{ LABEL_DOCUMENTATION }</h1>
    <p class="max-w-xl">How do you avoid important climate impact thresholds in your city? Understand the risks and make your city more resilient to the impacts of climate change.</p>
  </div>
</PageIntro>

<ScrollContent>
  <NestedNav slot="navigation" {sections} />
  {#each sections as section}
    <section class="mb-8">
      <svelte:component this={section.component} {...section} />
      {#each section.sections as part}
        <svelte:component this={part.component} {...part} />
      {/each}
    </section>
  {/each}
</ScrollContent>
