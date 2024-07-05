<script>
  import { formatRange } from '$lib/utils/formatting';

  import { hsl } from 'd3-color';
  import { scaleLinear } from 'd3-scale';
  import { getContext } from 'svelte';

  export let scale;
  export let unit;
  export let hasUrbanBoundary;
  const theme = getContext('theme');

  let canvas;
  let width;
  let height;
  $: domain = scale.domain();
  $: range = scale.range();
  $: isSequential = domain.length === 2;
  $: domainDelta = Math.abs(domain[0] - domain[domain.length - 1]);
  // Find the range to position x ticks and the gradient values
  // If scale is not sequential, the middle point is calculated depending on the
  // ratio between the range above and below zero
  $: xRange = isSequential ? [0, width] : [0, Math.abs((domain[0] / domainDelta) * width), width];
  $: colorScale = scaleLinear().domain(xRange).range(range);
  $: xScale = scaleLinear().domain(domain).range(xRange);
  $: tick = isSequential ? [domain[0] + domainDelta / 2] : [0];
  $: tickX = xScale(tick);
  $: colorAtTick = colorScale(tickX);

  function getContrastColor(background, color1, color2) {
    const c1 = hsl(color1).l;
    const c2 = hsl(color2).l;
    const b = hsl(background).l;
    return Math.abs(b - c1) > Math.abs(b - c2) ? color1 : color2;
  }

  $: (async () => {
    if (canvas) {
      const ctx = canvas.getContext('2d');
      await ctx.clearRect(0, 0, width, height);
      for (let x = 0; x < width; x++) {
        ctx.fillStyle = colorScale(x);
        ctx.fillRect(x, 0, 1, height);
      }

      ctx.fillStyle = getContrastColor(colorScale(width / 2), $theme.color.surface.base, $theme.color.contour.base);
      ctx.fillRect(tickX, 0, 1, 3);
    }
  })();

  $: [min, middle, max] = formatRange([domain[0], tick, domain[domain.length - 1]], unit.uid).values;

  let tickTranslateClass;
  let tickOffsetX;
  $: if ((100 / width) * tickX > 75) {
    tickTranslateClass = '-translate-x-full';
    tickOffsetX = 3;
  } else if ((100 / width) * tickX < 25) {
    tickTranslateClass = 'translate-x-full';
    tickOffsetX = -3;
  } else {
    tickTranslateClass = '-translate-x-1/2';
    tickOffsetX = 0;
  }
</script>

<div class="flex flex-col gap-3">
  <div class="flex items-center">
    <span class="text-xs text-contour-weak leading-3 text-end">Below<br /><span class="text-contour-base font-bold">{min}</span></span>
    <div class="w-40 h-[20px] mx-2" bind:clientWidth={width} bind:clientHeight={height}>
      <canvas bind:this={canvas} {width} {height} />
      <div class="ticks">
        <span
          style={`left: ${tickX + tickOffsetX}px; top: calc(50% + 1px);`}
          style:color={getContrastColor(colorAtTick, $theme.color.surface.base, $theme.color.contour.base)}
          class="absolute text-xs text-surface-base font-bold {tickTranslateClass} -translate-y-1/2"
          >{middle}
        </span>
      </div>
    </div>
    <span class="text-xs text-contour-weak leading-3">Above<br /><span class="text-contour-base font-bold">{max}</span></span>
  </div>
  {#if hasUrbanBoundary}
    <span class="pl-1 flex items-center gap-1 text-xs"
      ><svg width="18" height="2"><line x1="0" x2="18" y1="1" y2="1" stroke="black" stroke-width="1.2" stroke-dasharray="2.2, 3" /></svg>Urban area boundary</span
    >
  {/if}
</div>
