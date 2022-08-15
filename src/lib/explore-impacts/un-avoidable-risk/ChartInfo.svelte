<script>
  import { formatValue } from '$lib/utils/formatting';
  import { SHIFTING_PATHWAYS_UID, UNAVOIDABLE_UID } from '$lib/../config.js';
  import ScenarioSingle from '$lib/helper/chart-description/ScenarioSingle.svelte';

  export let indicator;
  export let threshold;
  export let data;
  export let currentScenarios;

  $: scenarios = data.filter((scenario) => currentScenarios[scenario.uid]);
  $: today = data.find((d) => d.uid === UNAVOIDABLE_UID);
  $: spData = data.find((d) => d.uid === SHIFTING_PATHWAYS_UID);
  // Only show text relating to sp scenario if it isn't the only one selected
  $: showSpMessage =
    scenarios.length > 1 || !!currentScenarios[SHIFTING_PATHWAYS_UID];
  // Don't show sp scenario in list if we show extra message below
  $: scenarioList = showSpMessage
    ? scenarios.filter((scenario) => scenario.uid !== SHIFTING_PATHWAYS_UID)
    : scenarios;
  $: formattedThreshold = formatValue(threshold, indicator.unit.uid);
</script>

<h2>
  Probability of {indicator.label} exceeding {threshold}&thinsp;{indicator.unit
    .label}
</h2>
<p>
  Today’s risk of {indicator.label} exceeding {formattedThreshold} amounts to {today
    .values[0].formattedValue}.
  {#each scenarioList as scenario}
    A <ScenarioSingle scenario={scenario} /> puts us on a trajectory where it would reach {scenario.values[0]
      .formattedValue} in 2030, {scenario.values[1].formattedValue} in 2050 and {scenario
      .values[2].formattedValue} in 2100.
  {/each}
  {#if showSpMessage}
    But ambitious mitigation according to the
    <ScenarioSingle scenario={spData} />
    scenario could avoid some of it, leaving us with an unavoidable risk of {indicator.label}
    exceeding
    {formattedThreshold} of {spData.values[0].formattedValue} in 2030, {spData
      .values[1].formattedValue} in 2050 and {spData.values[2].formattedValue} in
    2100.
  {/if}
</p>
