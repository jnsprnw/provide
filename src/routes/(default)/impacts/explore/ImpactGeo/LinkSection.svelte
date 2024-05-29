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

<div class="grid lg:grid-cols-2 grid-cols-1 gap-3 items-stretch mt-16">
  {#if caseStudyGeography}
    <div class="bg-theme-weakest rounded p-6 lg:p-8 flex flex-col gap-4">
      <UrbanStudy class="h-14 w-14" color="fill-theme-base" />
      <div class="self-center">
        <h4 class="text-lg font-bold mb-1">Case study</h4>
        <p class="mb-4">Read our urban case studies to learn how this data was used to prioritise between locations and measures for heat adaptation.</p>
        <p class="text-text-weaker text-sm">
          Recommended case study {#if !hasOwnCaseStudy}
            for {geography.label}{/if}<br />
          <a class="text-theme-base font-bold text-lg" href="/adaptation/{caseStudyGeography.uid}">→ {caseStudyGeography.label}</a> <br />
        </p>
      </div>
    </div>
  {/if}

  <div class="bg-surface-weaker rounded p-6 lg:p-8 flex flex-col gap-4">
    <Study class="h-14 w-14" />
    <div class="self-center">
      <h4 class="text-lg font-bold mb-1">Using the data</h4>
      <p class="mb-4">Learn more about using these impact visualisations within adaptation planning and policy</p>
      <ul class="text-text-weaker flex flex-col gap-1.5">
        <li>
          <a class="text-theme-base" href="/adaptation#overshoot-proofing-self-assessment-tool">→ Policy self assessment tool</a> <br />
        </li>
        <li>
          <a class="text-theme-base" href="/{PATH_KEY_CONCEPTS}#scenarios">→ About adaptation pathways</a>
        </li>
      </ul>
    </div>
  </div>
</div>
