<script>
  import { CURRENT_GEOGRAPHY_UID, CURRENT_INDICATOR_UID, CURRENT_INDICATOR_OPTION_VALUES, CURRENT_SCENARIOS_UID, CURRENT_INDICATOR_OPTIONS } from '$stores/state.js';
  import { buildURL } from '$utils/url.js';
  import tooltip from '$lib/utils/tooltip';
  import copy from 'copy-to-clipboard';
  import { page } from '$app/stores';

  $: query = buildURL('impacts', { indicator: $CURRENT_INDICATOR_UID, geography: $CURRENT_GEOGRAPHY_UID, scenarios: $CURRENT_SCENARIOS_UID, ...$CURRENT_INDICATOR_OPTION_VALUES });

  function handleClick() {
    const { origin, pathname } = $page.url;
    copy(`${origin}${pathname}${query}`);
  }
</script>

<button
  class="px-3 py-2 hover:bg-white rounded-xl transition-colors"
  on:click={handleClick}
  use:tooltip={{ content: 'Click to copy the link to the clipboard' }}
>
  Share these results<br />
</button>
