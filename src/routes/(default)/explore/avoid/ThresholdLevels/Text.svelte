<script>
  import { CURRENT_INDICATOR } from '$stores/state.js';
  import { SELECTED_STUDY_LOCATION, SELECTED_LIKELIHOOD_LEVEL } from '$stores/avoid.js';
  export let data;
  export let geography;
  $: certainty_level = $SELECTED_LIKELIHOOD_LEVEL;
  export let level_of_impact;

  $: ({ labelWithinSentence, isCountable, direction, unit } = $CURRENT_INDICATOR);

  const scenario = 'curpol';
  $: studyLocation = $SELECTED_STUDY_LOCATION;
  $: isWholeUrbanArea = studyLocation === 'city-average';
  const thresholdText = undefined;
  const remainingBudget = undefined;

  $: console.log({ data, unit });

  $: datum = data.data.study_locations[studyLocation];

  $: ({ budget, gmt, isAvoidable, isPossible } = datum);
</script>

<pre class="text-xs font-mono bg-gray-100 rounded p-1">
geography: <strong>{geography}</strong> // Fixed at the moment
certainty_level: <strong>{certainty_level}</strong>
level_of_impact: <strong>{level_of_impact}</strong> // Fixed at the moment
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

<p class="my-4">
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
  {level_of_impact}
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

<ul class="my-4">
  {#each Object.entries(datum.scenarios) as [scenario, { year }]}
    <li><strong>{scenario}</strong>: <span>{year}</span></li>
  {/each}
</ul>
