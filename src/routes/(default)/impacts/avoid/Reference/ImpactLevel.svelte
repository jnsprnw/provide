<script>
  import { LEVEL_OF_IMPACT } from '$stores/avoid.js';
  import { CURRENT_INDICATOR } from '$stores/state.js';
  import { scaleLinear } from 'd3-scale';
  import { createSlider, melt } from '@melt-ui/svelte';

  import { writable } from 'svelte/store';

  let value = writable([0]);

  export let data;

  $: ({ unit } = $CURRENT_INDICATOR);

  // The step size of the slider
  $: ({ step, min, max, totalMin, totalMax, defaultValue, offset } = data);
  // // The range of interest
  // $: [min, max] = data.impact_levels.range_of_interest;
  // // The range of total possible values
  // $: [totalMin, totalMax] = data.impact_levels.total;

  // $: console.log({ step, min, max, totalMin, totalMax, defaultValue, offset });

  // This is used to calculate the range of interest position
  $: scaleX = scaleLinear().domain([totalMin, totalMax]).range([0, 100]);

  // const test = (e) => {
  //   console.log(e);
  // };

  let root;
  let thumb;

  // $: console.log('value', $value[0]);

  // $: console.log($LEVEL_OF_IMPACT);

  // $: ({
  //   elements: { root, thumb },
  //   // options: { max: a, min: i },
  // } = createSlider({
  //   // defaultValue: [min], // This has to be an array because of MeltUI’s workings
  //   defaultValue: [defaultValue],
  //   min: min,
  //   max: max,
  //   step: step,
  //   value: value,
  //   // onValueChange: test,
  // }));

  // $: console.log({ $a, $i });

  function updateSlider(min, max, defaultValue) {
    value = writable([defaultValue]);
    LEVEL_OF_IMPACT.set(defaultValue);
    const {
      elements: { root: r, thumb: t },
    } = createSlider({
      // defaultValue: [min], // This has to be an array because of MeltUI’s workings
      defaultValue: [defaultValue],
      min: min,
      max: max,
      step: step,
      value: value,
      // onValueChange: test,
    });

    root = r;
    thumb = t;

    value.subscribe((value) => {
      LEVEL_OF_IMPACT.set(value[0] - offset);
    });

    // console.log('here');
    // const fixedMin = Math.floor(min / step) * step;
    // const fixedMax = Math.ceil(max / step) * step;
    // console.log({ fixedMin, fixedMax });
    // i.set(min);
    // a.set(max);
    // s.set(step);
    // value.set([current]); // This has to be an array because of MeltUI’s workings
  }

  // This is triggered everytime the min value changes.
  $: updateSlider(totalMin, totalMax, defaultValue);
</script>

<div class="mr-2">
  <div class="font-bold text-text-weaker mb-2 flex justify-between">
    <span class="uppercase text-xs tracking-widest">Level of Impact</span>
    <span class="text-xs text-theme-base">
      {$LEVEL_OF_IMPACT}
      {#if unit.uid !== 'degrees-celsius'}
        {unit.label}
      {/if}
    </span>
  </div>

  <div>
    {#if root}
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
            class="pointer-events-none"
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
      <div class="grid grid-cols-[1fr_2fr_1fr] text-xs text-contour-weaker">
        <span>{totalMin - offset}</span>
        <span class="text-theme-weaker font-normal text-center">Level of interest</span>
        <span class="text-right">{totalMax - offset}</span>
      </div>
    {/if}
  </div>
</div>
