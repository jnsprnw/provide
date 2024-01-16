<script>
  import ModelSection from './ModelSection.svelte';
  import ScenarioSection from './BaseSection.svelte';
  import SectionIntro from './SectionIntro.svelte';
  import ContentPageLayout from '$lib/helper/ContentPages/ContentPageLayout.svelte';
  import { ANCHOR_DOCS_SCENARIOS, ANCHOR_DOCS_MODELS, ANCHOR_DOCS_DATA_PROCESSING, LABEL_DOCUMENTATION } from '$config';

  export let data;

  $: ({ modelsIntro, models, scenarios, scenariosIntro, dataProcessing, dataProcessingIntro } = data.content);

  $: sections = [
    {
      props: {
        slug: ANCHOR_DOCS_SCENARIOS,
        title: 'Scenarios',
      },
      component: SectionIntro,
      content: scenariosIntro,
      sections: [
        // {
        //   title: 'Scenario finder',
        //   slug: 'scenario-finder',
        //   component: ScenarioSelector,
        //   scenarios: $SCENARIOS,
        // },
        ...scenarios.map((s) => ({ component: ScenarioSection, props: s })),
      ],
    },
    {
      props: {
        slug: ANCHOR_DOCS_MODELS,
        title: 'Models',
      },
      component: SectionIntro,
      content: modelsIntro,
      sections: models.map((m) => ({ component: ModelSection, props: m })),
    },
    {
      props: {
        slug: ANCHOR_DOCS_DATA_PROCESSING,
        title: 'Data processing',
      },
      component: SectionIntro,
      content: dataProcessingIntro,
      sections: dataProcessing,
    },
  ];
</script>

<ContentPageLayout {sections} title={LABEL_DOCUMENTATION} intro="Learn more about the methodology and the models used to create the data visualised on this dashboard." />
