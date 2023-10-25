<script>
  export let scenarios;
  export let selectedScenarios = [];
  export let selectedTimeframe;
  import { extractTimeframe } from '$utils/meta.js';
  import { KEY_CHARACTERISTICS } from '$config';
  import chroma from 'chroma-js';
  import { extent } from 'd3-array';

  $: scenariosListed = scenarios.filter((s) => extractTimeframe(s) === selectedTimeframe);

  $: console.log(scenariosListed);

  function onlyUnique(value, index, array) {
    return array.indexOf(value) === index;
  }

  function checkContrastRatio(color) {
    return chroma.contrast(color, 'black') > 4.5;
  }

  const COLUMNS = [
    ['Peak GMT', 'gmtPeak'],
    ['2100 GMT', 'gmt2100'],
    ['Cooling rate after peak', 'coolingAfterPeak'],
    ['2050 emissions', 'emissions2050'],
    ['2100 emissions', 'emissions2100'],
    ['Timing of NZ CO2', 'timingNZCO2'],
    ['Timing of NZ GHG', 'timingNZGHG'],
    ['Likelihood PW < 1.5°C', 'likelihood15'],
    ['Likelihood PW < 2°C', 'likelihood2'],
    ['Likelihood PW < 3°C', 'likelihood3'],
  ];

  // Get the values for each key and create color scales for each.
  $: tableColumns = COLUMNS.map(([label, key]) => {
    const values = scenariosListed.map((s) => s[KEY_CHARACTERISTICS][key]);
    const domain = extent(values);
    const scale = chroma.scale(['#fafa6e', '#2A4858']).domain(domain).mode('lch'); // TODO: Change colors.
    return {
      key,
      scale,
      label,
    };
  });
</script>

<div
  role="treegrid"
  class="max-w-full overflow-x-scroll"
  aria-rowcount={scenarios.length}
>
  <div
    role="rowgroup"
    class="grid max-w-full"
  >
    <div
      role="row"
      class="grid justify-start max-w-full grid-flow-col"
      style="grid-template-columns: 250px repeat({tableColumns.length}, minmax(120px, 1fr));"
    >
      <div
        role="gridcell"
        class="sticky left-0 bg-white px-4 text-xs"
      >
        Scenario
      </div>
      {#each tableColumns as { label }}
        <div
          role="gridcell"
          class="text-xs min-w-[120px] text-center px-1"
        >
          {label}
        </div>
      {/each}
    </div>
  </div>
  <div
    role="rowgroup"
    class="grid max-w-full"
  >
    {#each scenariosListed as scenario, i}
      {@const isSelected = selectedScenarios.includes(scenario.uid)}
      <button
        role="row"
        aria-rowindex={i}
        class="max-w-full text-white focus:bg-surface-weaker focus:text-surface-weaker hover:bg-surface-weaker hover:text-surface-weaker"
      >
        <label
          for={scenario.uid}
          class="grid justify-start max-w-full grid-flow-col"
          style="grid-template-columns: 250px repeat({tableColumns.length}, minmax(120px, 1fr));"
        >
          <div
            class:!border-red-500={isSelected}
            class="py-2 border-l-4 border-current px-3 text-left whitespace-nowrap sticky left-0 bg-current flex gap-x-1.5"
            role="gridcell"
          >
            <input
              tabindex="-1"
              id={scenario.uid}
              type="checkbox"
              name="scenarios"
              value={scenario.uid}
              bind:group={selectedScenarios}
            />
            <span class="text-sm font-bold inline-block text-gray-800 overflow-hidden text-ellipsis">{scenario.label}</span>
          </div>
          {#each tableColumns as { key, scale }}
            {@const value = scenario[KEY_CHARACTERISTICS][key]}
            {@const bg = scale(value)}
            {@const hasContrast = checkContrastRatio(bg)}
            <span
              role="gridcell"
              class="text-sm block flex items-center justify-end px-6"
              style="background-color: {bg}; color: {hasContrast ? '#000' : '#fff'};">{value ?? '—'}</span
            >
          {/each}
        </label>
      </button>
    {/each}
  </div>
</div>
