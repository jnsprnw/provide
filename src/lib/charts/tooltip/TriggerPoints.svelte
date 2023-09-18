<script>
  import { getContext } from 'svelte';
  import tooltip from '$lib/utils/tooltip';
  import { writable } from 'svelte/store';

  const { yGet, xGet } = getContext('LayerCake');

  export let data;
  export let content;

  let IS_ACTIVE = writable(false);

  $: x = $xGet(data);
  $: y = $yGet(data);
</script>

<g transform={`translate(${x}, ${y})`}>
  <circle
    r={12}
    class="fill-transparent"
    use:tooltip={{ content, IS_ACTIVE }}
  />

  {#if $IS_ACTIVE}
    <circle
      fill={data.color}
      class="pointer-events-none stroke-2 stroke-surface-base"
      r={5}
    />
  {/if}
</g>
