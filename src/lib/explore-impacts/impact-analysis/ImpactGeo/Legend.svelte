<script>
  import { min } from 'd3-array';

  import { rgb } from 'd3-color';
  import { onMount } from 'svelte';

  export let scale;

  let canvas;
  let width;
  let height;
  $: ticks = scale.copy().ticks(5);
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
  <span>{domain[0]}</span>
  <div
    class="canvas-wrapper"
    bind:clientWidth={width}
    bind:clientHeight={height}
  >
    <canvas bind:this={canvas} {width} {height} />
  </div>
  <span>{domain[1]}</span>
</div>

<style>
  .wrapper {
    display: flex;
  }
  .canvas-wrapper {
    height: 20px;
    width: 250px;
  }
</style>
