<script>
  import {
    DEFAULT_GEOGRAPHY_UID,
    DEFAULT_INDICATOR_UID,
    DEFAULT_SCENARIOS_UID,
  } from '$src/config';
  import {
    CURRENT_GEOGRAPHY_UID,
    CURRENT_INDICATOR_UID,
    CURRENT_SCENARIOS_UID,
    IS_COMBINATION_AVAILABLE_GEOGRAPHY,
    IS_COMBINATION_AVAILABLE_SCENARIO,
    CURRENT_SCENARIOS
  } from '$stores/state';
  $: unavailableItems = [
      [$IS_COMBINATION_AVAILABLE_GEOGRAPHY, 'geography'],
      [$IS_COMBINATION_AVAILABLE_SCENARIO, $CURRENT_SCENARIOS.length > 1 ? 'scenario(s)' : 'scenario']
    ]
    .filter(([isAvailable]) => !isAvailable)
    .map(([isAvailable, label]) => label);
  const listFormat = new Intl.ListFormat('en', { style: 'long', type: 'conjunction' });
</script>

<div class="flex flex-col gap-y-2 items-center justify-center py-24 min-h-[70vh]" role="alert">
  <strong class="text-xl font-bold">
    There is no data for your current selection.
  </strong>
  {#if unavailableItems.length}
  <span class="text-contour-weaker">The selected {listFormat.format(unavailableItems)} {unavailableItems.length > 1 ? 'are' : 'is'} not available in this combination.</span>
  {/if}
  <button
    class="text-theme-base mt-4"
    on:click={() => {
      $CURRENT_INDICATOR_UID = DEFAULT_INDICATOR_UID;
      $CURRENT_GEOGRAPHY_UID = DEFAULT_GEOGRAPHY_UID;
      $CURRENT_SCENARIOS_UID = DEFAULT_SCENARIOS_UID;
    }}>Reset</button
  >
</div>
