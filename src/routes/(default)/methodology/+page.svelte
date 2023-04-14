<script>
  import ModelSection from './ModelSection.svelte';
  import ScenarioSection from './BaseSection.svelte';
  import SectionIntro from './SectionIntro.svelte';
  import ScrollContent from '$lib/helper/ScrollContent/ScrollContent.svelte';
  import NestedNav from '$lib/helper/ScrollContent/NestedNav.svelte';
  import { SCENARIOS } from '$stores/meta';
  import ScenarioSelector from './ScenarioSelector.svelte';

  export let data;

  $: ({
    modelsIntro,
    models,
    scenarios,
    scenariosIntro,
    dataProcessing,
    dataProcessingIntro,
  } = data.content);

  $: sections = [
    {
      slug: 'models',
      title: 'Models',
      component: SectionIntro,
      content: modelsIntro,
      sections: models.map((m) => ({ ...m, component: ModelSection })),
    },
    {
      slug: 'scenarios',
      title: 'Scenarios',
      component: SectionIntro,
      content: scenariosIntro,
      sections: [
        {
          title: 'Scenario finder',
          slug: 'scenario-finder',
          component: ScenarioSelector,
          scenarios: $SCENARIOS,
        },
        ...scenarios.map((s) => ({ ...s, component: ScenarioSection })),
      ],
    },
    {
      slug: 'data-processing',
      title: 'Data processing',
      component: SectionIntro,
      content: dataProcessingIntro,
      sections: dataProcessing,
    },
  ];

  const query = 'waypoint';
</script>

<svelte:head>
  <title>Documentation</title>
</svelte:head>

<ScrollContent query={`.${query}`} let:index>
  <NestedNav slot="navigation" {sections} {index} />
  <h1 class="text-5xl font-bold mb-12">Documentation</h1>
  {#each sections as section}
    <section class="mb-8">
      <svelte:component this={section.component} {query} {...section} />
      {#each section.sections as part}
      <svelte:component this={part.component} {query} {...part} />
      {/each}
    </section>
  {/each}
</ScrollContent>
