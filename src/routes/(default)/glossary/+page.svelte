<script>
  import SectionHeadline from '$lib/helper/ContentPages/SectionHeadline.svelte';
  import TermSection from './TermSection.svelte';
  import ContentPageLayout from '$lib/helper/ContentPages/ContentPageLayout.svelte';
  import { LABEL_GLOSSARY } from '$config';
  export let data;

  $: ({ content } = data);

  $: sections = [
    ...content.map(({ title, slug, sections }) => ({
      component: SectionHeadline,
      props: {
        slug,
        title,
      },
      sections: sections.map((s) => ({ component: TermSection, props: s })),
    })),
  ];
</script>

<ContentPageLayout {sections} title={LABEL_GLOSSARY} />
