<script>
  import { getContext } from 'svelte';
  const { data, xGet, yGet, xDomain, yDomain, xScale, yScale } = getContext('LayerCake');
  import { min, max } from 'lodash-es';
  import { interpolateLab } from 'd3-interpolate';
  const theme = getContext('theme');

  const sectors = [{
    label: 'High overshoot',
    x: [undefined, 0],
    y: [1.6, undefined],
    bg: 0
  }, {
    label: 'High warming',
    x: [0, undefined],
    y: [1.6, undefined],
    bg: 0
  }, {
    x: [0, undefined],
    y: [1.5, 1.6],
    bg: 0.5
  }, {
    x: [undefined, 0],
    y: [1.5, 1.6],
    bg: 0.5
  }, {
    label: 'Low or no overshoot',
    x: [undefined, 0],
    y: [undefined, 1.5],
    textPostion: 'bottom',
    bg: 1
  }, {
    x: [0, undefined],
    y: [undefined, 1.5],
    bg: 1
  }];

  const fillColor = interpolateLab($theme.color.petrol300, $theme.color.petrol100);

  $: fields = sectors.map(({ label, x, y, textPostion = 'top', bg }) => {
    let [xMin, xMax] = x;
    let [yMin, yMax] = y;
    xMin = $xScale(max([xMin, $xDomain[0]]));
    xMax = $xScale(min([xMax, $xDomain[1]]));
    yMin = $yScale(max([yMin, $yDomain[0]]));
    yMax = $yScale(min([yMax, $yDomain[1]]));
    const xText = xMin + (xMax - xMin) / 2;
    const yText = textPostion === 'top' ? yMax + 3 : yMin - 3;
    const baseline = textPostion === 'top' ? 'hanging' : 'auto';
    const fill = fillColor(bg)
    return {
      label,
      xMin,
      xMax,
      yMin,
      yMax,
      xText,
      yText,
      baseline,
      fill
    }
  })
</script>

{#each fields as { label, xMin, xMax, yMin, yMax, xText, yText, baseline, fill }}
<g>
  <path
    class="sector"
    d={`M${xMin} ${yMin}H${xMax}V${yMax}H${xMin}Z`}
    {fill}
  />
  {#if label}
  <text
    class="chart-label"
    dominant-baseline={baseline}
    x={xText}
    y={yText}
    text-anchor="middle">{ label }</text>
  {/if}
</g>
{/each}

<style lang="scss">
  .sector {
    stroke-width: 1px;
    // fill: var(--color-background-weakest);
    stroke: var(--color-background-base);
    opacity: 0.2;
  }
</style>
