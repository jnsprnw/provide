<script>
  import { STATUS_SUCCESS } from '$lib/../config.js';

  export let slotProps;
  export let process;
  export let isEmpty = true; // true only on first load if no data is loaded yet
  export let isLoading; // true if no data or only partial data is loaded yet
  export let renderWhileEmpty = false;

  let currentSlotProps = slotProps; // Always holds previous props and only gets updated once all data is loaded

  $: data = Array.isArray(slotProps.data) ? slotProps.data : [slotProps.data];
  $: loadedData = data.filter((d) => d.status === STATUS_SUCCESS);

  $: if (loadedData.length > 0) isEmpty = false;

  $: if (loadedData.length !== data.length) {
    isLoading = true;
  } else {
    isLoading = false;
  }

  $: if (!isLoading)
    currentSlotProps = process ? process(slotProps) : slotProps;
</script>

{#if isEmpty && !renderWhileEmpty}
  <slot name="placeholder"><div class="placeholder">Loading</div></slot>
{:else}
  {#if isLoading}
    <slot name="loading" />
  {/if}
  <slot {isLoading} {isEmpty} props={currentSlotProps} />
{/if}

<style>
  .placeholder {
    position: absolute;
    width: 100%;
    height: 100%;
  }
</style>
