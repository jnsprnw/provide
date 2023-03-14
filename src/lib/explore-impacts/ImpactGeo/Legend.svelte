<script>
  import { formatValue } from '$lib/utils/formatting';

  import { rgb } from 'd3-color';
  import { scaleLinear } from 'd3-scale';

  export let scale;
  export let unit;

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

  $: (async () => {
    if (canvas) {
      const ctx = canvas.getContext('2d');
      await ctx.clearRect(0, 0, width, height);

      for (let x = domain[0]; x < width; x++) {
        ctx.fillStyle = rgb(colorScale(x)).hex();
        ctx.fillRect(x, 0, 1, height);
      }
    }
  })();
</script>

<div class="root">
  <span class="tick-label">Below<br />{formatValue(domain[0], unit.uid)}</span>
  <div
    class="canvas-wrapper"
    bind:clientWidth={width}
    bind:clientHeight={height}
  >
    <canvas bind:this={canvas} {width} {height} />
    <div class="ticks">
      <span style={`left: ${xScale(tick)}px;`} class="tick"
        ><span class="tick-label">{formatValue(tick, unit.uid)}</span></span
      >
    </div>
  </div>
  <span class="tick-label"
    >Above<br />{formatValue(domain[domain.length - 1], unit.uid)}</span
  >
</div>

<style lang="postcss">
  .root {
    display: flex;
    align-items: center;
  }
  .canvas-wrapper {
    height: 15px;
    width: 250px;
    margin: 0 var(--space-xxs);
    position: relative;
  }
  .tick {
    position: absolute;
    top: 0;
    font-size: var(--font-size-s);
    height: 100%;

    .tick-label {
      transform: translate(-50%, 100%);
      height: 100%;
      display: inline-block;
    }

    &:before {
      content: '';
      left: 0.5px;
      height: 100%;
      border-right: 1px solid rgba(white, 0.6);
      position: absolute;
      top: 0;
    }
  }
  .tick-label {
    font-size: var(--font-size-s);
    color: var(--color-text-weaker);
    line-height: var(--font-line-height-tightest);

    &:first-child {
      text-align: right;
    }
  }
</style>
