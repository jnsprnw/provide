<script>
  import { SCENARIOS } from '$stores/meta.js';
  import { SCENARIOS_IN_AVOIDING_IMPACTS } from '$config';
  import { SELECTED_LIKELIHOOD_LEVEL_LABEL } from '$stores/avoid.js';
  import tooltip from '$lib/utils/tooltip';
  import { formatValue } from '$lib/utils/formatting';
  import THEME from '$styles/theme-store.js';
  import ColorLegend from '$lib/charts/legends/ColorLegend.svelte';

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

  function generateTooltipText(year, scenario, likelihood) {
    if (Number.isInteger(year)) {
      if (year == 2020) {
        return `For this location, there is already at least a ${likelihood} chance of getting the selected level of impact in today’s climate.`;
      } else {
        return `For this location, there is a ${likelihood} chance that the selected level of impact will be reached in ${year} in the scenario ${scenario}.`;
      }
    } else if (year === 'never') {
      return `For this location, the probability that the selected level of impact will be reached stays below ${likelihood} up to 2100 in the scenario ${scenario}.`;
    }
    console.warn(`The value of year is invalid. (Year: ${year}, scenario: ${scenario})`);
  }
</script>

<div>
  <table class="w-full">
    <thead>
      <tr class="text-text-weaker text-sm text-left">
        <th class="font-normal pl-2 py-2">Study location</th>
        <th class="font-normal"> <span class="mx-4">GMT</span> </th>
        <th class="font-normal" colspan={SCENARIOS_IN_AVOIDING_IMPACTS.length}>
          <span class="mx-2">At what year in scenario…</span>
        </th>
      </tr>
    </thead>
    <tbody>
      {#each list as { label, gmt, scenarios, isSelected, isAverage, order }}
        <tr class:bg-surface-weaker={isSelected} class="border-b border-contour-weakest text-sm">
          <td class="py-2 flex items-center gap-x-2 pl-2 min-w-[180px]">
            {#if !isAverage}
              <div class="rounded-full bg bg-contour-base p-1 w-4 h-4 overflow-hidden text-center inline-flex items-center content-center justify-center" class:bg-theme-base={isSelected}>
                <i class="not-italic leading-none pt-0.5 text-white text-[0.6rem] font-light">{order}</i>
              </div>{/if}
            <span class:font-bold={isSelected} class:text-theme-base={isSelected}>{label}</span>
          </td>
          <td>
            <span class="mx-4" class:font-bold={isSelected}>{formatValue(gmt, 'degrees-celsius')}</span>
          </td>
          {#each Object.values(scenarios) as { full, half, year, label: labelScenario }}
            {@const value = year ?? 'never'}
            {@const label = value == '2020' ? 'already' : value}
            <td>
              <div class="rounded-full bg-current mx-2 px-0 lg:px-1 xl:px-2" style="color: {label === 'never' ? half : full};">
                <span class="text-white text-center block text-sm min-w-[45px]" use:tooltip={{ content: generateTooltipText(year, labelScenario, $SELECTED_LIKELIHOOD_LEVEL_LABEL) }}>{label}</span>
              </div>
            </td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>

  <div class="w-full mt-3 flex gap-y-2 flex-col items-end justify-start content-start">
    <ColorLegend items={scenarios} textSize="text-xs" />
    <!--<div class="flex justify-end">
      <div class="rounded-full mx-2 px-2 bg-contour-weakest/50 text-contour-weaker text-xs">never</div>
      <div class="rounded-full mx-2 px-2 bg-contour-weaker/70 text-white text-xs">year</div>
    </div>-->
  </div>
</div>
