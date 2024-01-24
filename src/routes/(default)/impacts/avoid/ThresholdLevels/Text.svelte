<script>
  import { CURRENT_INDICATOR, CURRENT_GEOGRAPHY, CURRENT_INDICATOR_LABEL } from '$stores/state.js';
  import { SCENARIOS } from '$stores/meta.js';
  import { SELECTED_STUDY_LOCATION, LEVEL_OF_IMPACT, SELECTED_LIKELIHOOD_LEVEL_LABEL, IS_STUDY_LOCATION_WHOLE_URBAN_AREA, SELECTED_STUDY_LOCATION_LABEL } from '$stores/avoid.js';
  import THEME from '$styles/theme-store.js';
  import { SCENARIOS_IN_AVOIDING_IMPACTS } from '$config';
  import Interactive from './Interactive.svelte';
  import Important from './Important.svelte';
  import { formatValue, formatUnit } from '$lib/utils/formatting';
  export let data;

  const VALUE_NEVER = 'never';

  $: certainty_level = $SELECTED_LIKELIHOOD_LEVEL_LABEL;
  $: level_of_impact = $LEVEL_OF_IMPACT;

  $: geography = $CURRENT_GEOGRAPHY.label;
  $: studyLocation = $SELECTED_STUDY_LOCATION_LABEL;

  $: ({ isCountable, direction, unit } = $CURRENT_INDICATOR);

  $: ({ labelWithinSentence } = $CURRENT_INDICATOR_LABEL);

  $: isWholeUrbanArea = $IS_STUDY_LOCATION_WHOLE_URBAN_AREA;

  $: datum = data.data.study_locations[$SELECTED_STUDY_LOCATION];

  $: scenarios = SCENARIOS_IN_AVOIDING_IMPACTS.map((uid, i) => {
    const scenario = datum.scenarios[uid];
    const label = $SCENARIOS.find(({ uid: id }) => uid === id)?.label ?? uid;
    if (scenario.year !== VALUE_NEVER && !Number.isInteger(scenario.year)) {
      console.warn(`Invalid year for scenario ${uid}: ${scenario.year}`);
    }
    return {
      uid,
      ...scenario,
      label,
      color: $THEME.color.category.base[i],
    };
  });

  $: unavoidableScenarios = scenarios.filter(({ year }) => Number.isInteger(year));
  $: avoidableScenarios = scenarios.filter(({ year }) => year === VALUE_NEVER);

  $: ({ gmt, isAvoidable, isPossible } = datum);

  $: isBoth = isAvoidable && isPossible;
</script>

<div class="flex gap-y-12 flex-col mb-4">
  <section class="flex gap-y-4 flex-col">
    <p class="text-lg leading-relaxed max-w-4xl">
      {#if isAvoidable}
        {#if isPossible}
          To keep the chance
        {:else}
          There is less than a <Interactive>{certainty_level}</Interactive> chance
        {/if}
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
      {#if isCountable}
        <Interactive>{formatValue(level_of_impact, unit.uid, { matchDecimals: true })}</Interactive>&nbsp;<Interactive>{labelWithinSentence}</Interactive>{#if isBoth},{:else}.{/if}
      {:else}
        <Interactive>{formatValue(level_of_impact, unit.uid, { matchDecimals: true })}{@html formatUnit(unit, { isLabelLong: true })}</Interactive>{#if isBoth},{:else}.{/if}
      {/if}
      {#if isBoth}
        one should pursue global emission pathways in line with limiting average global warming to <Important>{`${gmt}°C`}</Important>.
      {/if}
    </p>
  </section>
  <section class="flex gap-y-6 flex-col">
    <div>
      {#if unavoidableScenarios.length}
        <p class="text-lg">
          This impact level will be <Important>exceeded</Important>
        </p>
        <ul class="mt-1">
          {#each unavoidableScenarios as { label, year, color }, i}
            {@const end = i === unavoidableScenarios.length - 1 ? '.' : i === unavoidableScenarios.length - 2 ? ' and' : ','}
            <li class="text-lg flex items-center my-1 ml-2 gap-x-2">
              <i aria-hidden="true">—</i><span
                >{#if year == 2020}before <strong>2030</strong>{:else}in <strong>{year}</strong>{/if} under the <strong style="color: {color};">{label}</strong> scenario{end}</span
              >
            </li>
          {/each}
        </ul>
      {/if}
    </div>
    <div>
      {#if avoidableScenarios.length}
        <p class="text-lg">
          This impact level would be <Important>avoided</Important>
        </p>
        <ul class="mt-1">
          {#each avoidableScenarios as { label, color }, i}
            {@const end = i === avoidableScenarios.length - 1 ? '.' : i === avoidableScenarios.length - 2 ? ' and' : ','}
            <li class="text-lg flex items-center my-1 ml-2 gap-x-2">
              <i aria-hidden="true">—</i><span>under the <strong style="color: {color};">{label}</strong> scenario{end}</span>
            </li>
          {/each}
        </ul>
      {/if}
    </div>
  </section>
  <!--{#if isAvoidable && !isPossible}
    <section>
      <p class="text-lg leading-relaxed max-w-4xl">
        Try changing the impact level or check out the ”<a href="#unavoidable-risk" class="font-bold text-theme-base hover:underline">Unavoidable impacts graph</a>“ below in order to see which levels
        of impact are likely to occur.
      </p>
    </section>
  {/if}-->
</div>
