<script>
  import SectionHeadline from '$lib/helper/ContentPages/SectionHeadline.svelte';
  import TermSection from './TermSection.svelte';
  import ScrollContent from '$lib/helper/ScrollContent/ScrollContent.svelte';
  import NestedNav from '$lib/helper/ScrollContent/NestedNav.svelte';
  import PageIntro from '$lib/site/PageIntro.svelte';
  import { LABEL_GLOSSARY } from '$config';
  export let data;

  $: ({ content } = data);

  $: sections = [
    ...content.map(({ title, slug, sections }) => ({
      slug,
      title,
      component: SectionHeadline,
      sections: sections.map((s) => ({ ...s, component: TermSection })),
    })),
  ];
</script>

<PageIntro>
  <div class="flex flex-col gap-y-3.5">
    <h1 class="text-4xl font-bold">{LABEL_GLOSSARY}</h1>
    <p class="max-w-xl">Lorem ipsum dolor</p>
  </div>
</PageIntro>

<ScrollContent isFullWidth={true}>
  <NestedNav slot="navigation" {sections} />
  {#each sections as section}
    <section class="pb-12 mb-12 border-b border-contour-weakest last:border-0 last:mb-0">
      <svelte:component this={section.component} {...section} />
      {#each section.sections as part}
        <svelte:component this={part.component} {...part} />
      {/each}
    </section>
  {/each}
</ScrollContent>
