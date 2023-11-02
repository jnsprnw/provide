<script>
  export let scenarios;
  export let selectedScenarios = [];
  export let selectedTimeframe;
  import { extractTimeframe } from '$utils/meta.js';
  import { KEY_CHARACTERISTICS } from '$config';
  import chroma from 'chroma-js';
  import { extent } from 'd3-array';
  import { formatValue } from '$lib/utils/formatting';
  import THEME from '$styles/theme-store.js';

  $: scenariosListed = scenarios.filter((s) => extractTimeframe(s) === selectedTimeframe);

  $: console.log(scenariosListed);

  function checkContrastRatio(color) {
    return chroma.contrast(color, 'black') > 4.5;
  }

  const COLUMNS = [
    ['Peak GMT', 'gmtPeak', ([value, year]) => `${value} in ${year}`, ([v]) => v],
    ['2100 GMT', 'gmt2100', (value) => formatValue(value, 'degrees-celsius')],
    ['Cooling rate after peak', 'coolingAfterPeak', (value) => `${formatValue(value, 'degrees-celsius')} / decade`],
    ['2050 emissions', 'emissions2050', (value) => `${formatValue(value, 'integer')} GtCO₂`],
    ['2100 emissions', 'emissions2100', (value) => `${formatValue(value, 'integer')} GtCO₂`],
    ['Timing of NZ CO2', 'timingNZCO2', (value) => value],
    ['Timing of NZ GHG', 'timingNZGHG', (value) => value],
    ['Likelihood PW < 1.5°C', 'likelihood15', (value) => formatValue(value, 'percent')],
    ['Likelihood PW < 2°C', 'likelihood2', (value) => formatValue(value, 'percent')],
    ['Likelihood PW < 3°C', 'likelihood3', (value) => formatValue(value, 'percent')],
  ];

  // Get the values for each key and create color scales for each.
  $: tableColumns = COLUMNS.map(([label, key, formatting = (d) => d, get = (d) => d]) => {
    const values = scenariosListed.map((s) => get(s[KEY_CHARACTERISTICS][key]));
    const domain = extent(values);
    const scale = chroma.scale(['#fafa6e', '#2A4858']).domain(domain).mode('lch'); // TODO: Change colors.
    return {
      key,
      scale,
      label,
      formatting,
      get,
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
      {@const scenarioSelectedIndex = selectedScenarios.indexOf(scenario.uid)}
      <button
        role="row"
        aria-rowindex={i}
        class:border-b={i !== scenariosListed.length - 1}
        class="max-w-full border-b-contour-weakest text-white focus:bg-surface-weaker focus:text-surface-weaker hover:bg-surface-weaker hover:text-surface-weaker"
      >
        <label
          for={scenario.uid}
          class="grid justify-start max-w-full grid-flow-col"
          style="grid-template-columns: 250px repeat({tableColumns.length}, minmax(120px, 1fr));"
        >
          <div
            style="border-left-color: {isSelected ? $THEME.color.category.base[scenarioSelectedIndex] : 'transparent'}"
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
          {#each tableColumns as { key, scale, formatting, get }}
            {@const label = formatting(scenario[KEY_CHARACTERISTICS][key])}
            {@const value = get(scenario[KEY_CHARACTERISTICS][key])}
            {@const bg = value ? scale(value) : 'transparent'}
            {@const hasContrast = value ? checkContrastRatio(bg) : true}
            <span
              role="gridcell"
              class="flex items-center justify-end px-6 text-xs"
              style="background-color: {bg}; color: {hasContrast ? '#000' : '#fff'};">{label ?? '—'}</span
            >
          {/each}
        </label>
      </button>
    {/each}
  </div>
</div>
