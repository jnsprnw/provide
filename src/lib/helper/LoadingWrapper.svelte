<script>
  import { STATUS_SUCCESS } from '$lib/../config.js';
  import { each, filter } from 'lodash-es';

  export let slotProps;
  export let process;
  export let id;
  export let isEmpty = true; // true only on first load if no data is loaded yet
  export let isLoading; // true if no data or only partial data is loaded yet
  export let renderWhileEmpty = false; // If set to true, slot component has to know how to deal with unloaded data

  let currentSlotProps = slotProps; // Always holds previous props and only gets updated once all data is loaded

  function flattenData(datum, acc = []) {
    if (Array.isArray(datum) || !datum.status) {
      each(datum, (d) => flattenData(d, acc));
    } else {
      acc.push(datum);
    }
    return acc;
  }

  // Data can be passed as key value store, as array or simply as single data object
  $: flatData = flattenData(slotProps.data);
  $: loadedData = filter(flatData, (d) => d.status === STATUS_SUCCESS);

  $: if (loadedData.length > 0) isEmpty = false;

  $: if (loadedData.length !== flatData.length) {
    isLoading = true;
  } else {
    isLoading = false;
  }

  $: if (!isLoading) {
    currentSlotProps = process
      ? { ...slotProps, ...process(slotProps) } // Make sure all props are part of the passed props, but allow for overwriting them
      : slotProps;
  }
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
