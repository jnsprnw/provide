<script>
  import Scenarios from './Scenarios/Scenarios.svelte';
  import ScenariosIntro from './Scenarios/ScenariosIntro.svelte';
  import ContentPageLayout from '$lib/helper/ContentPages/ContentPageLayout.svelte';
  import { ANCHOR_EXPLAINER_SCENARIOS, LABEL_EXPLAINERS } from '$config';
  export let data;

  $: ({ scenarios, selectableTimeframes, defaultTimeframe, scenarioPresets } = data);

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

<ContentPageLayout {sections} title={LABEL_EXPLAINERS} intro="Learn more about key concepts in the Climate risk dashboard." />
