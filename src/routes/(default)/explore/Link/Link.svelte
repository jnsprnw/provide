<script>
  import { CURRENT_GEOGRAPHY_UID, CURRENT_INDICATOR_UID, CURRENT_INDICATOR_OPTION_VALUES, CURRENT_SCENARIOS_UID } from '$stores/state.js';
  import { buildURL } from '$utils/url.js';

  $: url = buildURL('impacts', { indicator: $CURRENT_INDICATOR_UID, geography: $CURRENT_GEOGRAPHY_UID, scenarios: $CURRENT_SCENARIOS_UID, ...$CURRENT_INDICATOR_OPTION_VALUES });
</script>

<a href={url}>Share these results</a>
