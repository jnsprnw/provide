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

<div
  class="absolute rounded-full"
  style={`
    left: ${x}px;
    top: ${y}px;
    width: 25px;
    height: 25px;
    transform: translate(-50%, -50%)`}
  use:popover={{ content, IS_ACTIVE, active: $IS_ACTIVE }}
/>

{#if $IS_ACTIVE}
  <span
    class="inline-block w-3 h-3 bg-black absolute rounded-full pointer-events-none"
    style={`
  left: ${x}px;
  top: ${y}px;
  transform: translate(-50%, -50%)`}
  />
{/if}
