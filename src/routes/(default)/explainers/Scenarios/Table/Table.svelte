<script>
  import { KEY_CHARACTERISTICS } from '$config';
  import chroma from 'chroma-js';
  import { extent, max } from 'd3-array';
  import { formatValue } from '$lib/utils/formatting';
  import tooltip from '$lib/utils/tooltip';
  import THEME from '$styles/theme-store.js';

  export let scenariosListed = [];
  export let selectedScenarios = [];
  export let selectedTimeframe;

  function hasBlackMoreContrast(color) {
    return chroma.contrast(color, 'black') > chroma.contrast(color, 'white');
  }

  function parseTailwindColor(rgbaStr) {
    const parts = rgbaStr.replace('rgba(', '').replace(')', '').split(',');
    return chroma([parts[0], parts[1], parts[2], parseInt(parts[3]) / 100]).hex();
  }

  // The columns are described in arrays with the following function:
  // Label
  // Access key in the scenario characteristics
  // Formatting function. In some cases it is in degrees or a value in a year. The fallback is a simple return of the value
  // The output of the function is used for the coloring. The fallback is a simple return of the value
  const COLUMNS = {
    2100: [
      ['Peak GMT', 'gmtPeak', ([value, year]) => `${formatValue(value, 'degrees-celsius')} in ${year}`, ([v]) => v + v * Math.random()],
      ['2100 GMT', 'gmt2100', (value) => formatValue(value, 'degrees-celsius'), (v) => v + v * Math.random()],
      ['Cooling rate after peak', 'coolingRateAfterPeak', (value) => `${formatValue(value, 'degrees-celsius')} / decade`, (v) => v + v * Math.random()],
      ['2050 emissions', 'emissions2050', (value) => `${formatValue(value, 'integer')} GtCO₂`, (v) => v + v * Math.random()],
      ['2100 emissions', 'emissions2100', (value) => `${formatValue(value, 'integer')} GtCO₂`, (v) => v + v * Math.random()],
      ['Timing of NZ CO₂', 'timingNZCO2', (value) => value, (v) => v + v * Math.random()],
      ['Timing of NZ GHG', 'timingNZGHG', (value) => value, (v) => v + v * Math.random()],
      ['Likelihood PW < 1.5°C', 'likelihood15', (value) => formatValue(value, 'percent'), (v) => v + v * Math.random()],
      ['Likelihood PW < 2°C', 'likelihood2', (value) => formatValue(value, 'percent'), (v) => v + v * Math.random()],
      ['Likelihood PW < 3°C', 'likelihood3', (value) => formatValue(value, 'percent'), (v) => v + v * Math.random()],
    ],
    2300: [
      ['Peak GMT', 'gmtPeak', ([value, year]) => `${formatValue(value, 'degrees-celsius')} in ${year}`, ([v]) => v + v * Math.random()],
      ['2100 GMT', 'gmt2100', (value) => formatValue(value, 'degrees-celsius'), (v) => v + v * Math.random()],
      ['2300 GMT', 'gmt2300', (value) => formatValue(value, 'degrees-celsius'), (v) => v + v * Math.random()],
      ['Cooling rate after peak', 'coolingAfterPeak', (value) => `${formatValue(value, 'degrees-celsius')} / decade`, (v) => v + v * Math.random()],
      ['Timing of NZ CO2', 'timingNZCO2', (value) => value, (v) => v + v * Math.random()],
      ['Timing of NZ GHG', 'timingNZGHG', (value) => value, (v) => v + v * Math.random()],
    ],
  };

  // Get the values for each key and create color scales for each.
  $: tableColumns = COLUMNS[selectedTimeframe].map(([label, key, formatting = (d) => d, get = (d) => d]) => {
    const values = scenariosListed.map((s) => get(s[KEY_CHARACTERISTICS][key]));
    const domain = extent(values);
    const scale = chroma
      .scale([parseTailwindColor($THEME.color.surface.weakest), parseTailwindColor($THEME.color.theme.base)])
      .domain(domain)
      .mode('lch');
    return {
      key,
      scale,
      label,
      formatting,
      get,
    };
  });

  $: scenarios = scenariosListed.map((scenario, i) => {
    const { uid, label, description } = scenario;
    const isSelected = selectedScenarios.includes(uid);
    const scenarioSelectedIndex = selectedScenarios.indexOf(uid);
    const hasBorderBottom = i !== scenariosListed.length - 1;
    const borderColorLeft = isSelected ? $THEME.color.category.base[scenarioSelectedIndex] : 'transparent';
    const values = tableColumns.map(({ key, scale, formatting, get }) => {
      const label = formatting(scenario[KEY_CHARACTERISTICS][key]);
      const value = get(scenario[KEY_CHARACTERISTICS][key]);
      const bg = value ? scale(value).hex() : 'transparent';
      const useBlackFont = value ? hasBlackMoreContrast(bg) : true;
      return {
        label,
        value,
        bg,
        useBlackFont,
      };
    });
    return {
      i,
      uid,
      label,
      borderColorLeft,
      hasBorderBottom,
      values,
      description,
    };
  });

  $: maxWidth = tableColumns
    .map((_, i) => {
      const length = Math.max(9 * max(scenarios.map(({ values }) => values[i]?.label?.length ?? 0)), 80);
      return `${length}px`;
    })
    .join(' ');

  // Width of the whole table
  let widthTable = 0;
  // With of the columns without the static part
  let widthColumns = 0;
  // Ref to the table
  let table;
  // Scroll position to the left
  let sleft = 0;
