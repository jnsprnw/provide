<script>
  import { STATUS_FAILED, STATUS_SUCCESS } from '$src/config.js';
  import Message from '$lib/helper/Message.svelte';
  import { each, filter } from 'lodash-es';

  export let props = {}; // Regular props/state that need to be kept in sync with the asyncProps
  export let asyncProps = {}; // Array or Dict of regular object that have a status property
  export let process = (d) => d; // Function for data processing before props are passed to slot
  export let isEmpty = true; // true only on first load if no data is loaded yet
  export let isLoading; // true if no data or only partial data is loaded yet
  export let isFailed = false;
  export let warningSizeSmall = false;
  export let warningBackground = true;
  export let warningInverted = false;

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
  $: isFailed = !!filter(flatData, (d) => d.status === STATUS_FAILED).length;

  // Set isEmpty to false only after initial data was loaded. Afterwards it is always false
  $: if (currentAsyncProps) isEmpty = false;

  $: if (loadedData.length !== flatData.length || !flatData.length) {
    isLoading = true;
  } else {
    isLoading = false;
  }

  $: if (!isLoading && !isFailed) {
    currentProps = props;
    currentAsyncProps = process
      ? { ...asyncProps, ...process(asyncProps, props) } // Make sure all props are part of the passed props, but allow for overwriting them
      : asyncProps;
  }
</script>

{#if isFailed}
  <slot name="failed">
    <Message {warningBackground} {warningSizeSmall} {warningInverted} warningSign={true} headline="Data could not be loaded for this graph">
      <span>This is probably because the data is not available for this selection.</span>
      <span>Try another combination of geography, indicator and scenarios.</span>
      {#if flatData.length}
        <div class="mt-4 font-mono text-xs text-text-weaker flex flex-col" class:text-white={warningInverted}>
          {#each flatData.filter(({ message }) => typeof message !== 'undefined') as { message }}<span>{message}</span>{/each}
        </div>
      {/if}
    </Message>
  </slot>
{:else if isEmpty}
  <slot name="placeholder" />
{:else}
  {#if isLoading}
    <slot name="loading" />
  {/if}
  <slot {isLoading} {isEmpty} asyncProps={currentAsyncProps} props={currentProps} />
{/if}
