<script>
  import { PATH_ADAPTATION } from '$src/config.js';
  import ContentPageLayout from '$src/lib/helper/ContentPages/ContentPageLayout.svelte';
  import SectionDefault from '$src/lib/helper/ContentPages/SectionDefault.svelte';
  import Outro from '../sections/Outro.svelte';
  import AvoidingImpacts from './sections/AvoidingImpacts.svelte';
  import FutureImpacts from './sections/FutureImpacts.svelte';
  import ImageSlider from './sections/ImageSlider.svelte';
  export let data;

  $: caseStudy = data.caseStudy;

  const components = {
    'image-slider': { component: ImageSlider },
    'avoiding-impacts': { component: AvoidingImpacts, omitBorder: true },
    'future-impacts': { component: FutureImpacts },
    section: { component: SectionDefault },
  };

  $: sections = caseStudy.mainContent.map((section) => {
    return { ...components[section.type], title: section.title, props: { ...section, content: section.text } };
  });

  $: subNavigation = [...data.caseStudies.map((d) => ({ label: d.city.label, abstract: d.abstract, href: `/${PATH_ADAPTATION}/${d.city.uid}`, isActive: caseStudy.city.uid === d.city.uid }))];
</script>

<ContentPageLayout
  {sections}
  isCaseStudy={false}
  tag="Case study"
  subNavigationLabel="Case studies"
  dynamicNavigation={true}
  title="Extreme heat in {caseStudy.city.label}"
  {subNavigation}
  backLink={{ href: `/${PATH_ADAPTATION}`, label: 'Adaptation overview' }}
  intro={caseStudy.abstract}
>
  {#if caseStudy.authors}
    <section class="html-content mt-16 pt-10 flex items-baseline gap-4 border-t border-contour-weakest">
      <h4>Contributors</h4>
      <p class="text-text-weaker">{caseStudy.authors}</p>
    </section>
  {/if}
  <Outro {...data.caseStudyOutro} />
</ContentPageLayout>
