<script>
  import Scenarios from './Scenarios/Scenarios.svelte';
  import ScenariosIntro from './Scenarios/ScenariosIntro.svelte';
  import ContentPageLayout from '$lib/helper/ContentPages/ContentPageLayout.svelte';
  import { ANCHOR_EXPLAINER_SCENARIOS, LABEL_EXPLAINERS, LABEL_SCENARIOS_INTRO, LABEL_SCENARIOS_TIMEFRAMES, LABEL_SCENARIOS_PRESETS, LABEL_SCENARIOS_LIST, LABEL_SCENARIOS_TIMELINES } from '$config';
  export let data;
  import { kebabCase } from 'lodash-es';

  $: ({ scenarios, selectableTimeframes, defaultTimeframe, scenarioPresets } = data);

  $: sections = [
    {
      props: {
        slug: ANCHOR_EXPLAINER_SCENARIOS,
        title: LABEL_SCENARIOS_INTRO,
      },
      component: ScenariosIntro,
      content: true,
      sections: [
        { component: Scenarios, props: { scenarios, selectableTimeframes, defaultTimeframe, scenarioPresets } },
        ...[LABEL_SCENARIOS_TIMEFRAMES, LABEL_SCENARIOS_PRESETS, LABEL_SCENARIOS_LIST, LABEL_SCENARIOS_TIMELINES].map((title) => ({
          props: {
            title,
            content: true,
            slug: kebabCase(title),
          },
        })),
      ],
    },
  ];
</script>

<ContentPageLayout {sections} title={LABEL_EXPLAINERS} intro="Learn more about key concepts in the Climate risk dashboard." />
