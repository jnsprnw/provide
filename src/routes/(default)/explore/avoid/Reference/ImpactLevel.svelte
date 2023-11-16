<script>
  import { LEVEL_OF_IMPACT_ARRAY } from '$stores/avoid.js';
  import { CURRENT_INDICATOR } from '$stores/state.js';
  import { formatValue } from '$lib/utils/formatting';
  import { scaleLinear } from 'd3-scale';
  import { createSlider, melt } from '@melt-ui/svelte';

  export let data;

  $: ({ unit } = $CURRENT_INDICATOR);

  // The step size of the slider
  $: ({ step } = data.impact_levels);
  // The range of interest
  $: [min, max] = data.impact_levels.range_of_interest;
  // The range of total possible values
  $: [totalMin, totalMax] = data.impact_levels.total;

  // This is used to calculate the range of interest position
  $: scaleX = scaleLinear().domain(data.impact_levels.total).range([0, 100]);

  $: ({
    elements: { root, thumb },
  } = createSlider({
    defaultValue: [min], // This has to be an array because of MeltUI’s workings
    min: totalMin,
    max: totalMax,
    step: step,
    value: LEVEL_OF_IMPACT_ARRAY,
  }));

  // This is triggered everytime the min value changes.
  $: {
    LEVEL_OF_IMPACT_ARRAY.set([min]); // This has to be an array because of MeltUI’s workings
  }
</script>

<div class="mr-2">
  <div class="font-bold text-text-weaker mb-2 flex justify-between">
    <span class="uppercase text-xs tracking-widest">Level of Impact</span>
    <span class="text-xs text-theme-base">
      {$LEVEL_OF_IMPACT_ARRAY[0]}
      {#if unit.uid !== 'degrees-celsius'}
        {unit.label}
      {/if}
    </span>
  </div>

  <div>
    <span
      use:melt={$root}
      class="relative flex h-[20px] w-full items-center"
    >
      <span class="block h-[7px] w-full bg-contour-weakest rounded-full"> </span>
      <span
        class="absolute block h-[7px] bg-theme-base"
        style="left: {scaleX(min)}%; width: {scaleX(max) - scaleX(min)}%;"
        title="Range of interest"
      ></span>
      <span
        use:melt={$thumb()}
        class="flex items-center justify-center h-6 w-6 rounded-full bg-surface-weakest shadow-sm border-contour-weakest border focus:ring-1 text-theme-base focus:ring-theme-base"
      >
        <svg
          width="9"
          height="13"
          viewBox="0 0 11 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.553223 0.770508V13.1505"
            stroke="currentColor"
          />
          <path
            d="M5.05322 0.770508V13.1505"
            stroke="currentColor"
          />
          <path
            d="M9.55322 0.770508V13.1505"
            stroke="currentColor"
          />
        </svg>
      </span>
    </span>
    <div class="flex justify-between text-xs text-contour-weaker">
      <span>{totalMin}</span>
      <span class="text-theme-weaker font-normal">Level of interest</span>
      <span>{totalMax}</span>
    </div>
  </div>
</div>
