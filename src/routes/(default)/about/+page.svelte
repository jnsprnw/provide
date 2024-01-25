<script>
  import { LABEL_ABOUT } from '$config';
  import ScrollContent from '$lib/helper/ScrollContent/ScrollContent.svelte';
  import NestedNav from '$lib/helper/ScrollContent/NestedNav.svelte';
  import SectionDefault from '$lib/helper/ContentPages/SectionDefault.svelte';
  import ContentPageIntro from '$lib/helper/ContentPages/ContentPageIntro.svelte';
  export let data;

  $: sections = data.content;
</script>

<ContentPageIntro title={LABEL_ABOUT} />

<ScrollContent {sections}>
  <NestedNav slot="navigation" {sections} />
  {#each sections as section}
    <section class="mb-8">
      <SectionDefault {...section} />
    </section>
  {/each}
</ScrollContent>
