<script>
  import { formatValue } from "$lib/utils/formatting";
  import ScenarioList from '$lib/helper/chart-description/scenarioList.svelte';
  import {
    CURRENT_IMPACT_GEO_YEAR_UID,
    CURRENT_GEOGRAPHY,
    CURRENT_INDICATOR,
    CURRENT_INDICATOR_OPTIONS,
    CURRENT_SCENARIOS,
    CURRENT_INDICATOR_UNIT_UID,
  } from '$lib/../stores/store';

  export let currentThreshold;
</script>

<h2>Probability of {$CURRENT_INDICATOR.label} exceeding {formatValue(currentThreshold, $CURRENT_INDICATOR_UNIT_UID)}</h2>

<p>The chart displays <ScenarioList />.</p>
