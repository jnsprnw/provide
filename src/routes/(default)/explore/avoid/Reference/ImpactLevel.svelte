<script>
  import { mean } from 'lodash-es';
  import { LEVEL_OF_IMPACT } from '$stores/avoid.js';
  export let data;

  function roundArray(arr) {
    return [Math.floor(arr[0]), Math.ceil(arr[1])];
  }

  $: [min, max] = roundArray(data.impact_levels.range_of_interest);
  $: average = Math.floor(mean([min, max]));

  $: {
    LEVEL_OF_IMPACT.set(average);
  }
</script>

<div class="mr-2">
  <span class="uppercase text-xs tracking-widest font-bold text-contour-weak pl-1 mb-2 inline-block">Level of Impact ({$LEVEL_OF_IMPACT})</span>

  <div class="flex justify-between text-xs">
    <span>{min}</span>
    <span>{max}</span>
  </div>

  <input
    class="w-full"
    type="range"
    {min}
    {max}
    bind:value={$LEVEL_OF_IMPACT}
    step="1"
  />
</div>
