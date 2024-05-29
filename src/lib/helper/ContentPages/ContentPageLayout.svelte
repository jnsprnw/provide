<script>
  import ContentPageIntro from '$lib/helper/ContentPages/ContentPageIntro.svelte';
  import ScrollContent from '$lib/helper/ScrollContent/ScrollContent.svelte';
  import NestedNav from '$lib/helper/ScrollContent/NestedNav.svelte';

  export let subNavigation;
  export let sections;
  export let title;
  export let intro;
  export let dynamicNavigation = false;
  export let isCaseStudy;
  export let tag;
  export let subNavigationLabel;
  export let backLink;

  let contentRef;
</script>

<ContentPageIntro {tag} {subNavigationLabel} {backLink} {title} {intro} {subNavigation} {isCaseStudy} />

<ScrollContent isFullWidth={true} {sections}>
  <NestedNav contentRef={dynamicNavigation && contentRef} slot="navigation" {sections} />
  <div bind:this={contentRef}>
    {#each sections as section}
      <section class="mt-10 pt-10 border-contour-weakest first:border-0 first:mt-0" class:border-t={section.title && !section.omitBorder} class:pt-12={section.title}>
        <svelte:component this={section.component} title={section.title} {...section.props} />
        {#each section.sections ?? [] as part}
          <svelte:component this={part.component} title={part.title} {...part.props} />
        {/each}
      </section>
    {/each}
  </div>
  <slot />
</ScrollContent>
