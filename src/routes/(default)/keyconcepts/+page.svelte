<script>
  import SectionHeadline from '$lib/helper/ContentPages/SectionHeadline.svelte';
  import TermSection from './TermSection.svelte';
  import ContentPageLayout from '$lib/helper/ContentPages/ContentPageLayout.svelte';
  import Scenarios from './Scenarios/Scenarios.svelte';
  import ScenariosIntro from './Scenarios/ScenariosIntro.svelte';
  import { LABEL_KEY_CONCEPTS, ANCHOR_EXPLAINER_SCENARIOS, LABEL_SCENARIOS_INTRO, LABEL_SCENARIOS_TIMEFRAMES, LABEL_SCENARIOS_PRESETS, LABEL_SCENARIOS_LIST, LABEL_SCENARIOS_TIMELINES } from '$config';
  import { kebabCase } from 'lodash-es';

  export let data;

  $: ({ content, scenarios, selectableTimeframes, defaultTimeframe, scenarioPresets } = data);

  $: sections = [
    ...content.map(({ title, slug, sections }) => ({
      component: SectionHeadline,
      props: {
        slug,
        title,
      },
      sections: sections.map((s) => ({ component: TermSection, props: s })),
    })),
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

<ContentPageLayout {sections} title={LABEL_KEY_CONCEPTS} intro="Learn more about key concepts used in the Climate risk dashboard, including different emissions scenarios and indicator definitions." />
