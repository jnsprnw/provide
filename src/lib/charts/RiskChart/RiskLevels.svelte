<script>
  import { UNAVOIDABLE_UID } from '$src/config';
  import { getContext } from 'svelte';

  const { data, xScale, yGet, height, xGet } = getContext('LayerCake');

  // Sort array to have active scenarios at top
  $: scenarios = $data.filter((d) => d.uid !== UNAVOIDABLE_UID).sort((a, b) => Boolean(a.color) - Boolean(b.color));

  $: bandwidth = $xScale.bandwidth();
</script>

{#if $height > 0}
  <g>
    {#each scenarios as scenario}
      {@const isActive = Boolean(scenario.color)}
      {@const radius = 8 - (isActive ? 0 : 2)}
      {#each scenario.values as value}
        <g class:opacity-70={!isActive} transform={`translate(${$xGet(value) + bandwidth / 2} ,${$yGet(value)})`}>
          <circle
            class="stroke-[4px] stroke-background-base"
            r={radius}
          />
          <circle
            class:fill-background-weakest={!isActive}
            style={`fill: ${scenario.color};`}
            r={radius}
          />
        </g>
      {/each}
    {/each}
  </g>
{/if}
