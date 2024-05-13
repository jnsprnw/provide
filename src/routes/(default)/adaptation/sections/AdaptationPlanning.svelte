<script>
  import SectionDefault from '$lib/helper/ContentPages/SectionDefault.svelte';
  import { PATH_ADAPTATION } from '$src/config';

  export let title;
  export let subtitle;
  export let content;
  export let caseStudies;
</script>

<SectionDefault {title} {subtitle} {content} />
<h4 class="uppercase text-xs tracking-widest font-bold pt-3 mt-10 mb-3 border-t border-contour-weakest">Case studies</h4>
<div class="grid lg:grid-cols-4 grid-cols-2 pt-5">
  {#each caseStudies as { uid, city, description }}
    <a href="/{PATH_ADAPTATION}/{uid}"
      ><h4 class="font-bold text-theme-base">{city}</h4>
      <p class="text-text-weaker text-sm">{description}</p></a
    >
  {/each}
</div>
