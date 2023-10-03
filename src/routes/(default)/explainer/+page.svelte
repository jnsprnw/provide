<script>
  import SectionHeadline from '$lib/helper/ContentPages/SectionHeadline.svelte';
  import TermSection from './TermSection.svelte';
  import ScrollContent from '$lib/helper/ScrollContent/ScrollContent.svelte';
  import NestedNav from '$lib/helper/ScrollContent/NestedNav.svelte';
  export let data;

  $: sections = data.content;
</script>

<nav class="bg-surface-weaker">
  <div class="mx-auto max-w-7xl px-6 pt-16 pb-10">
      <h1 class="text-4xl font-bold">Explainers</h1>
      <p class="mt-3.5 max-w-xl">How do you avoid important climate impact thresholds in your city? Understand the risks and make your city more resilient to the impacts of climate change.</p>
  </div>
</nav>

<ScrollContent>
  <NestedNav slot="navigation" {sections} />
  <h1 class="text-5xl font-bold mb-12">Glossary</h1>
  {#each sections as { sections, title, slug }}
    <section class="mb-8">
      <SectionHeadline {title} {slug} />
      {#each sections as { title, slug, content, footnote, abbreviation }}
        <TermSection {title} {slug} {content} {footnote} {abbreviation} />
      {/each}
    </section>
  {/each}
</ScrollContent>
