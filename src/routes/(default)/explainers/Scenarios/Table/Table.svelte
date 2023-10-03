<script>
  export let scenarios;
  export let selectedScenarios = [];
</script>

<div role="treegrid" class="max-w-full overflow-x-scroll" aria-rowcount={scenarios.length}>
  <div role="rowgroup" class="grid max-w-full">
    {#each scenarios as scenario, i}
      {@const isSelected = selectedScenarios.includes(scenario.uid)}
      <button role="row" aria-rowindex={i} class="max-w-full text-white focus:bg-surface-weaker focus:text-surface-weaker hover:bg-surface-weaker hover:text-surface-weaker">
        <label for={scenario.uid} class="grid justify-start max-w-full grid-flow-col">
          <div class:!border-red-500={isSelected} class="py-2 border-l-4 border-current px-3 text-left whitespace-nowrap sticky left-0 bg-current flex gap-x-1.5" role="gridcell">
            <input tabindex="-1" id={scenario.uid} type="checkbox" name="scenarios" value={scenario.uid} bind:group={selectedScenarios} />
            <span class="text-sm font-bold min-w-[250px] inline-block text-gray-800 overflow-hidden text-ellipsis">{scenario.label}</span>
          </div>
          <span class="text-sm text-gray-800 block min-w-[250px]">Test</span>
          <span class="text-sm text-gray-800 block min-w-[250px]">Test</span>
          <span class="text-sm text-gray-800 block min-w-[250px]">Test</span>
          <span class="text-sm text-gray-800 block min-w-[250px]">Test</span>
          <span class="text-sm text-gray-800 block min-w-[250px]">Test</span>
        </label>
      </button>
    {/each}
  </div>
</div>
