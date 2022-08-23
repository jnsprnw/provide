<script>
  import { getContext, onMount } from 'svelte';
  import { scaleCanvas } from 'layercake';

  const { flatData, x, y, zGet, xScale, yScale, custom, width, height } =
    getContext('LayerCake');

  const { ctx } = getContext('canvas');

  $: data = $flatData.filter((d) => d.distribution !== undefined);

  $: if ($ctx) {
    scaleCanvas($ctx, $width, $height);
    $ctx.clearRect(0, 0, $width, $height);

    data.forEach((d, i) => {
      $ctx.beginPath();
      const x1 = $xScale($x(d) - $custom.xStep / 2);
      const y1 = $yScale($y(d) - $custom.yStep / 2);
      const x2 = $xScale($x(d) + $custom.xStep / 2);
      const y2 = $yScale($y(d) + $custom.yStep / 2);
      const z = $zGet(d);
      $ctx.fillStyle = z;
      // currently a cell is drawn to the bottom right of the actual coordinate...
      $ctx.rect(x1, y1, x2 - x1, y2 - y1);
      //$ctx.rect(x1, y1 - (y2 - y1) / 2, x2 - x1, y2 - y1);
      $ctx.fill();
      $ctx.closePath();
    });
  }
</script>

<style>
</style>
