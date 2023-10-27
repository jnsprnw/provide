<script>
  import { CURRENT_INDICATOR } from '$stores/state.js';
  export let data;
  export let geography;
  export let certainty_level;
  export let level_of_impact;

  $: ({ labelWithinSentence, isCountable, direction, unit } = $CURRENT_INDICATOR);

  const scenario = 'curpol';
  const studyLocation = 'urban-cool-spot';
  const isWholeUrbanArea = false;
  const thresholdText = undefined;
  const remainingBudget = undefined;

  $: console.log({ data, unit });

  $: datum = data.data.scenarios.find(({ uid }) => uid === scenario).study_locations.find(({ uid }) => uid === studyLocation);

  $: ({ avoidable, global_mean_temperature, likely, year } = datum);
</script>

<pre class="text-xs font-mono bg-gray-100 rounded p-1">
geography: <strong>{geography}</strong> // Fixed at the moment
certainty_level: <strong>{certainty_level}</strong> // Fixed at the moment
level_of_impact: <strong>{level_of_impact}</strong> // Fixed at the moment
labelWithinSentence: <strong>{labelWithinSentence}</strong>
unit: <strong>{unit}</strong>
isCountable: <strong>{isCountable}</strong>
direction: <strong>{direction}</strong>
scenario: <strong>{scenario}</strong> // Fixed at the moment
studyLocation: <strong>{studyLocation}</strong> // Fixed at the moment
avoidable: <strong>{avoidable}</strong>
global_mean_temperature: <strong>{global_mean_temperature}</strong>
likely: <strong>{likely}</strong>
year: <strong>{year}</strong>
isWholeUrbanArea: <strong>{isWholeUrbanArea}</strong>
thresholdText: <strong>{thresholdText}</strong>
remainingBudget: <strong>{remainingBudget}</strong>
</pre>

<p class="my-4">
  {#if avoidable}
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
  {#if !avoidable && likely}
    . Try changing the impact level or check out the ”Unavoidable impacts graph“ below to see which levels of impact can still be avoided.
  {:else if avoidable && !likely}
    . Try changing the impact level or check out the ”Unavoidable impacts graph“ below in order to see which levels of impact are likely to occur.
  {:else}
    unless global warming is kept below <strong>{thresholdText}°C</strong>. This implies a median remaining global carbon budget of <strong>{remainingBudget}</strong> Gt CO₂ eq. until 2100.
  {/if}
</p>
