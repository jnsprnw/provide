<script>
  import { SELECTABLE_SCENARIOS, CURRENT_GEOGRAPHY, CURRENT_INDICATOR } from '$stores/state.js';
  import { groupBy } from 'lodash-es';

  export let selectedScenarios;

  $: availableScenarioUIDs = $SELECTABLE_SCENARIOS.map(({ uid }) => uid);

  $: scenarioGroups = groupBy(selectedScenarios, (scenario) => availableScenarioUIDs.includes(scenario));
  $: amountAvailable = scenarioGroups[true]?.length ?? 0;
  $: amountUnAvailable = scenarioGroups[false]?.length ?? 0;
</script>

{#if amountUnAvailable}
  <div class="flex flex-col gap-y-5 text-xs">
    <span>
        <strong>{amountUnAvailable}</strong> of your {selectedScenarios.length} selected scenarios {amountUnAvailable == 1 ? 'is' : 'are'} <strong>not</strong> available for your current indicator (<strong
        >{$CURRENT_INDICATOR?.label}</strong
      >) and geography (<strong>{$CURRENT_GEOGRAPHY?.label}</strong>) selection in the explorer.
    </span>
  </div>
{/if}