</script>

<div class="relative">
  <div
    role="treegrid"
    class="max-w-full overflow-x-scroll table-test"
    bind:clientWidth={widthTable}
    aria-rowcount={scenariosListed.length}
    bind:this={table}
    on:scroll={() => (sleft = table.scrollLeft)}
  >
    <div
      role="rowgroup"
      class="grid max-w-full"
    >
      <div
        role="row"
        class="grid justify-start max-w-full grid-flow-col"
        style="grid-template-columns: 250px {maxWidth};"
      >
        <div
          role="gridcell"
          class="sticky left-0 bg-white px-4 text-xs border-b-contour-weakest border-b flex items-end py-3"
        >
          Scenario
        </div>
        {#each tableColumns as { label }}
          <div
            role="gridcell"
            class="text-xs px-1 border-b-contour-weakest border-b flex items-end justify-center text-center leading-tight py-3"
          >
            {label}
          </div>
        {/each}
      </div>
    </div>
    <div
      role="rowgroup"
      class="grid max-w-full relative"
    >
      {#each scenarios as { i, uid, label, values, borderColorLeft, description }}
        <button
          role="row"
          aria-rowindex={i}
          class:border-b={i !== scenariosListed.length - 1}
          class="max-w-full border-b-contour-weakest text-white focus:bg-surface-weaker focus:text-surface-weaker hover:bg-surface-weaker hover:text-surface-weaker"
          bind:clientWidth={widthColumns}
        >
          <label
            for={uid}
            class="grid justify-start max-w-full grid-flow-col"
            style="grid-template-columns: 250px {maxWidth};"
          >
            <div
              style="border-left-color: {borderColorLeft}"
              class="py-2 border-l-4 border-current px-3 text-left whitespace-nowrap sticky left-0 bg-current flex items-center gap-x-1.5"
              role="gridcell"
            >
              <input
                tabindex="-1"
                id={uid}
                type="checkbox"
                name="scenarios"
                value={uid}
                bind:group={selectedScenarios}
              />
              <span class="text-sm font-bold inline-block text-gray-800 overflow-hidden text-ellipsis">{label}</span>
              <svg
                use:tooltip={{ content: description }}
                xmlns="http://www.w3.org/2000/svg"
                class="text-contour-weaker/60 w-3.5 h-3.5"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path
                  stroke="none"
                  d="M0 0h24v24H0z"
                  fill="none"
                ></path>
                <path
                  d="M12 2c5.523 0 10 4.477 10 10a10 10 0 0 1 -19.995 .324l-.005 -.324l.004 -.28c.148 -5.393 4.566 -9.72 9.996 -9.72zm0 9h-1l-.117 .007a1 1 0 0 0 0 1.986l.117 .007v3l.007 .117a1 1 0 0 0 .876 .876l.117 .007h1l.117 -.007a1 1 0 0 0 .876 -.876l.007 -.117l-.007 -.117a1 1 0 0 0 -.764 -.857l-.112 -.02l-.117 -.006v-3l-.007 -.117a1 1 0 0 0 -.876 -.876l-.117 -.007zm.01 -3l-.127 .007a1 1 0 0 0 0 1.986l.117 .007l.127 -.007a1 1 0 0 0 0 -1.986l-.117 -.007z"
                  stroke-width="0"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
            {#each values as { label, bg, useBlackFont }}
              <span
                role="gridcell"
                class="py-3 flex items-center justify-end px-3 text-xs"
                style="background-color: {bg}; color: {useBlackFont ? '#000' : '#fff'};">{label ?? '—'}</span
              >
            {/each}
          </label>
        </button>
      {/each}
    </div>
  </div>
  <i
    class="block absolute left-[250px] bg-contour-base/10 w-2 z-10 opacity-0 transition-opacity"
    class:opacity-100={sleft > 10}
    style="top: {0}px; height: calc(100%);"
  ></i>
  <i
    class="block absolute right-0 bg-contour-base/10 w-2 z-10 opacity-0 transition-opacity"
    class:opacity-100={sleft < widthColumns - widthTable - 10}
    style="top: {0}px; height: calc(100%);"
  ></i>
</div>

<style>
  .table-test::before {
    width: 10px;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
  }

  .table-test::after {
    width: 10px;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
  }
</style>
