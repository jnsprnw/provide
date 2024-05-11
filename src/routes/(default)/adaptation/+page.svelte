<script>
  import ContentPageLayout from '$src/lib/helper/ContentPages/ContentPageLayout.svelte';
  import {
    LABEL_ADAPTATION,
    LABEL_ADAPTATION_PLANNING,
    LABEL_ADAPTATION_ASSESSMENT,
    LABEL_ADAPTATION_LONG_TERM,
    LABEL_ADAPTATION_PATHWAYS,
    LABEL_ADAPTATION_RESOURCES,
    LABEL_ADAPTATION_STUDIES,
  } from '$config';
  import AdaptationPlanning from './sections/AdaptationPlanning.svelte';
  import AssessmentTool from './sections/AssessmentTool.svelte';
  import LongTerm from './sections/LongTerm.svelte';
  import AdaptationPathways from './sections/AdaptationPathways.svelte';
  import ComplementaryResources from './sections/ComplementaryResources.svelte';
  import FurtherStudies from './sections/FurtherStudies.svelte';
  import SectionDefault from '$lib/helper/ContentPages/SectionDefault.svelte';
  import { kebabCase } from 'lodash-es';

  export let data;

  $: console.log(data);

  $: sections = [
    {
      title: data.introTitle,
      component: AdaptationPlanning,
      content: true,
      props: {
        title: data.introTitle,
        content: data.introText,
        caseStudies: data.caseStudies,
      },
    },
    {
      title: data.selfAssessmentTitle,
      component: AssessmentTool,
      props: {
        content: data.selfAssessmentText,
        subtitle: data.selfAssessmentSubtitle,
      },
    },
    {
      title: data.integrationTitle,
      component: SectionDefault,
      content: true,
      props: {
        title: data.integrationTitle,
        content: data.integrationText,
      },
    },
    {
      title: LABEL_ADAPTATION_RESOURCES,
      component: ComplementaryResources,
    },
    {
      title: LABEL_ADAPTATION_STUDIES,
      component: FurtherStudies,
    },
  ].map((section) => ({ ...section, slug: kebabCase(section.title), content: true }));
</script>

<ContentPageLayout {sections} title={LABEL_ADAPTATION} intro="Learn how to use climate data for overshoot risk informed adaptation." />
