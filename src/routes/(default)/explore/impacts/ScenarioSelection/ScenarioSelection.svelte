<script>
  import { CURRENT_SCENARIOS, CURRENT_SCENARIOS_UID } from '$stores/state.js';
  import { SCENARIOS } from '$stores/meta.js';
  import PopoverSelect from '$lib/controls/PopoverSelect/PopoverSelect.svelte';

  let hoveredScenario;
  $: renderedScenario = hoveredScenario || $CURRENT_SCENARIOS[0];

  $: buttonLabel =
    $CURRENT_SCENARIOS.length > 1
      ? `${$CURRENT_SCENARIOS.length} scenarios selected`
      : $CURRENT_SCENARIOS[0].label;

  $: scenarios = $SCENARIOS.map((scenario) => {
    const current = $CURRENT_SCENARIOS.find((s) => s.uid === scenario.uid);
    return { ...scenario, ...(current || {}), isSelected: !!current };
  });
</script>

<PopoverSelect
  label="Scenarios"
  {buttonLabel}
  buttonClass="bg-transparent border border-foreground-weakest"
  size="md"
>
  <div class="flex">
    <fieldset class="flex flex-col py-2">
      {#each scenarios as scenario}
        <label
          on:focus={() => (hoveredScenario = scenario)}
          on:mouseover={() => (hoveredScenario = scenario)}
          on:mouseleave={() => (hoveredScenario = null)}
          class="px-4 py-2 border-l-3"
          class:bg-background-weaker={renderedScenario.uid === scenario.uid}
          class:border-theme-base={scenario.isSelected}
          class:border-transparent={!scenario.isSelected}
        >
          <input
            type="checkbox"
            bind:group={$CURRENT_SCENARIOS_UID}
            name="scenarios"
            value={scenario.uid}
            on:focus={() => (hoveredScenario = scenario)}
          />
          {scenario.label}
        </label>
      {/each}
    </fieldset>

    <div class="max-w-lg bg-background-weaker p-6">
      {#if renderedScenario}
        <div>
          <h3 class="text-lg font-bold">{renderedScenario.label}</h3>
          <p class="text-foreground-weak">
            {renderedScenario.description || 'Description missing'}
          </p>
        </div>
      {/if}
    </div>
  </div>
</PopoverSelect>
