<script>
  import { getContext } from 'svelte';
  import ChartTooltip from './ChartTooltip.svelte';

  const { flatData } = getContext('LayerCake');
  export let formatValue;
</script>

{#each $flatData as data, i}
  <ChartTooltip {data}>
    <slot>{formatValue(data.value)}</slot>
  </ChartTooltip>
{/each}
