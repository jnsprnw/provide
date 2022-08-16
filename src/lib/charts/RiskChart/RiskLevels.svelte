<script>
  import { UNAVOIDABLE_UID } from '$lib/../config';
  import Hatching from '$lib/helper/Hatching.svelte';
  import { getContext } from 'svelte';

  const { data, xScale, yGet, height, xGet } = getContext('LayerCake');

  export let hatchingColor;

  $: years = $xScale.domain();

  $: scenarios = $data.filter((d) => d.uid !== UNAVOIDABLE_UID);
  $: unavoidable = $data.filter((d) => d.uid === UNAVOIDABLE_UID)[0];
</script>

<defs>
  <Hatching color={hatchingColor} />
</defs>
<g>
  {#each years as year, yearIndex}
    <rect
      x={$xScale(year)}
      y={$height - ($height - $yGet(unavoidable.values[yearIndex]))}
      height={$height - $yGet(unavoidable.values[yearIndex])}
      width={$xScale.bandwidth()}
      fill="url(#hatching)"
    />
  {/each}
  {#each scenarios as scenario}
    {#each scenario.values as value}
      <g transform={`translate(${$xGet(value)} ,${$yGet(value)})`}>
        <line
          x2={$xScale.bandwidth()}
          class="line"
          class:active={Boolean(scenario.color)}
          style={`stroke: ${scenario.color};`}
        />
      </g>
    {/each}
  {/each}
</g>

<style lang="scss">
  .line {
    stroke-width: 2;
    stroke: var(--color-foreground-weakest);

    &.active {
      stroke-width: 4;
    }
  }
</style>
