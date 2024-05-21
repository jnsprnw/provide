<script>
  import LinkArrow from '$lib/helper/icons/LinkArrow.svelte';
  import { PATH_ADAPTATION } from '$config';
  export let title;
  export let caseStudies = [];
</script>

<div class="grid grid-rows-[1fr_auto_auto] bg-surface-weaker p-4 sm:p-10 md:p-12 {$$props.class}">
  <div class="flex flex-col gap-y-2 my-4">
    <span class="uppercase text-left font-bold text-xl tracking-wide text-current">{title}</span>
    <div class="block text-left text-base sm:text-lg md:leading-normal text-black">
      <slot name="intro" />
    </div>
  </div>
  <div>
    <a class="inline-flex items-center gap-x-4 hover:bg-surface-weakest py-3 px-2 text-theme-base transition-colors" href={`/${PATH_ADAPTATION}`}>
      <div>
        <h4 class="font-bold text-theme-base text-base sm:text-lg md:leading-normal">See the case study overview</h4>
        <span class="text-text-weaker text-sm">Learn how to use climate data for overshoot risk informed adaptation.</span>
      </div>
      <LinkArrow />
    </a>
  </div>
  {#if caseStudies.length}
    <span class="text-contour-weaker text-sm mt-6">Case studies:</span>
    <ul class="grid sm:grid-cols-2 md:grid-cols-4 gap-4 my-2">
      {#each caseStudies as { city, abstract }}
        <li>
          <a href="/{PATH_ADAPTATION}/{city.uid}" class="block hover:bg-surface-weakest py-3 px-2 transition-colors">
            <h4 class="font-bold text-theme-base">{city.label}</h4>
            <p class="text-text-weaker text-sm">{abstract}</p></a
          >
        </li>
      {/each}
    </ul>
  {/if}
</div>
