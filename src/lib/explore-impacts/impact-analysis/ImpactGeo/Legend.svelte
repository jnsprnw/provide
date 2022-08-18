<script>
  import { formatValue } from '$lib/utils/formatting';

  import { rgb } from 'd3-color';

  export let scale;
  export let unit;

  let canvas;
  let width;
  let height;
  $: ticks = scale.copy().ticks(4).slice(1, -1);
  $: colorScale = scale.copy().domain([0, width]);
  $: xScale = scale.copy().range([0, width]);
  $: domain = scale.domain();

  $: (async () => {
    if (canvas) {
      const ctx = canvas.getContext('2d');
      await ctx.clearRect(0, 0, width, height);

      for (let x = 0; x < width; x++) {
        ctx.fillStyle = rgb(colorScale(x)).hex();
        ctx.fillRect(x, 0, 1, height);
      }
    }
  })();
</script>

<div class="wrapper">
  <span class="tick-label">Below<br />{formatValue(domain[0], unit.uid)}</span>
  <div
    class="canvas-wrapper"
    bind:clientWidth={width}
    bind:clientHeight={height}
  >
    <canvas bind:this={canvas} {width} {height} />
    <div class="ticks">
      {#each ticks as tick}
        <span style={`left: ${xScale(tick)}px;`} class="tick"
          ><span class="tick-label"
            >{formatValue(tick, unit.uid, { addSuffix: false })}</span
          ></span
        >
      {/each}
    </div>
  </div>
  <span class="tick-label">Above<br />{formatValue(domain[1], unit.uid)}</span>
</div>

<style lang="scss">
  .wrapper {
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
