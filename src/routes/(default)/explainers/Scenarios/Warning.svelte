<script>
  import { SELECTABLE_SCENARIOS, CURRENT_GEOGRAPHY, CURRENT_INDICATOR } from '$stores/state.js';
  import { groupBy } from 'lodash-es';

  export let selectedScenarios;

  $: availableScenarioUIDs = $SELECTABLE_SCENARIOS.map(({ uid }) => uid);

  $: scenarioGroups = groupBy(selectedScenarios, (scenario) => availableScenarioUIDs.includes(scenario));
  $: amountAvailable = scenarioGroups[true]?.length ?? 0;
  $: amountUnAvailable = scenarioGroups[false]?.length ?? 0;
</script>

<div class="flex flex-col gap-y-5 text-xs">
  Current geography: {JSON.stringify($CURRENT_GEOGRAPHY.label)}<br />
  Current indicator: {JSON.stringify($CURRENT_INDICATOR.label)}<br />
  Available scenarios: {amountAvailable}<br />
  Un-Available scenarios: {amountUnAvailable}
</div>
