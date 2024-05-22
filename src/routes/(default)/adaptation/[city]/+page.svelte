<script>
  import { PATH_ADAPTATION } from '$src/config.js';
  import ContentPageLayout from '$src/lib/helper/ContentPages/ContentPageLayout.svelte';
  import SectionDefault from '$src/lib/helper/ContentPages/SectionDefault.svelte';
  import AvoidingImpacts from './sections/AvoidingImpacts.svelte';
  import FutureImpacts from './sections/FutureImpacts.svelte';
  import ImageSlider from './sections/ImageSlider.svelte';
  export let data;

  $: caseStudy = data.caseStudy;

  //$: console.log(data.caseStudy.mainContent.find((d) => d.type === 'avoiding-impacts')?.data);
  // $: console.log(data.meta);

  const components = { 'image-slider': ImageSlider, 'avoiding-impacts': AvoidingImpacts, 'future-impacts': FutureImpacts, section: SectionDefault };

  $: sections = caseStudy.mainContent.map((section) => {
    return { component: components[section.type], title: section.title, props: { ...section, content: section.text } };
  });

  $: subNavigation = [
    { label: 'Overview', href: `/${PATH_ADAPTATION}`, separator: true },
    ...data.caseStudies.map((d) => ({ label: d.city.label, href: `/${PATH_ADAPTATION}/${d.city.uid}`, isActive: caseStudy.city.uid === d.city.uid })),
  ];
</script>

<ContentPageLayout {sections} dynamicNavigation={true} title="Extreme heat in {caseStudy.city.label}" {subNavigation} intro={caseStudy.abstract} />
