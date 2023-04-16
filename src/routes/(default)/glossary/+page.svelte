<script>
  import SectionHeadline from '$lib/helper/ContentPages/SectionHeadline.svelte';
  import TermSection from './TermSection.svelte';
  import ScrollContent from '$lib/helper/ScrollContent/ScrollContent.svelte';
  import NestedNav from '$lib/helper/ScrollContent/NestedNav.svelte';
  export let data;

  $: sections = data.content;
</script>

<ScrollContent let:index>
  <NestedNav slot="navigation" {sections} {index} />
  <h1 class="text-5xl font-bold mb-12">Documentation</h1>
  {#each sections as { sections, title, slug }}
    <section class="mb-8">
      <SectionHeadline {title} {slug} />
      {#each sections as { title, slug, content, footnote, abbreviation }}
        <TermSection {title} {slug} {content} {footnote} {abbreviation} />
      {/each}
    </section>
  {/each}
</ScrollContent>
