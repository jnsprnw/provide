<script>
  import { getContext } from 'svelte';

  const { data, xGet, z, zGet, xScale, yScale } = getContext('LayerCake');

  export let formatValue;

  $: stepSize = $xScale.bandwidth();
  $: width = stepSize / 4;
  $: items = $data.map((d) => {
    const top = $yScale(d.max);
    const height = $yScale(d.min) - $yScale(d.max);
    const centerY = $yScale(d.value) - top;
    const centerX = width / 2;
    const left = $xGet(d) + stepSize / 2 - centerX;
    const color = $z(d);

    return {
      ...d,
      top,
      height,
      centerY,
      centerX,
      left,
      width,
      color,
    };
  });
</script>

{#each items as { top, height, centerY, centerX, max, min, value, left, width, color }}
  <g transform={`translate(${left}, ${top})`}>
    <text x={centerX} y={-5} class="text-xs text-anchor-middle"
      >{formatValue(max)}</text
    >
    <text x={-5} y={centerY + 4} class="font-bold text-xs text-anchor-end"
      >{formatValue(value)}</text
    >
    <text x={centerX} y={height + 13} class="text-xs text-anchor-middle"
      >{formatValue(min)}</text
    >
    <rect {height} {width} style={`fill: ${color}; opacity: .3`} />
    <line
      x2={width}
      y1={centerY}
      y2={centerY}
      style={`stroke-width: 4; stroke: ${color}`}
    />
  </g>
{/each}
