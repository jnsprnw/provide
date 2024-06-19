<script>
  import { KEY_CHARACTERISTICS, MAX_NUMBER_SELECTABLE_SCENARIOS, LABEL_SCENARIOS_LIST } from '$config';
  import SubsectionHeadline from '$lib/helper/ContentPages/SubsectionHeadline.svelte';
  import tooltip from '$lib/utils/tooltip';
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

  // The columns are described in arrays with the following function:
  // Label
  // Tooltip
  // Access key in the scenario characteristics
  // Formatting function. In some cases it is in degrees or a value in a year. The fallback is a simple return of the value
  // The output of the function is used for the coloring. The fallback is a simple return of the value
  const COLUMNS = {
    2100: [
      [
        'Peak <abbr title="global mean temperature">GMT</abbr>',
        'The highest global mean temperature level reached before 2100, and the year in which it is reached.',
        'gmtPeak',
        ([value, year]) => `<strong>${value}</strong>&nbsp;°C in&nbsp;<strong>${year}</strong>`,
        ([value]) => value,
      ],
      ['2100 <abbr title="global mean temperature">GMT</abbr>', 'Global mean temperature in the year 2100.', 'gmt2100', (value) => `<strong>${value}</strong>&nbsp;°C`],
      [
        'Cooling rate<br /> after peak',
        'Rate of decrease in global mean temperature after it reaches its highest point of the century, in °C per decade.',
        'coolingRateAfterPeak',
        (value) => `<strong>${value}</strong>&nbsp;°C / decade`,
      ],
      [
        '2050 emissions',
        'Amount of greenhouse gas emissions emitted in the year 2050, expressed in gigatonnes of CO2 equivalent.',
        'emissions2050',
        (value) => `<strong>${value}</strong>&nbsp;GtCO₂eq/yr`,
      ],
      [
        '2100 emissions',
        'Amount of greenhouse gas emissions emitted in the year 2100, expressed in gigatonnes of CO2 equivalent.',
        'emissions2100',
        (value) => `<strong>${value}</strong>&nbsp;GtCO₂eq/yr`,
      ],
      [
        'Timing<br /> of <abbr title="net zero">NZ</abbr> CO₂',
        'Year at which CO2 emissions have been reduced to a level where remaining emissions are offset by the removal of CO2 out of the atmosphere elsewhere.',
        'timingNZCO2',
        (value) => `<strong>${value}</strong>`,
      ],
      [
        'Timing<br /> of <abbr title="net zero">NZ</abbr> <abbr title="greenhouse gas emissions">GHG</abbr>',
        'Year at which greenhouse gas emissions (expressed in CO2 equivalent) have been reduced to a level where the remaining emissions are offset by the removal of emissions out of the atmosphere elsewhere.',
        'timingNZGHG',
        (value) => `<strong>${value}</strong>`,
      ],
      [
        'Likelihood<br /> <abbr title="peak warming">PW</abbr> < 1.5°C',
        'The likelihood of peak global mean temperature in the 21st century staying below 1.5°C.',
        'likelihood15',
        (value) => `<strong>${formatValue(value, 'percent')}</strong>`,
      ],
      [
        'Likelihood<br /> <abbr title="peak warming">PW</abbr> < 2°C',
        'The likelihood of peak global mean temperature in the 21st century staying below 2°C.',
        'likelihood2',
        (value) => `<strong>${formatValue(value, 'percent')}</strong>`,
      ],
      [
        'Likelihood<br /> <abbr title="peak warming">PW</abbr> < 3°C',
        'The likelihood of peak global mean temperature in the 21st century staying below 3°C.',
        'likelihood3',
        (value) => `<strong>${formatValue(value, 'percent')}</strong>`,
      ],
    ],
    2300: [
      [
        'Peak <abbr title="global mean temperature">GMT</abbr>',
        'The highest global mean temperature level reached before 2100, and the year in which it is reached.',
        'gmtPeak',
        ([value, year]) => `<strong>${value}</strong>&nbsp;°C in&nbsp;<strong>${year}</strong>`,
        ([value]) => value,
      ],
      ['2100 <abbr title="global mean temperature">GMT</abbr>', 'Global mean temperature in the year 2100.', 'gmt2100', (value) => `<strong>${value}</strong>&nbsp;°C`],
      ['2300 <abbr title="global mean temperature">GMT</abbr>', 'Global mean temperature in the year 2300.', 'gmt2300', (value) => `<strong>${value}</strong>&nbsp;°C`],
      [
        'Cooling<br /> after peak',
        'Amount of decrease in global mean temperature up to 2300 after it reaches its highest point, in °C per decade.',
        'coolingAfterPeak',
        (value) => `<strong>${value}</strong>&nbsp;°C`,
      ],
      [
        'Timing<br /> of NZ CO2',
        'Year at which CO2 emissions have been reduced to a level where remaining emissions are offset by the removal of CO2 out of the atmosphere elsewhere.',
        'timingNZCO2',
        (value) => `<strong>${value}</strong>`,
      ],
      [
        'Timing<br /> of NZ GHG',
        'Year at which greenhouse gas emissions (expressed in CO2 equivalent) have been reduced to a level where the remaining emissions are offset by the removal of emissions out of the atmosphere elsewhere.',
        'timingNZGHG',
        (value) => `<strong>${value}</strong>`,
      ],
    ],
  };

  $: titleWidth =
    {
      2100: 250,
      2300: 350,
    }[selectedTimeframe] ?? 250;

  // Get the values for each key and create color scales for each.
  $: tableColumns = (COLUMNS[selectedTimeframe] ?? []).map(([label, tooltip, key, formatting = (d) => d, get = (d) => d]) => {
    const values = scenariosListed.map((s) => get(s[KEY_CHARACTERISTICS][key]));
    const domain = extent(values);
    const scale = chroma.scale(['#fffbeb', '#fcd34d']).domain(domain).mode('lch');
    return {
      key,
      tooltip,
      scale,
      label,
      formatting,
      get,
    };
  });

  const SCENARIO_NUMBER = 'scenarioNumber';

  $: scenarios = scenariosListed.map((scenario, i) => {
    const { uid, label, description, isPrimary } = scenario;
    const isSelected = selectedScenarios.includes(uid);
    const scenarioSelectedIndex = selectedScenarios.indexOf(uid);
    const hasBorderBottom = i !== scenariosListed.length - 1;
    const borderColorLeft = isSelected ? $THEME.color.category.base[scenarioSelectedIndex] : 'transparent';
    const values = tableColumns.map(({ key, scale, formatting, get }) => {
      const label = formatting(scenario[KEY_CHARACTERISTICS][key]);
      const value = get(scenario[KEY_CHARACTERISTICS][key]);
      const bg = value !== null ? scale(value).hex() : 'transparent';
      const useBlackFont = value !== null ? hasBlackMoreContrast(bg) : true;
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
      disabled: selectedScenarios.length >= MAX_NUMBER_SELECTABLE_SCENARIOS && !isSelected,
      [SCENARIO_NUMBER]: i,
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

  const sorting = writable(SCENARIO_NUMBER);
  const sortingDirection = writable(1);

  $: sortedScenarios = orderBy(scenarios, [(s) => s[$sorting], (s) => s[SCENARIO_NUMBER]], $sortingDirection > 0 ? 'asc' : 'desc');

  $: maxWidth = tableColumns
    .map((_, i) => {
      const length = Math.max(9 * max(scenarios.map(({ values }) => values[i]?.label?.length ?? 0)), 80);
      return `auto`;
    })
    .join(' ');

  // Width of the columns without the static part
  let widthColumns = 0;

  $: subGridColumns = `grid-column: span ${tableColumns.length + 1};`;
</script>

<div>
  <SubsectionHeadline title={LABEL_SCENARIOS_LIST} subtitle="Compare and select up to three scenarios to display them in the scenario explorer." />

  <SideScrollIndicator widthOfContent={widthColumns} distanceLeft={titleWidth} distanceRight={0} showScrollbars={true}>
    <div role="treegrid" class="grid" aria-rowcount={scenariosListed.length} style="grid-template-columns: {titleWidth}px {maxWidth};">
      <div role="rowgroup" class="grid max-w-full justify-start grid-cols-subgrid" style={subGridColumns}>
        <div role="row" class="grid grid-cols-subgrid" style={subGridColumns}>
          <div role="gridcell" class="sticky left-0 bg-white px-4 text-xs border-b-contour-weakest border-b flex items-end py-3">
            <button on:click={$sorting === SCENARIO_NUMBER ? sortingDirection.update((v) => v * -1) : sorting.set(SCENARIO_NUMBER)} class:font-bold={$sorting === SCENARIO_NUMBER}>Scenario</button>
          </div>
          {#each tableColumns as { label, key, tooltip }}
            {@const isActive = $sorting === key}
            <button
              role="gridcell"
              on:click={isActive ? sortingDirection.update((v) => v * -1) : sorting.set(key)}
              class:text-theme-base={isActive}
              class="hover:text-theme-base text-xs pl-1 pr-2 border-b-contour-weakest border-b grid grid-cols-[16px_1fr_16px] gap-x-2 items-end justify-center text-center py-3"
            >
              <i aria-hidden role="presentation" class="not-italic"
                >{#if isActive}{#if $sortingDirection > 0}↓{:else}↑{/if}{/if}</i
              >
              <span class="whitespace-nowrap font-bold leading-tight text-current">{@html label}</span>
              <Info description={tooltip} />
            </button>
          {/each}
        </div>
      </div>
      <div role="rowgroup" class="grid max-w-full relative grid-cols-subgrid" style={subGridColumns}>
        {#each sortedScenarios as { i, uid, label, values, borderColorLeft, description, isPrimary, disabled }, index}
          <button
            {disabled}
            aria-disabled={disabled}
            role="row"
            aria-rowindex={i}
            class="max-w-full grid grid-cols-subgrid text-white focus:bg-surface-weaker focus:text-surface-weaker hover:bg-surface-weaker hover:text-surface-weaker"
            style={subGridColumns}
            bind:clientWidth={widthColumns}
          >
            <label for={uid} class="grid justify-start max-w-full grid-flow-col grid-cols-subgrid" style={subGridColumns}>
              <div
                aria-disabled={disabled}
                style="border-left-color: {borderColorLeft}"
                class:border-b={index !== scenariosListed.length - 1}
                class="border-b-contour-weakest aria-disabled:cursor-not-allowed py-2 border-l-4 border-current px-3 text-left sticky left-0 bg-current grid grid-cols-[14px_1fr_14px_14px] items-center gap-x-1.5 whitespace-nowrap overflow-hidden text-ellipsis"
                role="gridcell"
              >
                <input {disabled} aria-disabled={disabled} tabindex="-1" id={uid} type="checkbox" name="scenarios" value={uid} bind:group={selectedScenarios} />
                <span
                  class="text-sm font-bold inline-block overflow-hidden text-ellipsis transition-colors"
                  class:text-text-base={!disabled}
                  class:text-contour-weakest={disabled}
                  use:tooltip={{ content: disabled ? `You can not select more than ${MAX_NUMBER_SELECTABLE_SCENARIOS} scenarios.` : undefined }}>{label}</span
                >
                <div class="flex items-center justify-center">
                  {#if isPrimary}
                    <Primary />
                  {/if}
                </div>
                <Info {description} />
              </div>
              {#each values as { label, bg, useBlackFont, value }}
                <span
                  role="gridcell"
                  class:border-b={index !== scenariosListed.length - 1}
                  class="py-3 flex items-center justify-end px-3 text-xs whitespace-nowrap border-b-white"
                  data-value={value}
                  style="background-color: {bg}; color: {useBlackFont ? '#000' : '#fff'};">{@html value === null ? '—' : label}</span
                >
              {/each}
            </label>
          </button>
        {/each}
      </div>
    </div>
  </SideScrollIndicator>
</div>
