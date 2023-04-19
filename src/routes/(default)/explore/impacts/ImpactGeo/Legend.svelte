<script>
  import { formatValue } from '$lib/utils/formatting';

  import { rgb, hsl } from 'd3-color';
  import { scaleLinear } from 'd3-scale';
  import { getContext } from 'svelte';

  export let scale;
  export let unit;
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
  $: xRange = isSequential
    ? [0, width]
    : [0, Math.abs((domain[0] / domainDelta) * width), width];
  $: colorScale = scaleLinear().domain(xRange).range(range);
  $: xScale = scaleLinear().domain(domain).range(xRange);
  $: tick = isSequential ? [domain[0] + domainDelta / 2] : [0];
  $: tickX = xScale(tickX);
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

      for (let x = domain[0]; x < width; x++) {
        ctx.fillStyle = colorScale(x);
        ctx.fillRect(x, 0, 1, height);
      }
    }
  })();
  //
</script>

<div class="flex items-center">
  <span class="text-xs text-foreground-weak leading-3 text-end"
    >Below<br /><span class="text-foreground-base font-bold"
      >{formatValue(domain[0], unit.uid)}</span
    ></span
  >
  <div
    class="w-40 h-5 my-5 mx-1.5"
    bind:clientWidth={width}
    bind:clientHeight={height}
  >
    <canvas bind:this={canvas} {width} {height} />
    <div class="ticks">
      <span
        style={`left: ${xScale(tick)}px;`}
        style:color={getContrastColor(
          colorAtTick,
          $theme.color.background.base,
          $theme.color.foreground.base
        )}
        class="absolute text-xs text-background-base font-bold top-1/2 -translate-x-1/2 -translate-y-1/2"
        >{formatValue(tick, unit.uid)}</span
      >
    </div>
  </div>
  <span class="text-xs text-foreground-weak leading-3"
    >Above<br /><span class="text-foreground-base font-bold"
      >{formatValue(domain[domain.length - 1], unit.uid)}</span
    ></span
  >
</div>
