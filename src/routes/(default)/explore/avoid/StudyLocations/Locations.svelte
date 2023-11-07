<script>
  import { SCENARIOS } from '$stores/meta.js';
  import { SCENARIOS_IN_AVOIDING_IMPACTS } from '$config';
  import tooltip from '$lib/utils/tooltip';
  import { formatValue } from '$lib/utils/formatting';
  import THEME from '$styles/theme-store.js';
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
    {#each list as { label, uid, lat, lng, gmt, budget, scenarios, isSelected, isAverage, order }}
      <tr
        class:bg-surface-weaker={isSelected}
        class="border-b border-contour-weakest text-sm"
      >
        <td class="py-2 flex items-center gap-x-2 pl-2 min-w-[180px]">
          {#if !isAverage}
            <i
              class="not-italic rounded-full bg bg-contour-base p-1 text-white text-xs font-bold w-4 h-4 overflow-hidden text-center inline-flex items-center content-center justify-center leading-none"
              class:bg-theme-base={isSelected}>{order}</i
            >{/if}
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
                use:tooltip={{ content: `Something happens in ${labelScenario} in ${label} at year ${year}. It is ${isAvoidable ? '' : 'not'} avoidable` }}>{year ?? 'N/A'}</span
              >
            </div>
          </td>
        {/each}
      </tr>
    {/each}
  </tbody>
</table>
