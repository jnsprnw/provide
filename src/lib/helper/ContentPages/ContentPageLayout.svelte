<script>
  import ContentPageIntro from '$lib/helper/ContentPages/ContentPageIntro.svelte';
  import ScrollContent from '$lib/helper/ScrollContent/ScrollContent.svelte';
  import NestedNav from '$lib/helper/ScrollContent/NestedNav.svelte';

  export let sections;
  export let title;
  export let intro;
</script>

<ContentPageIntro {title} {intro} />

<ScrollContent isFullWidth={true} {sections}>
  <NestedNav slot="navigation" {sections} />
  <slot name="before" />
  {#each sections as section}
    <section class="pb-12 mb-12 border-b border-contour-weakest last:border-0 last:mb-0">
      <svelte:component this={section.component} title={section.title} {...section.props} />
      {#each section.sections ?? [] as part}
        <svelte:component this={part.component} title={part.title} {...part.props} />
      {/each}
    </section>
  {/each}
  <slot />
</ScrollContent>
