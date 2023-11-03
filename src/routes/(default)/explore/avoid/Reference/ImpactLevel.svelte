<script>
  import { mean } from 'lodash-es';
  import { LEVEL_OF_IMPACT } from '$stores/avoid.js';
  import { CURRENT_INDICATOR } from '$stores/state.js';
  import { formatValue } from '$lib/utils/formatting';
  export let data;

  function roundArray(arr) {
    return [Math.floor(arr[0]), Math.ceil(arr[1])];
  }

  $: ({ step } = data.impact_levels);

  $: ({ unit } = $CURRENT_INDICATOR);

  $: [min, max] = roundArray(data.impact_levels.range_of_interest);
  $: average = Math.floor(mean([min, max]));

  $: {
    LEVEL_OF_IMPACT.set(average);
  }
</script>

<div class="mr-2">
  <div class="font-bold text-text-weaker mb-2 flex justify-between">
    <span class="uppercase text-xs tracking-widest">Level of Impact</span>
    <span class="text-xs text-theme-base">
      {formatValue($LEVEL_OF_IMPACT, unit.uid)}
      {#if unit.uid !== 'degrees-celsius'}
        {unit.label}
      {/if}
    </span>
  </div>

  <div class="flex flex-col">
    <input
      class="w-full"
      type="range"
      {min}
      {max}
      bind:value={$LEVEL_OF_IMPACT}
      step={step ?? 1}
    />
    <div class="flex justify-between text-xs text-contour-weaker">
      <span>{min}</span>
      <span>{max}</span>
    </div>
  </div>
</div>
