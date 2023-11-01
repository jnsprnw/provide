<script>
  import { CURRENT_INDICATOR, CURRENT_GEOGRAPHY } from '$stores/state.js';
  import { STUDY_LOCATIONS, SCENARIOS } from '$stores/meta.js';
  import { SELECTED_STUDY_LOCATION, SELECTED_LIKELIHOOD_LEVEL, LEVEL_OF_IMPACT } from '$stores/avoid.js';
  import THEME from '$styles/theme-store.js';
  import { SCENARIOS_IN_AVOIDING_IMPACTS } from '$config';
  export let data;
  $: certainty_level = $SELECTED_LIKELIHOOD_LEVEL;
  $: level_of_impact = $LEVEL_OF_IMPACT;

  $: geography = $CURRENT_GEOGRAPHY.label;
  $: studyLocation = $STUDY_LOCATIONS.find(({ uid }) => uid === $SELECTED_STUDY_LOCATION)?.label;

  $: ({ labelWithinSentence, isCountable, direction, unit } = $CURRENT_INDICATOR);

  const scenario = 'curpol';
  // $: studyLocation = $SELECTED_STUDY_LOCATION;
  $: isWholeUrbanArea = studyLocation === 'city-average';
  const thresholdText = undefined;
  const remainingBudget = undefined;

  $: console.log({ data, unit });

  $: datum = data.data.study_locations[$SELECTED_STUDY_LOCATION];

  $: scenarios = SCENARIOS_IN_AVOIDING_IMPACTS.map((uid, i) => {
    const scenario = datum.scenarios[uid];
    const label = $SCENARIOS.find(({ uid: id }) => uid === id)?.label ?? uid;
    return {
      uid,
      ...scenario,
      label,
      color: $THEME.color.category.base[i],
    };
  });

  $: possibleScenarios = scenarios.filter(({ year }) => year !== null);
  $: impossibleScenarios = scenarios.filter(({ year }) => year === null);

  $: ({ budget, gmt, isAvoidable, isPossible } = datum);
</script>

<!--
<pre class="text-xs font-mono bg-gray-100 rounded p-1">
geography: <strong>{geography}</strong> // Fixed at the moment
certainty_level: <strong>{certainty_level}</strong>
level_of_impact: <strong>{level_of_impact}</strong>
labelWithinSentence: <strong>{labelWithinSentence}</strong>
unit: <strong>{unit}</strong>
isCountable: <strong>{isCountable}</strong>
direction: <strong>{direction}</strong>
studyLocation: <strong>{studyLocation}</strong>
isAvoidable: <strong>{isAvoidable}</strong>
gmt: <strong>{gmt}</strong>
isPossible: <strong>{isPossible}</strong>
budget: <strong>{budget}</strong>
isWholeUrbanArea: <strong>{isWholeUrbanArea}</strong>
thresholdText: <strong>{thresholdText}</strong>
remainingBudget: <strong>{remainingBudget}</strong>
</pre>
-->

<p class="my-4 text-lg">
  {#if isAvoidable}
    It is
  {:else}
    Due to current climate change, it is already
  {/if}
  <strong>{certainty_level}</strong> that
  {#if isWholeUrbanArea}
    the <strong>urban area</strong> of <strong>{geography}</strong>
  {:else}
    the <strong>{studyLocation}</strong> in <strong>{geography}</strong>
  {/if}
  will
  {#if isWholeUrbanArea}
    on average
  {/if}
  experience
  {#if !isCountable}
    {labelWithinSentence}
  {/if}
  {#if direction}
    over
  {:else}
    under
  {/if}
  <strong>{level_of_impact}</strong>
  {#if isCountable}
    {labelWithinSentence}
  {:else}
    {unit.labelLong}
  {/if}
  {#if !isAvoidable && isPossible}
    . Try changing the impact level or check out the ”Unavoidable impacts graph“ below to see which levels of impact can still be avoided.
  {:else if isAvoidable && !isPossible}
    . Try changing the impact level or check out the ”Unavoidable impacts graph“ below in order to see which levels of impact are likely to occur.
  {:else}
    unless global warming is kept below <strong>{thresholdText}°C</strong>. This implies a median remaining global carbon budget of <strong>{remainingBudget}</strong> Gt CO₂ eq. until 2100.
  {/if}
</p>

<p class="text-base">These levels will be reached</p>
{#if possibleScenarios.length}
  <ul class="my-3">
    {#each possibleScenarios as { label, year, color }}
      <li class="text-lg">in <strong>{year}</strong> under the <strong style="color: {color};">{label}</strong> scenario</li>
    {/each}
  </ul>
{:else}
  <p class="my-3 text-lg">under no scenario</p>
{/if}

<p class="text-base">but it is not likely that they will be reached</p>
{#if impossibleScenarios.length}
  <ul class="my-3">
    {#each impossibleScenarios as { label, color }}
      <li class="text-lg">under the <strong style="color: {color};">{label}</strong></li>
    {/each}
  </ul>
{:else}
  <p class="my-3 text-lg">under any scenario</p>
{/if}
