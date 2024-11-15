<script>
  import { randomNormal } from 'd3-random';
  import { range } from 'd3-array';
  import { onMount } from 'svelte';
  const size = 15;
  const randomizer = randomNormal(size, size / 4);
  const points = range(50).map((i) => [randomizer(i), randomizer(i)]);
  let canvas = null;
  onMount(() => {
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'rgba(0, 0, 0, .6)';
    for (const [x, y] of points) {
      ctx.beginPath();
      ctx.ellipse(x, y, 0.75, 0.75, 0, 0, Math.PI * 2);
      ctx.fill();
    }
  });
</script>

<div class="border-l border-r-surface-base flex items-center gap-0.5 pl-2">
  <canvas bind:this={canvas} width={size * 2} height={size * 2} style:width={size} style:height={size} />
  <span class="text-xs text-text-base font-bold">Glacier locations </span>
</div>
