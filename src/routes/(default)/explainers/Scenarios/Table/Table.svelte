<script>
  export let scenarios;
  export let selectedScenarios = [];
  export let selectedTimeframe;
  import { extractTimeframe } from '$utils/meta.js';
  import { KEY_CHARACTERISTICS } from '$config';
  import chroma from 'chroma-js';
  import { extent } from 'd3-array';

  $: scenariosListed = scenarios.filter((s) => extractTimeframe(s) === selectedTimeframe);

  function onlyUnique(value, index, array) {
    return array.indexOf(value) === index;
  }

  function checkContrastRatio(color) {
    return chroma.contrast(color, 'black') > 4.5;
  }

  // Get all keys from all current scenarios and create a unique list
  $: tableColumnKeys = scenariosListed
    .map((scenario) => Object.keys(scenario[KEY_CHARACTERISTICS]))
    .flat()
    .filter(onlyUnique);

  // Get the values for each key and create color scales for each.
  $: tableColumns = tableColumnKeys.map((key) => {
    const values = scenariosListed.map((s) => s[KEY_CHARACTERISTICS][key]);
    const domain = extent(values);
    const scale = chroma.scale(['#fafa6e', '#2A4858']).domain(domain).mode('lch'); // TODO: Change colors.
    return [key, scale];
  });
</script>

<div role="treegrid" class="max-w-full overflow-x-scroll" aria-rowcount={scenarios.length}>
  <div role="rowgroup" class="grid max-w-full">
    {#each scenariosListed as scenario, i}
      {@const isSelected = selectedScenarios.includes(scenario.uid)}
      <button role="row" aria-rowindex={i} class="max-w-full text-white focus:bg-surface-weaker focus:text-surface-weaker hover:bg-surface-weaker hover:text-surface-weaker">
        <label for={scenario.uid} class="grid justify-start max-w-full grid-flow-col">
          <div class:!border-red-500={isSelected} class="py-2 border-l-4 border-current px-3 text-left whitespace-nowrap sticky left-0 bg-current flex gap-x-1.5" role="gridcell">
            <input tabindex="-1" id={scenario.uid} type="checkbox" name="scenarios" value={scenario.uid} bind:group={selectedScenarios} />
            <span class="text-sm font-bold min-w-[250px] inline-block text-gray-800 overflow-hidden text-ellipsis">{scenario.label}</span>
          </div>
          {#each tableColumns as [key, scale]}
            {@const value = scenario[KEY_CHARACTERISTICS][key]}
            {@const bg = scale(value)}
            {@const hasContrast = checkContrastRatio(bg)}
            <span class="text-sm block flex items-center justify-end px-6" style="background-color: {bg}; color: {hasContrast ? '#000' : '#fff'};">{value}</span>
          {/each}
        </label>
      </button>
    {/each}
  </div>
</div>
