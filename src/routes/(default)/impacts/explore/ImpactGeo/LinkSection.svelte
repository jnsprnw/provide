<script>
  import Study from '$lib/helper/icons/Study.svelte';
  import UrbanStudy from '$lib/helper/icons/UrbanStudy.svelte';
  import { GEOGRAPHY_TYPE_CITY, PATH_KEY_CONCEPTS } from '$config';
  import { GEOGRAPHIES } from '$stores/meta.js';

  export let geography;

  $: isCity = geography.geographyType === GEOGRAPHY_TYPE_CITY;
  $: hasOwnCaseStudy = geography.uid === geography.adaptationCaseStudy;
  $: caseStudyGeography = isCity && $GEOGRAPHIES[GEOGRAPHY_TYPE_CITY].find((d) => d.uid === geography.adaptationCaseStudy);
</script>

<div class="grid grid-cols-1 md:grid-cols-[66%,33%] gap-3 items-stretch mt-16">
  <div class="bg-surface-weaker rounded px-5 py-6 lg:px-7 lg:py-8 flex flex-col gap-4">
    <Study class="h-14 w-14" />
    <div class="grow">
      <h4 class="text-lg font-bold mb-1">Using the data</h4>
      <p class="mb-4">Learn more about using our information in adaptation planning and policymaking.</p>
      <ul class="text-text-weaker flex flex-col gap-4">
        <li>
          <a class="text-theme-base font-bold" href="/adaptation#overshoot-proofing-self-assessment-tool">Overshoot policy self assessment tool <span class="font-normal text-sm">→</span></a>
          <p class="text-sm text-text-weaker">Use our quick guide to assess how you're factoring in changes in warming into your adaptation planning</p>
        </li>
        <li>
          <a class="text-theme-base font-bold" href="/{PATH_KEY_CONCEPTS}#scenarios">About adaptation pathways <span class="font-normal text-sm">→</span></a>
          <p class="text-sm text-text-weaker">Learn about an approach used to develop robust and dynamic adaptation plans, allowing uncertain risk levels to inform long-term decisions</p>
        </li>
      </ul>
    </div>
  </div>
  {#if caseStudyGeography}
    <div class="bg-theme-weakest rounded px-5 py-6 lg:px-7 lg:py-8 flex flex-col gap-4">
      <UrbanStudy class="h-12 w-12" color="fill-theme-base" />
      <div class="self-stretch grow flex flex-col gap-6 justify-between">
        <div class="">
          <h4 class="text-lg font-bold mb-1">Case study</h4>
          <p class="mb-2">Learn how this data was used to assess future climate risks, and inform local studies on heat adaptation measures.</p>
        </div>
        <p class="text-md font-bold">
          See <a class="text-theme-base underline underline-offset-4" href="/adaptation/{caseStudyGeography.uid}"> {caseStudyGeography.label} <span class="font-normal text-sm">→</span></a> case study<br
          />
        </p>
      </div>
    </div>
  {/if}
</div>
