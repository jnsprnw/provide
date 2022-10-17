<script>
  import { getContext } from 'svelte';
  const { yScale } = getContext('LayerCake');
  export let isSmall = false;
  const text = "Preliminary results";
  const layers = [true, false]; // One background layer, one normal layer
</script>

<g>
  {#each layers as layer}
  <text
    class="chart-message"
    class:chart-message--small={isSmall}
    class:chart-message--background={layer}
    x="10"
    y={$yScale.range()[1] + 10}
    text-anchor="start"
    dominant-baseline="hanging" >
    { text }
  </text>
  {/each}
</g>

<style lang="scss">
  
</style>
