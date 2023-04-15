<script>
  import { groups } from 'd3-array';
  import { keyBy } from 'lodash-es';
  import SectionIntro from '../methodology/SectionIntro.svelte';
  import TermSection from './TermSection.svelte';
  import ScrollContent from '$lib/helper/ScrollContent/ScrollContent.svelte';
  import NestedNav from '$lib/helper/ScrollContent/NestedNav.svelte';

  export let data;
  $: ({ entries, categories, content } = data);

  $: entriesByCategory = groups(entries, (d) => d.category);
  $: categoriesBySlug = keyBy(categories, 'slug');

  $: sections = content.map((block) => {
    return {
      ...block,
      component: SectionIntro,
      content: '',
      sections: block.sections.map(section => {
        return {
          ...section,
          component: TermSection
        }
      })
    }
  })
</script>

<ScrollContent let:index>
  <NestedNav slot="navigation" {sections} {index} />
  <h1 class="text-5xl font-bold mb-12">Documentation</h1>
  {#each sections as section}
    <section class="mb-8">
      <svelte:component this={section.component} {...section} />
      {#each section.sections as part}
        <svelte:component this={part.component} {...part} />
      {/each}
    </section>
  {/each}
</ScrollContent>
