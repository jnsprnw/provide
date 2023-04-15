<script>
  import ScrollContent from '$lib/helper/ScrollContent/ScrollContent.svelte';
  import NestedNav from '$lib/helper/ScrollContent/NestedNav.svelte';
  import SectionDefault from '$lib/helper/ContentPages/SectionDefault.svelte';
  export let data;

  $: sections = data.content
</script>

<ScrollContent let:index>
  <NestedNav slot="navigation" {sections} {index} />
  <h1 class="text-5xl font-bold mb-12">About</h1>
  {#each sections as section}
    <section class="mb-8">
      <SectionDefault {...section} />
    </section>
  {/each}
</ScrollContent>
