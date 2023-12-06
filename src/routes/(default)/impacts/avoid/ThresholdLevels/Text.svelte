<script>
  import { CURRENT_INDICATOR, CURRENT_GEOGRAPHY } from '$stores/state.js';
  import { STUDY_LOCATIONS, SCENARIOS } from '$stores/meta.js';
  import { SELECTED_STUDY_LOCATION, LEVEL_OF_IMPACT, SELECTED_LIKELIHOOD_LEVEL_LABEL } from '$stores/avoid.js';
  import THEME from '$styles/theme-store.js';
  import { SCENARIOS_IN_AVOIDING_IMPACTS, UID_STUDY_LOCATION_AVERAGE } from '$config';
  import { formatValue } from '$lib/utils/formatting';
  import Interactive from './Interactive.svelte';
  import Important from './Important.svelte';
  export let data;

  $: certainty_level = $SELECTED_LIKELIHOOD_LEVEL_LABEL;
  $: level_of_impact = $LEVEL_OF_IMPACT;

  $: geography = $CURRENT_GEOGRAPHY.label;
  $: studyLocation = $STUDY_LOCATIONS.find(({ uid }) => uid === $SELECTED_STUDY_LOCATION)?.label;

  $: ({ labelWithinSentence, isCountable, direction, unit } = $CURRENT_INDICATOR);

  // $: studyLocation = $SELECTED_STUDY_LOCATION;
  $: isWholeUrbanArea = $SELECTED_STUDY_LOCATION === UID_STUDY_LOCATION_AVERAGE;

  // $: console.log({ data, unit });

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

  $: isBoth = isAvoidable && isPossible;
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
<div class="flex gap-y-12 flex-col mb-4">
  <section class="flex gap-y-4 flex-col">
    <p class="text-lg leading-relaxed max-w-4xl">
      {#if isAvoidable}
        There is {isPossible ? 'at least' : 'less than'} a <Interactive>{certainty_level}</Interactive> chance
      {:else}
        Due to unavoidable risk even in the scenario with the highest amount of emissions reductions there is a more than <Interactive>{certainty_level}</Interactive> chance
      {/if}
      that
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
      {#if isCountable}
      {direction ? 'over' : 'under'}
      {:else}
      {direction ? 'above' : 'below'}
      {/if}
      <Interactive>{level_of_impact}</Interactive>
      {#if isCountable}
        <Interactive>{labelWithinSentence}</Interactive>{#if !isBoth}.{/if}
      {:else if unit.uid !== 'degrees-celsius'}
        {unit.labelLong}{#if !isBoth}.{/if}
      {:else}
        °C{#if !isBoth}.{/if}
      {/if}
      {#if isBoth}
        unless global warming is kept below <Important>{`${gmt}°C`}</Important>.
      {/if}
    </p>
  </section>
  <section class="flex gap-y-6 flex-col">
    <div>
        {#if possibleScenarios.length}
      <p
        class="text-lg"
      >
        This impact level will be <Important>reached</Important>
      </p>
        <ul class="mt-1">
          {#each possibleScenarios as { label, year, color }, i}
            {@const end = i === possibleScenarios.length - 1 ? '.' : i === possibleScenarios.length - 2 ? ' and' : ','}
            <li class="text-lg flex items-center my-1 ml-2 gap-x-2">
              <i aria-hidden="true">—</i><span>in <strong>{year}</strong> under the <strong style="color: {color};">{label}</strong> scenario{end}</span>
            </li>
          {/each}
        </ul>
      {/if}
    </div>
    <div>
        {#if impossibleScenarios.length}
      <p
        class="text-lg"
      >
        This impact level would be <Important>avoided</Important>
      </p>
        <ul class="mt-1">
          {#each impossibleScenarios as { label, color }, i}
            {@const end = i === impossibleScenarios.length - 1 ? '.' : i === impossibleScenarios.length - 2 ? ' and' : ','}
            <li class="text-lg flex items-center my-1 ml-2 gap-x-2">
              <i aria-hidden="true">—</i><span>under the <strong style="color: {color};">{label}</strong> scenario{end}</span>
            </li>
          {/each}
        </ul>
      {/if}
    </div>
  </section>
  {#if isAvoidable && !isPossible}
    <section>
        <p class="text-lg leading-relaxed max-w-4xl">Try changing the impact level or check out the ”<a href="#unavoidable-risk" class="font-bold text-theme-base hover:underline">Unavoidable impacts graph</a>“ below in order to see which levels of impact are likely to occur.</p>
    </section>
  {/if}
</div>
