<script>
  import { UNAVOIDABLE_UID } from '$lib/../config';
  import { getContext } from 'svelte';

  const { data, xScale, yGet, height, xGet } = getContext('LayerCake');

  $: console.log();
  $: years = $xScale.domain();

  $: scenarios = $data.filter((d) => d.uid !== UNAVOIDABLE_UID);
  $: unavoidable = $data.filter((d) => d.uid === UNAVOIDABLE_UID)[0];
</script>

<g>
  {#each years as year, yearIndex}
    <rect
      x={$xScale(year)}
      y={$height - ($height - $yGet(unavoidable.values[yearIndex]))}
      height={$height - $yGet(unavoidable.values[yearIndex])}
      width={$xScale.bandwidth()}
    />
  {/each}
  {#each scenarios as scenario}
    {#each scenario.values as value}
      <g transform={`translate(${$xGet(value)} ,${$yGet(value)})`}>
        <line
          x2={$xScale.bandwidth()}
          class="line"
          style={`stroke: ${scenario.color};`}
        />
      </g>
    {/each}
  {/each}
</g>

<style>
  .line {
    stroke-width: 2;
    stroke: var(--color-foreground-weakest);
  }
</style>
