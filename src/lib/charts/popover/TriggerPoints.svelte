<script>
  import { getContext } from 'svelte';
  import popover from '$lib/utils/popover';
  import { writable } from 'svelte/store';

  const { yGet, xGet } = getContext('LayerCake');

  export let data;
  export let content;

  let IS_ACTIVE = writable(false);

  $: x = $xGet(data);
  $: y = $yGet(data);
</script>

<g transform={`translate(${x}, ${y})`}>
  <g use:popover={{ content, IS_ACTIVE }}>
    <circle r={12} class="fill-transparent" />
    <circle r={1.4} class="fill-transparent stroke-1 stroke-surface-base" />
    <circle r={1.4} fill={data.color} class="opacity-60" />
  </g>

  {#if $IS_ACTIVE}
    <circle fill={data.color} class="pointer-events-none stroke-2 stroke-surface-base" r={5} />
  {/if}
</g>
