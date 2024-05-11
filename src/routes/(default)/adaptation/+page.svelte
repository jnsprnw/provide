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
  import Publications from './sections/Publications.svelte';

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
      component: SectionDefault,
      props: {
        title: data.selfAssessmentTitle,
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
      title: data.publicationsTitle,
      component: Publications,
      props: {
        publications: data.publications,
      },
    },
    {
      title: LABEL_ADAPTATION_STUDIES,
      component: FurtherStudies,
    },
  ].map((section) => ({ ...section, slug: kebabCase(section.title), content: true }));
</script>

<ContentPageLayout {sections} title={LABEL_ADAPTATION} intro="Learn how to use climate data for overshoot risk informed adaptation." />
