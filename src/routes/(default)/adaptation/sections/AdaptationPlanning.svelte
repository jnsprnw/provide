<script>
  import SectionDefault from '$lib/helper/ContentPages/SectionDefault.svelte';
  import { PATH_ADAPTATION } from '$src/config';
  import SubsectionHeadline from '$src/lib/helper/ContentPages/SubsectionHeadline.svelte';

  export let title;
  export let subtitle;
  export let content;
  export let caseStudies;
</script>

<SectionDefault {title} {subtitle} {content} />
{#each caseStudies as caseStudy}
  <a href="/{PATH_ADAPTATION}/{caseStudy.uid}"
    ><h4 class="font-bold text-theme-base">{caseStudy.city}</h4>
    <p>{caseStudy.description}</p></a
  >
{/each}
