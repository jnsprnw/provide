<script>
  import { getContext } from 'svelte';

  const { data, xGet, z, zGet, xScale, yScale } = getContext('LayerCake');

  $: stepSize = $xScale.bandwidth();
  $: width = stepSize / 4;
  $: items = $data.map((d) => {
    const top = $yScale(d.max);
    const bottom = $yScale(d.min);
    const height = $yScale(d.min) - $yScale(d.max);
    const centerY = $yScale(d.value) - top;
    const centerX = width / 2;
    const left = $xGet(d) + stepSize / 2 - centerX;
    const color = $z(d);

    return {
      top,
      bottom,
      height,
      centerY,
      centerX,
      left,
      width,
      color,
    };
  });
</script>

{#each items as { top, bottom, height, centerY, centerX, left, width, color }}
  <g transform={`translate(${left}, ${top})`}>
    <rect {height} {width} style={`fill: ${color}; opacity: .3`} />
    <line
      x2={width}
      y1={centerY}
      y2={centerY}
      style={`stroke-width: 4; stroke: ${color}`}
    />
  </g>
{/each}
