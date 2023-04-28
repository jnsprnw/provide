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
  } from '$stores/state';
</script>

<div class="flex flex-col items-center justify-center py-24 min-h-[70vh]">
  <div class="text-xl font-bold mb-4">
    There is no data for your current selection.
  </div>
  <button
    class="text-theme-base"
    on:click={() => {
      $CURRENT_INDICATOR_UID = DEFAULT_INDICATOR_UID;
      $CURRENT_GEOGRAPHY_UID = DEFAULT_GEOGRAPHY_UID;
      $CURRENT_SCENARIOS_UID = DEFAULT_SCENARIOS_UID;
    }}>Reset</button
  >
</div>
