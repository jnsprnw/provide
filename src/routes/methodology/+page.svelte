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

  $: flatSections = sections.reduce(
    (acc, item) => [...acc, item, ...item.sections],
    []
  );

  const query = 'waypoint';
</script>

<svelte:head>
  <title>Documentation</title>
</svelte:head>

<ScrollContent query={`.${query}`} let:index>
  <NestedNav slot="navigation" {sections} {index} />
  <h2 class="text-5xl font-bold mb-14">Documentation</h2>
  {#each flatSections as section}
    <svelte:component this={section.component} {query} {...section} />
  {/each}
</ScrollContent>
