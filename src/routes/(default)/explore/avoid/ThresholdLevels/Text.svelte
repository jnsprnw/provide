<script>
  import { CURRENT_INDICATOR, CURRENT_GEOGRAPHY } from '$stores/state.js';
  import { STUDY_LOCATIONS, SCENARIOS } from '$stores/meta.js';
  import { SELECTED_STUDY_LOCATION, SELECTED_LIKELIHOOD_LEVEL, LEVEL_OF_IMPACT } from '$stores/avoid.js';
  import THEME from '$styles/theme-store.js';
  import { SCENARIOS_IN_AVOIDING_IMPACTS } from '$config';
  import { formatValue } from '$lib/utils/formatting';
  import Interactive from './Interactive.svelte';
  import Important from './Important.svelte';
  export let data;
  $: certainty_level = $SELECTED_LIKELIHOOD_LEVEL;
  $: level_of_impact = $LEVEL_OF_IMPACT;

  $: geography = $CURRENT_GEOGRAPHY.label;
  $: studyLocation = $STUDY_LOCATIONS.find(({ uid }) => uid === $SELECTED_STUDY_LOCATION)?.label;

  $: ({ labelWithinSentence, isCountable, direction, unit } = $CURRENT_INDICATOR);

  // $: studyLocation = $SELECTED_STUDY_LOCATION;
  $: isWholeUrbanArea = studyLocation === 'city average';

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
</pre>
-->
<div class="flex gap-y-12 flex-col">
  <section class="flex gap-y-4 flex-col">
    <p class="text-lg leading-relaxed max-w-4xl">
      {#if isAvoidable}
        It is
      {:else}
        Due to current climate change, it is already
      {/if}
      <Important>{isPossible ? '' : 'not'}</Important>
      <Interactive>{certainty_level}</Interactive> that
      {#if isWholeUrbanArea}
        the <Interactive>urban area</Interactive> of <Interactive>{geography}</Interactive>
      {:else}
        the <Interactive>{studyLocation}</Interactive> in <Interactive>{geography}</Interactive>
      {/if}
      will
      {#if isWholeUrbanArea}
        on average
      {/if}
      experience
      {#if !isCountable}
        <Interactive>{labelWithinSentence}</Interactive>
      {/if}
      {direction ? 'over' : 'under'}
      <Interactive>{formatValue(level_of_impact, unit.uid)}</Interactive>
      {#if isCountable}
        <Interactive>{labelWithinSentence}</Interactive>
      {:else if unit.uid !== 'degrees-celsius'}
        {unit.labelLong}
      {/if}
      {#if isAvoidable && isPossible}
        unless global warming is kept below <Important>{gmt}°C</Important>. This implies a median remaining global carbon budget of
        <Important>{budget} Gt CO₂eq.</Important> until 2100.
      {/if}
    </p>

    {#if !isAvoidable && isPossible}
      <p class="text-lg leading-relaxed max-w-4xl">Try changing the impact level or check out the ”Unavoidable impacts graph“ below to see which levels of impact can still be avoided.</p>
    {:else if isAvoidable && !isPossible}
      <p class="text-lg leading-relaxed max-w-4xl">Try changing the impact level or check out the ”Unavoidable impacts graph“ below in order to see which levels of impact are likely to occur.</p>
    {/if}
  </section>
  <section class="flex gap-y-6 flex-col">
    <div>
      <p
        class="text-lg"
        class:text-contour-weaker={!possibleScenarios.length}
      >
        These levels will <Interactive weak={!possibleScenarios.length}>{certainty_level}</Interactive> be reached
      </p>
      {#if possibleScenarios.length}
        <ul class="mt-1">
          {#each possibleScenarios as { label, year, color }, i}
            {@const end = i === possibleScenarios.length - 1 ? '.' : i === possibleScenarios.length - 2 ? ' and' : ','}
            <li class="text-lg flex items-center my-1 ml-2 gap-x-2">
              <i aria-hidden="true">—</i><span>in <strong>{year}</strong> under the <strong style="color: {color};">{label}</strong> scenario{end}</span>
            </li>
          {/each}
        </ul>
      {:else}
        <p class="mt-1 text-lg text-contour-weaker">under no scenario.</p>
      {/if}
    </div>
    <div>
      <p
        class:text-contour-weaker={!impossibleScenarios.length}
        class="text-lg"
      >
        It is <Important weak={!impossibleScenarios.length}>not</Important>
        <Interactive weak={!impossibleScenarios.length}>{certainty_level}</Interactive> that they will be reached
      </p>
      {#if impossibleScenarios.length}
        <ul class="mt-1">
          {#each impossibleScenarios as { label, color }, i}
            {@const end = i === impossibleScenarios.length - 1 ? '.' : i === impossibleScenarios.length - 2 ? ' or' : ','}
            <li class="text-lg flex items-center my-1 ml-2 gap-x-2">
              <i aria-hidden="true">—</i><span>under the <strong style="color: {color};">{label}</strong> scenario{end}</span>
            </li>
          {/each}
        </ul>
      {:else}
        <p class="mt-1 text-lg text-contour-weaker">under any scenario.</p>
      {/if}
    </div>
  </section>
</div>
