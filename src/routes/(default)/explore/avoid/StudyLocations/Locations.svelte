<script>
  import { SCENARIOS } from '$stores/meta.js';
  import { SCENARIOS_IN_AVOIDING_IMPACTS } from '$config';
  import { SELECTED_LIKELIHOOD_LEVEL_LABEL } from '$stores/avoid.js';
  import tooltip from '$lib/utils/tooltip';
  import { formatValue } from '$lib/utils/formatting';
  import THEME from '$styles/theme-store.js';
  import { isNull } from 'lodash-es';

  export let studyLocations;

  $: scenarios = SCENARIOS_IN_AVOIDING_IMPACTS.map((uid, i) => {
    const label = $SCENARIOS.find(({ uid: id }) => uid === id)?.label ?? uid;
    return {
      uid,
      label,
      color: $THEME.color.category.base[i],
      full: $THEME.color.category.base[i],
      half: $THEME.color.category.weakest[i],
    };
  });

  $: list = studyLocations.map((location) => {
    return {
      ...location,
      scenarios: Object.fromEntries(scenarios.map((s) => [s.uid, { ...s, ...location.scenarios[s.uid] }])),
    };
  });

  function generateTooltipText(isAvoidable, year, scenario, likelihood) {
    const isPossible = !isNull(year);
    if (isPossible && isAvoidable) {
      return `For this location, it is ${likelihood} that the selected level of impact would be reached in ${year} under the ${scenario}.`;
    }
    if (!isPossible && isAvoidable) {
      return `For this location, it is not ${likelihood} that the selected level of impact would be reached under ${scenario}.`;
    }
    if (!isPossible && !isAvoidable) {
      return `For this location, the selected level of impact is already ${likelihood} in current climate.`;
    }
    console.warn(`This combination of isPossible and isAvoidable should not occur. (${isPossible}, ${isAvoidable}, ${year}, ${scenario})`);
  }
</script>

<table>
  <thead>
    <tr class="text-text-weaker text-sm text-left">
      <th class="font-normal pl-2 py-2"> Study location </th>
      <th class="font-normal"> <span class="mx-4">GMT</span> </th>
      <th class="font-normal"> <span class="mx-4">CO₂ budget</span> </th>
      <th
        class="font-normal"
        colspan={SCENARIOS_IN_AVOIDING_IMPACTS.length}
      >
        <span class="mx-2">At what year in scenario…</span>
      </th>
    </tr>
  </thead>
  <tbody>
    {#each list as { label, gmt, budget, scenarios, isSelected, isAverage, order }}
      <tr
        class:bg-surface-weaker={isSelected}
        class="border-b border-contour-weakest text-sm"
      >
        <td class="py-2 flex items-center gap-x-2 pl-2 min-w-[180px]">
          {#if !isAverage}
            <div
              class="rounded-full bg bg-contour-base p-1 w-4 h-4 overflow-hidden text-center inline-flex items-center content-center justify-center"
              class:bg-theme-base={isSelected}
            >
              <i class="not-italic leading-none pt-0.5 text-white text-xs font-normal">{order}</i>
            </div>{/if}
          <span
            class:font-bold={isSelected}
            class:text-theme-base={isSelected}>{label}</span
          >
        </td>
        <td>
          <span
            class="mx-4"
            class:font-bold={isSelected}>{formatValue(gmt, 'degrees-celsius')}</span
          >
        </td>
        <td>
          <span
            class="mx-4"
            class:font-bold={isSelected}>{budget ?? '—'}</span
          >
        </td>
        {#each Object.values(scenarios) as { full, half, isAvoidable, year, label: labelScenario }}
          <td>
            <div
              class="rounded-full bg-current mx-2 px-2"
              style="color: {isAvoidable ? full : half};"
            >
              <span
                class="text-white text-center block text-sm"
                use:tooltip={{ content: generateTooltipText(isAvoidable, year, labelScenario, $SELECTED_LIKELIHOOD_LEVEL_LABEL) }}>{year ?? 'N/A'}</span
              >
            </div>
          </td>
        {/each}
      </tr>
    {/each}
  </tbody>
</table>
