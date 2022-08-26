<script>
  import { formatValue } from '$lib/utils/formatting';
  import {
    CURRENT_POLICY_UID,
    HOT_EXTREME_UID,
    MEAN_TEMPERATURE_UID,
    PRESENT_DAY_UID,
    SHIFTING_PATHWAYS_UID,
    UNAVOIDABLE_UID,
  } from '$lib/../config.js';
  import ScenarioSingle from '$lib/helper/chart-description/ScenarioSingle.svelte';
  import ChartFacts from '$lib/helper/chart-description/ChartFacts.svelte';
  import ModelList from '$lib/helper/chart-description/ModelList.svelte';

  export let indicator;
  export let threshold;
  export let data;
  export let currentScenarios;
  export let model;
  export let currentGeography;
  export let currentIndicatorOptions;

  // Find scenario data based on currently selected scenarios
  $: scenarios = data.filter((scenario) => currentScenarios[scenario.uid]);

  // Pick scenario data that get special tratment in the text
  $: today = data.find((d) => d.uid === UNAVOIDABLE_UID);
  $: spData = data.find((d) => d.uid === SHIFTING_PATHWAYS_UID);
  $: curpolData = data.find((d) => d.uid === CURRENT_POLICY_UID);

  // Select remaining scenario data show sp and cur pol scenario in list
  $: remainingScenarios = scenarios.filter(
    (scenario) =>
      ![SHIFTING_PATHWAYS_UID, CURRENT_POLICY_UID].includes(scenario.uid)
  );

  // Parts of the text depend on certain parameters/indicators being set
  $: isMeanTemperature = indicator.uid === MEAN_TEMPERATURE_UID;
  $: isPresentDay = currentIndicatorOptions.reference.value === PRESENT_DAY_UID;
  $: isHotExtreme = indicator.uid === HOT_EXTREME_UID;
  $: indicatorAdjective = isHotExtreme ? 'hot' : 'cold';
  $: formattedThreshold = formatValue(threshold, indicator.unit.uid);
</script>

<h2>
  Risk from changes in {indicator.label}
</h2>
<!-- Information about today's risk -->
<p>
  {#if isMeanTemperature}
    Today (2011-2020), the risk of annual mean temperatures in {currentGeography.label}
    exceeding
    {formattedThreshold} from {currentIndicatorOptions.reference.label} levels is
    {today.values[0].formattedValue}.
  {:else if isPresentDay}
    The risk of a {currentIndicatorOptions.frequency.label} year {indicatorAdjective}
    year occurring today (in 2011-2020) in {currentGeography.label} is
    {today.values[0].formattedValue}.
  {:else}
    Today, the risk of what used to be a 1-in-20 year {indicatorAdjective} year in
    1850-1900 in Denmark is {today.values[0].formattedValue}.
  {/if}
</p>
<!-- Information about best/worst case -->
<p>
  The <ScenarioSingle scenario={curpolData} /> scenario – leading to the highest
  global mean temperature increase by 2100 – puts us on a trajectory to see this
  rise to {curpolData.values[0].formattedValue} in 2030, {curpolData.values[1]
    .formattedValue}
  in 2050 and {curpolData.values[2].formattedValue} in 2100. In contrast, the <ScenarioSingle
    scenario={spData}
  /> scenario – considered as the scenario with the highest feasible mitigation levels
  – would limit this risk to {spData.values[0].formattedValue} in 2030, {spData
    .values[1].formattedValue} in 2050 and {spData.values[2].formattedValue} in 2100.
</p>
<!-- Information about remaining selected scenarios -->
{#if remainingScenarios.length}
  <p>
    {#each remainingScenarios as scenario}
      <ScenarioSingle {scenario} /> would lead to risk levels of {scenario
        .values[0].formattedValue} in 2030, {scenario.values[1].formattedValue} in
      2050 and {scenario.values[2].formattedValue} in 2100.
    {/each}
  </p>
{/if}
<ChartFacts>
  <ModelList data={[model]} />
</ChartFacts>
