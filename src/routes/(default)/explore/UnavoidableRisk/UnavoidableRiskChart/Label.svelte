<script>
  import { formatValue } from '$lib/utils/formatting';
  export let fullHeight;
  export let hasNoRange;
  export let differentYears;
  export let index;
  export let latest;
  export let label;
  export let text;
  export let alignment;
  export let y;
  export let left = 0;
</script>

<div
  class={`absolute flex ${alignment} min-h-fit`}
  style={`top: ${y}px; height: ${fullHeight}px; left: ${hasNoRange ? 10 : left}px;`}
>
  <div class="tick-label pl-2 leading-tight flex flex-col">
    <span
      class="text-sm text-contour-weak leading-[1.1]"
      class:text-contour-weaker={!latest}>{label}</span
    >
    {#if latest}
      <span class="text-xs {text} leading-none pt-1"
        >{formatValue(latest.range[0] * 100, 'percent-in-range')}–{formatValue(latest.range[1], 'percent')} in <span class:font-bold={differentYears}>{latest.year}</span></span
      >
    {/if}
  </div>
</div>
