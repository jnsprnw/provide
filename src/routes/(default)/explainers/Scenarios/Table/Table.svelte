<script>
  import { KEY_CHARACTERISTICS } from '$config';
  import chroma from 'chroma-js';
  import { extent, max } from 'd3-array';
  import { formatValue } from '$lib/utils/formatting';
  import Primary from '$lib/helper/icons/Primary.svelte';
  import Info from '$lib/helper/icons/Info.svelte';
  import SideScrollIndicator from '$lib/helper/SideScrollIndicator.svelte';
  import THEME from '$styles/theme-store.js';
  import { orderBy } from 'lodash-es';
  import { writable } from 'svelte/store';

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
      ['Peak GMT', 'gmtPeak', ([value, year]) => `${formatValue(value, 'degrees-celsius')} in ${year}`, ([value]) => value],
      ['2100 GMT', 'gmt2100', (value) => formatValue(value, 'degrees-celsius')],
      ['Cooling rate after peak', 'coolingRateAfterPeak', (value) => `${formatValue(value, 'degrees-celsius')} / decade`],
      ['2050 emissions', 'emissions2050', (value) => `${formatValue(value, 'integer')} GtCO₂`],
      ['2100 emissions', 'emissions2100', (value) => `${formatValue(value, 'integer')} GtCO₂`],
      ['Timing of NZ CO₂', 'timingNZCO2', (value) => value],
      ['Timing of NZ GHG', 'timingNZGHG', (value) => value],
      ['Likelihood PW < 1.5°C', 'likelihood15', (value) => formatValue(value, 'percent')],
      ['Likelihood PW < 2°C', 'likelihood2', (value) => formatValue(value, 'percent')],
      ['Likelihood PW < 3°C', 'likelihood3', (value) => formatValue(value, 'percent')],
    ],
    2300: [
      ['Peak GMT', 'gmtPeak', ([value, year]) => `${formatValue(value, 'degrees-celsius')} in ${year}`, ([value]) => value],
      ['2100 GMT', 'gmt2100', (value) => formatValue(value, 'degrees-celsius')],
      ['2300 GMT', 'gmt2300', (value) => formatValue(value, 'degrees-celsius')],
      ['Cooling after peak', 'coolingAfterPeak', (value) => `${formatValue(value, 'degrees-celsius')}`],
      ['Timing of NZ CO2', 'timingNZCO2', (value) => value],
      ['Timing of NZ GHG', 'timingNZGHG', (value) => value],
    ],
  };

  $: titleWidth =
    {
      2100: 250,
      2300: 350,
    }[selectedTimeframe] ?? 250;

  // Get the values for each key and create color scales for each.
  $: tableColumns = (COLUMNS[selectedTimeframe] ?? []).map(([label, key, formatting = (d) => d, get = (d) => d]) => {
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
    const { uid, label, description, isPrimary } = scenario;
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
    const order = Object.fromEntries(
      tableColumns.map(({ key, get }) => {
        const value = get(scenario[KEY_CHARACTERISTICS][key]);
        return [key, value];
      })
    );
    return {
      i,
      uid,
      label,
      borderColorLeft,
      hasBorderBottom,
      isPrimary,
      values,
      description,
      ...order,
    };
  });

  const sorting = writable('i');
  const sortingDirection = writable(1);

  $: sortedScenarios = orderBy(scenarios, (s) => s[$sorting], $sortingDirection > 0 ? 'asc' : 'desc');

  $: maxWidth = tableColumns
    .map((_, i) => {
      const length = Math.max(9 * max(scenarios.map(({ values }) => values[i]?.label?.length ?? 0)), 80);
      return `${length}px`;
    })
    .join(' ');

  // Width of the columns without the static part
  let widthColumns = 0;
</script>

<SideScrollIndicator
  widthOfContent={widthColumns}
  distanceLeft={titleWidth}
  distanceRight={0}
>
  <div
    role="treegrid"
    aria-rowcount={scenariosListed.length}
  >
    <div
      role="rowgroup"
      class="grid max-w-full"
    >
      <div
        role="row"
        class="grid justify-start max-w-full grid-flow-col"
        style="grid-template-columns: {titleWidth}px {maxWidth};"
      >
        <div
          role="gridcell"
          class="sticky left-0 bg-white px-4 text-xs border-b-contour-weakest border-b flex items-end py-3"
        >
          <button
            on:click={$sorting === 'i' ? sortingDirection.update((v) => v * -1) : sorting.set('i')}
            class:font-bold={$sorting === 'i'}>Scenario</button
          >
        </div>
        {#each tableColumns as { label, key }}
          {@const isActive = $sorting === key}
          <div
            role="gridcell"
            class="text-xs px-1 border-b-contour-weakest border-b flex items-end justify-center text-center leading-tight py-3"
          >
            <button
              on:click={isActive ? sortingDirection.update((v) => v * -1) : sorting.set(key)}
              class:font-bold={isActive}>{label}</button
            >
          </div>
        {/each}
      </div>
    </div>
    <div
      role="rowgroup"
      class="grid max-w-full relative"
    >
      {#each sortedScenarios as { i, uid, label, values, borderColorLeft, description, isPrimary }, index}
        <button
          role="row"
          aria-rowindex={i}
          class:border-b={index !== scenariosListed.length - 1}
          class="max-w-full border-b-contour-weakest text-white focus:bg-surface-weaker focus:text-surface-weaker hover:bg-surface-weaker hover:text-surface-weaker"
          bind:clientWidth={widthColumns}
        >
          <label
            for={uid}
            class="grid justify-start max-w-full grid-flow-col"
            style="grid-template-columns: {titleWidth}px {maxWidth};"
          >
            <div
              style="border-left-color: {borderColorLeft}"
              class="py-2 border-l-4 border-current px-3 text-left sticky left-0 bg-current grid grid-cols-[14px_auto_1fr_1rem] items-center gap-x-1.5 whitespace-nowrap overflow-hidden text-ellipsis"
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
              <span
                class="text-sm font-bold inline-block text-gray-800 overflow-hidden text-ellipsis"
                title={label}>{label}</span
              >
              <Info {description} />

              {#if isPrimary}
                <Primary />
              {/if}
            </div>
            {#each values as { label, bg, useBlackFont }}
              <span
                role="gridcell"
                class="py-3 flex items-center justify-end px-3 text-xs whitespace-nowrap"
                style="background-color: {bg}; color: {useBlackFont ? '#000' : '#fff'};">{label ?? '—'}</span
              >
            {/each}
          </label>
        </button>
      {/each}
    </div>
  </div>
</SideScrollIndicator>
