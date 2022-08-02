<script>
  import { getContext, onMount } from "svelte";
  import { scaleCanvas } from "layercake";

  const {
    flatData,
    x,
    y,
    xGet,
    yGet,
    zGet,
    xScale,
    yScale,
    custom,
    width,
    height,
  } = getContext("LayerCake");

  const { ctx } = getContext("canvas");

  $: data = $flatData.filter((d) => d.distribution !== undefined);

  $: console.log($ctx);

  $: if ($ctx) {
    scaleCanvas($ctx, $width, $height);
    $ctx.clearRect(0, 0, $width, $height);

    data.forEach((d, i) => {
      $ctx.beginPath();
      const x1 = $xGet(d);
      const y1 = $yGet(d);
      const x2 = $xScale($x(d) + $custom.xStep);
      const y2 = $yScale($y(d) + $custom.yStep);
      const z = $zGet(d);
      $ctx.fillStyle = z;
      // currently a cell is drawn to the bottom right of the actual coordinate...
      $ctx.rect(x1, y1, x2 - x1, y2 - y1);
      //$ctx.rect(x1, y1 - (y2 - y1) / 2, x2 - x1, y2 - y1);
      $ctx.fill();
      $ctx.closePath();
      i < 20 && console.log(d, x1);
    });
  }
</script>

<style>
</style>
