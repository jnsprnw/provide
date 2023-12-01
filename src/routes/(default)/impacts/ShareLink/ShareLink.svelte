<script>
  import { IS_COMBINATION_AVAILABLE, IS_EMPTY_SELECTION, CURRENT_GEOGRAPHY_UID, CURRENT_INDICATOR_UID, CURRENT_INDICATOR_OPTION_VALUES, CURRENT_SCENARIOS_UID, CURRENT_INDICATOR_OPTIONS } from '$stores/state.js';
  import { buildURL } from '$utils/url.js';
  import tooltip from '$lib/utils/tooltip';
  import copy from 'copy-to-clipboard';
  import { page } from '$app/stores';

  $: isDisabled = $IS_EMPTY_SELECTION || !$IS_COMBINATION_AVAILABLE;

  $: query = !isDisabled && buildURL('impacts', { indicator: $CURRENT_INDICATOR_UID, geography: $CURRENT_GEOGRAPHY_UID, scenarios: $CURRENT_SCENARIOS_UID, ...$CURRENT_INDICATOR_OPTION_VALUES });

  function handleClick() {
    if (query) {
      const { origin, pathname } = $page.url;
      if (origin && pathname) {
        copy(`${origin}${pathname}${query}`);
      } else {
        console.warn(`Could not determine origin or pathname.`);
      }
    } else {
      console.warn(`Could not determine query.`);
    }

  }
</script>

<button
  aria-disabled={isDisabled}
  class="text-sm font-bold px-3 py-2 hover:bg-white rounded-xl transition-colors text-theme-base aria-disabled:hover:bg-transparent aria-disabled:cursor-not-allowed aria-disabled:text-theme-weaker"
  on:click={!isDisabled && handleClick}
  use:tooltip={{ content: isDisabled ? 'Select a geography and indicator first' : 'Click to copy the link to the clipboard' }}
>
  Share these results<br />
</button>
