<script>
  import ContentPageLayout from '$src/lib/helper/ContentPages/ContentPageLayout.svelte';
  import { LABEL_ADAPTATION, PATH_ADAPTATION } from '$config';
  import Publications from './sections/Publications.svelte';

  import SectionDefault from '$lib/helper/ContentPages/SectionDefault.svelte';
  import { kebabCase } from 'lodash-es';
  import Outro from './sections/Outro.svelte';

  export let data;

  $: sections = [
    {
      title: data.introTitle,
      component: SectionDefault,
      content: true,
      props: {
        title: data.introTitle,
        content: data.introText,
      },
    },
    {
      title: data.selfAssessmentTitle,
      component: SectionDefault,
      props: {
        title: data.selfAssessmentTitle,
        content: data.selfAssessmentText,
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
      component: Publications,
      props: {
        title: data.publicationsTitle,
        publications: data.publications,
      },
    },
  ].map((section) => ({ ...section, slug: kebabCase(section.title), content: true }));

  $: subNavigation = [...data.caseStudies.map((d) => ({ label: d.city.label, abstract: d.abstract, href: `/${PATH_ADAPTATION}/${d.city.uid}` }))];
</script>

<ContentPageLayout
  {sections}
  dynamicNavigation={true}
  title={LABEL_ADAPTATION}
  {subNavigation}
  subNavigationLabel="Case studies"
  intro="Learn how to use climate data for overshoot risk informed adaptation."
>
  <!-- <Outro title={data.outroTitle} text={data.outroText} /> -->
</ContentPageLayout>
