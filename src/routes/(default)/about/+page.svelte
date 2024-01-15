<script>
  import { LABEL_ABOUT } from '$config';
  import ScrollContent from '$lib/helper/ScrollContent/ScrollContent.svelte';
  import NestedNav from '$lib/helper/ScrollContent/NestedNav.svelte';
  import SectionDefault from '$lib/helper/ContentPages/SectionDefault.svelte';
  export let data;

  $: sections = data.content;
</script>

<ScrollContent {sections}>
  <NestedNav slot="navigation" {sections} />
  <h1 class="text-5xl font-bold mb-12">{LABEL_ABOUT}</h1>
  {#each sections as section}
    <section class="mb-8">
      <SectionDefault {...section} />
    </section>
  {/each}
</ScrollContent>
