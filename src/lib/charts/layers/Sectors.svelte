<script>
  import { getContext } from 'svelte';
  const { data, xGet, yGet, xDomain, yDomain, xScale, yScale } = getContext('LayerCake');
  import { min, max } from 'lodash-es';
  const sectors = [{
    label: 'High overshoot',
    x: [undefined, 0],
    y: [1.5, undefined],
    textPostion: 'top'
  }, {
    label: 'High warming',
    x: [0, undefined],
    y: [1.5, undefined],
    textPostion: 'top'
  }, {
    label: 'Low or no overshoot',
    x: [undefined, 0],
    y: [undefined, 1.5],
    textPostion: 'bottom'
  }];

  $: fields = sectors.map(({ label, x, y, textPostion }) => {
    let [xMin, xMax] = x;
    let [yMin, yMax] = y;
    xMin = $xScale(max([xMin, $xDomain[0]]));
    xMax = $xScale(min([xMax, $xDomain[1]]));
    yMin = $yScale(max([yMin, $yDomain[0]]));
    yMax = $yScale(min([yMax, $yDomain[1]]));
    const xText = xMin + (xMax - xMin) / 2;
    const yText = textPostion === 'top' ? yMax + 3 : yMin - 3;
    const baseline = textPostion === 'top' ? 'hanging' : 'auto';
    return {
      label,
      xMin,
      xMax,
      yMin,
      yMax,
      xText,
      yText,
      baseline
    }
  })
</script>

{#each fields as { label, xMin, xMax, yMin, yMax, xText, yText, baseline }}
<g>
  <path
    class="sector"
    d={`M${xMin} ${yMin}H${xMax}V${yMax}H${xMin}Z`}
  />
  <text class="chart-label" dominant-baseline={baseline} x={xText} y={yText} text-anchor="middle">{ label }</text>
</g>
{/each}

<style lang="scss">
  .sector {
    stroke-width: 2px;
    fill: var(--color-background-weakest);
    stroke: var(--color-background-base);
  }
</style>
