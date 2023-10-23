<script>
  import { DEFAULT_GEOGRAPHY_UID, DEFAULT_INDICATOR_UID, DEFAULT_SCENARIOS_UID } from '$src/config';
  import {
    IS_EMPTY_INDICATOR,
    CURRENT_GEOGRAPHY_UID,
    CURRENT_INDICATOR_UID,
    CURRENT_SCENARIOS_UID,
    IS_COMBINATION_AVAILABLE_INDICATOR,
    IS_COMBINATION_AVAILABLE_SCENARIO,
    CURRENT_SCENARIOS,
    SELECTABLE_SCENARIOS_UID,
    IS_COMBINATION_AVAILABLE,
    IS_EMPTY_SELECTION,
    IS_EMPTY_SCENARIO,
  } from '$stores/state';

  $: emptyItems = [
    [$IS_EMPTY_INDICATOR, 'indicator'],
    [$IS_EMPTY_SCENARIO, 'one or more scenarios'],
  ]
    .filter(([isAvailable]) => !isAvailable)
    .map(([_, label]) => label);

  $: unavailableItems = [
    [$IS_COMBINATION_AVAILABLE_INDICATOR, 'indicator'],
    [$IS_COMBINATION_AVAILABLE_SCENARIO, $CURRENT_SCENARIOS.length > 1 ? 'scenario(s)' : 'scenario'],
  ]
    .filter(([isAvailable]) => !isAvailable)
    .map(([_, label]) => label);

  const listFormat = new Intl.ListFormat('en', { style: 'long', type: 'conjunction' });
</script>

<div
  class="flex flex-col gap-y-2 items-center justify-center py-24 min-h-[70vh]"
  role="alert"
>
  {#if $IS_EMPTY_SELECTION}
    {#if $IS_EMPTY_INDICATOR}
      <strong class="text-xl font-bold">No indicator selected</strong>
      <span class="text-contour-weaker">Select an indicator from the dropdown at the top of this page.</span>
    {:else if $IS_EMPTY_SCENARIO}
      <strong class="text-xl font-bold">No scenario selected</strong>
      <span class="text-contour-weaker">Select one or more scenarios from the dropdown at the left hand side of this page.</span>
    {/if}
  {:else if !$IS_COMBINATION_AVAILABLE}
    <strong class="text-xl font-bold">There is no data for your current selection</strong>
    {#if unavailableItems.length}
      <span class="text-contour-weaker">The selected {listFormat.format(unavailableItems)} {unavailableItems.length > 1 ? 'are' : 'is'} not available in this combination.</span>
    {/if}
  {/if}
  <!-- <button
    class="text-theme-base mt-4"
    on:click={() => {
      $CURRENT_INDICATOR_UID = DEFAULT_INDICATOR_UID;
      $CURRENT_GEOGRAPHY_UID = DEFAULT_GEOGRAPHY_UID;
      $CURRENT_SCENARIOS_UID = DEFAULT_SCENARIOS_UID;
    }}>Reset</button
  >-->
</div>
