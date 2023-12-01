<script>
  import Message from '$lib/helper/Message.svelte';
  import {
    IS_EMPTY_INDICATOR,
    IS_COMBINATION_AVAILABLE_INDICATOR,
    IS_COMBINATION_AVAILABLE_SCENARIO,
    CURRENT_SCENARIOS,
    IS_COMBINATION_AVAILABLE,
    IS_EMPTY_SELECTION,
    IS_EMPTY_SCENARIO,
    IS_EMPTY_GEOGRAPHY
  } from '$stores/state';
  import { IS_INVALID_AVOID_PARAMETERS } from '$stores/avoid.js';

  $: unavailableItems = [
    [$IS_COMBINATION_AVAILABLE_INDICATOR, 'indicator'],
    [$IS_COMBINATION_AVAILABLE_SCENARIO, $CURRENT_SCENARIOS.length > 1 ? 'scenario(s)' : 'scenario'],
  ]
    .filter(([isAvailable]) => !isAvailable)
    .map(([_, label]) => label);

  const listFormat = new Intl.ListFormat('en', { style: 'long', type: 'conjunction' });
</script>

{#if $IS_EMPTY_SELECTION}
  {#if $IS_EMPTY_GEOGRAPHY}
  <Message headline="No geography selected">
    <span>Select a geography from the dropdown at the top of this page.</span>
  </Message>
  {:else if $IS_EMPTY_INDICATOR}
    <Message headline="No indicator selected">
      <span>Select an indicator from the dropdown at the top of this page.</span>
    </Message>
  {:else if $IS_EMPTY_SCENARIO}
    <Message headline="No scenario selected">
      <span>Select one or more scenarios from the dropdown at the left hand side of this page.</span>
    </Message>
  {/if}
{:else if !$IS_COMBINATION_AVAILABLE}
  <Message headline="There is no data for your current selection">
    {#if unavailableItems.length}
      <span class="text-contour-weaker">The selected {listFormat.format(unavailableItems)} {unavailableItems.length > 1 ? 'are' : 'is'} not available in this combination.</span>
    {/if}
  </Message>
{:else if $IS_INVALID_AVOID_PARAMETERS}
  <Message headline="No parameters selected">
    <span>Select parameter from the left hand side of this page.</span>
  </Message>
{:else}
  <Message headline="Some parameters are missing">
    <span>This should not happen. Please get in contact with us.</span>
  </Message>
{/if}
