<script>
  import { STUDY_LOCATIONS, SCENARIOS } from '$stores/meta.js';
  import { SCENARIOS_IN_AVOIDING_IMPACTS } from '$config';
  import tooltip from '$lib/utils/tooltip';
  import { formatValue } from '$lib/utils/formatting';
  import THEME from '$styles/theme-store.js';
  export let data;

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

  $: list = $STUDY_LOCATIONS.map(({ uid, label }) => {
    const datum = data.data.study_locations[uid];
    const { gmt, budget, lat, lng } = datum;
    console.log({ datum });
    return {
      label,
      uid,
      gmt,
      budget,
      lat,
      lng,
      scenarios: Object.fromEntries(scenarios.map((s) => [s.uid, { ...s, ...datum.scenarios[s.uid] }])),
    };
  });

  $: console.log({ list });
</script>

<table>
  <thead>
    <tr class="text-text-weaker text-sm text-left">
      <th> Study location </th>
      <th> <span class="mx-2">GMT</span> </th>
      <th> <span class="mx-2">CO₂ budget</span> </th>
      <th colspan={SCENARIOS_IN_AVOIDING_IMPACTS.length}> <span class="mx-2">At what year in scenario…</span> </th>
    </tr>
  </thead>
  <tbody>
    {#each list as { label, uid, lat, lng, gmt, budget, scenarios }}
      <tr>
        <td class="py-1">
          {label}
        </td>
        <td>
          <span class="mx-2">{formatValue(gmt, 'degrees-celsius')}</span>
        </td>
        <td>
          <span class="mx-2">{budget ?? '—'}</span>
        </td>
        {#each Object.values(scenarios) as { full, half, isAvoidable, year, label: labelScenario }}
          <td>
            <div
              class="rounded-full bg-current mx-2 px-2"
              style="color: {isAvoidable ? full : half};"
            >
              <span
                class="text-white text-center block"
                use:tooltip={{ content: `Something happens in ${labelScenario} in ${label}` }}>{year ?? 'N/A'}</span
              >
            </div>
          </td>
        {/each}
      </tr>
    {/each}
  </tbody>
</table>
