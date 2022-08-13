<script>
  import { getContext } from 'svelte';
  const { data, xGet, yGet, xDomain, yDomain, xScale, yScale } = getContext('LayerCake');
  import { min, max } from 'lodash-es';
  const sectors = [{
    label: 'High overshoot',
    x: [undefined, 0],
    y: [1.5, undefined]
  }, {
    label: 'High warming',
    x: [0, undefined],
    y: [1.5, undefined]
  }, {
    label: 'Low or no overshoot',
    x: [undefined, 0],
    y: [undefined, 1.5]
  }];

  $: fields = sectors.map(({ label, x, y }) => {
    let [xMin, xMax] = x;
    let [yMin, yMax] = y;
    xMin = $xScale(max([xMin, $xDomain[0]]));
    xMax = $xScale(min([xMax, $xDomain[1]]));
    yMin = $yScale(max([yMin, $yDomain[0]]));
    yMax = $yScale(min([yMax, $yDomain[1]]));
    return {
      label,
      xMin,
      xMax,
      yMin,
      yMax
    }
  })
</script>

{#each fields as {label, xMin, xMax, yMin, yMax}}
  <path
    class="sector"
    d={`M${xMin} ${yMin}H${xMax}V${yMax}H${xMin}Z`}
  />
{/each}

<style lang="scss">
  .sector {
    stroke-width: 2px;
    fill: var(--color-background-weakest);
    stroke: var(--color-background-base);
  }
</style>
