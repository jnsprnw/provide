<script>
  import ScrollContent from '$lib/helper/ScrollContent/ScrollContent.svelte';
  import NestedNav from '$lib/helper/ScrollContent/NestedNav.svelte';
  import SectionIntro from '../methodology/SectionIntro.svelte';
  export let data;

  $: ({ content } = data);

  $: sections = content.map(section => ({
    ...section,
    component: SectionIntro
  }))
</script>

<ScrollContent let:index>
  <NestedNav slot="navigation" {sections} {index} />
  <h1 class="text-5xl font-bold mb-12">About</h1>
  {#each sections as section}
    <section class="mb-8">
      <svelte:component this={section.component} {...section} />
    </section>
  {/each}
</ScrollContent>
