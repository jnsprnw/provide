<script>
  import { STATUS_FAILED, STATUS_SUCCESS } from '$src/config.js';
  import { each, filter } from 'lodash-es';

  export let props; // Regular props/state that need to be kept in sync with the asyncProps
  export let asyncProps; // Array or Dict of regular object that have a status property
  export let process; // Function for data processing before props are passed to slot
  export let isEmpty = true; // true only on first load if no data is loaded yet
  export let isLoading; // true if no data or only partial data is loaded yet
  export let renderWhileEmpty = false; // If set to true, slot component has to know how to deal with unloaded data
  export let isFailed = false;

  let currentProps;
  let currentAsyncProps; // Always holds previous props and only gets updated once all data is loaded

  function flattenData(datum, acc = []) {
    if (Array.isArray(datum) || !datum.status) {
      each(datum, (d) => flattenData(d, acc));
    } else {
      acc.push(datum);
    }
    return acc;
  }

  // Data can be passed as key value store, as array or simply as single data object
  $: flatData = flattenData(asyncProps);

  $: loadedData = filter(flatData, (d) => d.status === STATUS_SUCCESS);
  $: isFailed = filter(flatData, (d) => d.status === STATUS_FAILED).length;

  // Set isEmpty to false only after initial data was loaded. Afterwards it is always false
  $: if (currentAsyncProps) isEmpty = false;

  $: if (loadedData.length !== flatData.length) {
    isLoading = true;
  } else {
    isLoading = false;
  }

  $: if (!isLoading) {
    currentProps = props;
    currentAsyncProps = process
      ? { ...asyncProps, ...process(asyncProps, props) } // Make sure all props are part of the passed props, but allow for overwriting them
      : asyncProps;
  }
</script>

{#if isFailed}
  <slot name="failed"
    ><div class="error-message">⚠️ Something went wrong here!</div></slot
  >
{:else if isEmpty && !renderWhileEmpty}
  <slot name="placeholder" />
{:else}
  {#if isLoading}
    <slot name="loading" />
  {/if}
  <slot
    {isLoading}
    {isEmpty}
    asyncProps={currentAsyncProps}
    props={currentProps}
  />
{/if}

<style>
  .error-message {
    background: var(--color-background-stronger);
    padding: var(--space-xl) 0;
    border: 1px solid var(--color-foreground-weakest);
    text-align: center;
  }
</style>
