<script>
  import ContentPageLayout from '$src/lib/helper/ContentPages/ContentPageLayout.svelte';
  import { LABEL_ADAPTATION, PATH_ADAPTATION } from '$config';
  import AdaptationPlanning from './sections/AdaptationPlanning.svelte';
  import Publications from './sections/Publications.svelte';

  import SectionDefault from '$lib/helper/ContentPages/SectionDefault.svelte';
  import { kebabCase } from 'lodash-es';
  import Replicate from '$lib/helper/icons/Replicate.svelte';
  import HtmlContent from '$src/lib/helper/HtmlContent.svelte';

  export let data;

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
      component: Publications,
      props: {
        title: data.publicationsTitle,
        publications: data.publications,
      },
    },
  ].map((section) => ({ ...section, slug: kebabCase(section.title), content: true }));

  $: subNavigation = [
    { label: 'Overview', href: `/${PATH_ADAPTATION}`, separator: true, isActive: true },
    ...data.caseStudies.map((d) => ({ label: d.city.label, href: `/${PATH_ADAPTATION}/${d.city.uid}` })),
  ];
</script>

<ContentPageLayout {sections} dynamicNavigation={true} title={LABEL_ADAPTATION} {subNavigation} intro="Learn how to use climate data for overshoot risk informed adaptation.">
  <div class="bg-surface-weakest flex p-10 gap-10 mb-10">
    <Replicate class="w-[13%] min-w-[70px]" />
    <div>
      <h2 class="text-2xl font-bold mb-3">{data.outroTitle}</h2>
      <HtmlContent class="text-lg text-text-weaker" content={data.outroText} />
    </div>
  </div>
</ContentPageLayout>
