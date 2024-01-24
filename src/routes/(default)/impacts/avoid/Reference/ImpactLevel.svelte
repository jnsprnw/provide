<script>
  import { LEVEL_OF_IMPACT } from '$stores/avoid.js';
  import { CURRENT_INDICATOR } from '$stores/state.js';
  import { formatUnit, formatValue } from '$lib/utils/formatting';
  import { scaleLinear } from 'd3-scale';
  import { createSlider, melt } from '@melt-ui/svelte';
  import { writable } from 'svelte/store';
  import { round } from 'lodash-es';
  import { format } from 'd3-format';
  import Knob from './Slider/Knob.svelte';

  let value = writable([0]);

  export let data;

  $: ({ unit } = $CURRENT_INDICATOR);

  // The step size of the slider
  $: ({ step, min, max, totalMin, totalMax, defaultValue, offset, decimals } = data);

  $: rv = (value) => round(value, decimals); // We round the value with the amount of decimals places as the step size
  $: fv = format(`.${decimals}f`); // This is used to always have the same decimals places. Even if values are for example *.0

  // This is used to calculate the range of interest position
  $: scaleX = scaleLinear().domain([totalMin, totalMax]).range([0, 100]);

  let root;
  let thumb;

  function updateSlider(min, max, defaultValue) {
    value = writable([defaultValue]);
    LEVEL_OF_IMPACT.set(rv(defaultValue));
    const {
      elements: { root: r, thumb: t },
    } = createSlider({
      // defaultValue: [min], // This has to be an array because of MeltUI’s workings
      defaultValue: [defaultValue],
      min: min,
      max: max,
      step: step,
      value: value,
    });

    root = r;
    thumb = t;

    value.subscribe((value) => {
      LEVEL_OF_IMPACT.set(rv(value[0] - offset));
    });
  }

  // This is triggered everytime the min value changes.
  $: updateSlider(totalMin, totalMax, defaultValue);
</script>

<div class="mr-2">
  <div class="font-bold text-text-weaker mb-2 flex justify-between">
    <span class="uppercase text-xs tracking-widest">Level of Impact</span>
    <span class="text-xs text-theme-base">
      {formatValue($LEVEL_OF_IMPACT, unit.uid, { decimals })}{@html formatUnit(unit)}
    </span>
  </div>

  <div>
    {#if root}
      <span use:melt={$root} class="relative flex h-[20px] w-full items-center">
        <span class="block h-[7px] w-full bg-contour-weakest rounded-full"> </span>
        <span class="absolute block h-[7px] bg-theme-base" style="left: {scaleX(min)}%; width: {scaleX(max) - scaleX(min)}%;" title="Range of interest"></span>
        <span
          use:melt={$thumb()}
          class="flex items-center justify-center h-6 w-6 rounded-full bg-surface-weakest shadow-sm border-contour-weakest border focus:ring-1 text-theme-base focus:ring-theme-base"
        >
          <Knob />
        </span>
      </span>
      <div class="grid grid-cols-[1fr_2fr_1fr] text-xs text-contour-weaker">
        <span>{formatValue(totalMin - offset, unit.uid, { decimals })}{@html formatUnit(unit)}</span>
        <span class="text-theme-weaker font-normal text-center">Level of interest</span>
        <span class="text-right">{formatValue(totalMax - offset, unit.uid, { decimals })}{@html formatUnit(unit)}</span>
      </div>
    {/if}
  </div>
</div>
