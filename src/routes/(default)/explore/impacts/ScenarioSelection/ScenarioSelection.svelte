<script>
  import {
    CURRENT_SCENARIOS,
    CURRENT_SCENARIOS_UID,
    AVAILABLE_SCENARIOS,
    AVAILABLE_TIMEFRAMES,
  } from '$stores/state.js';
  import PopoverSelect from '$lib/controls/PopoverSelect/PopoverSelect.svelte';
  import Content from '$lib/controls/PopoverSelect/Content.svelte';
  import _ from 'lodash-es';
  import CheckboxInput from '$lib/helper/CheckboxInput.svelte';

  let hoveredScenario;
  $: renderedScenario = hoveredScenario || $CURRENT_SCENARIOS[0];

  $: buttonLabel =
    $CURRENT_SCENARIOS.length > 1
      ? `${$CURRENT_SCENARIOS.length} scenarios selected`
      : $CURRENT_SCENARIOS[0].label;

  $: scenarios = $AVAILABLE_SCENARIOS.map((scenario) => {
    const current = $CURRENT_SCENARIOS.find((s) => s.uid === scenario.uid);
    return { ...scenario, ...(current || {}), isSelected: !!current };
  });
</script>

<div class="relative">
  <PopoverSelect
    label="Indicator"
    {buttonLabel}
    panelClass="w-screen max-w-3xl"
    buttonClass="border border-foreground-weakest"
    size="md"
  >
    <Content
      filters={$AVAILABLE_TIMEFRAMES}
      filterKey="endYear"
      filterLabel="Timeframes"
      currentUid={$CURRENT_SCENARIOS_UID}
      items={scenarios}
    >
      <div slot="items" let:items let:currentFilterUid>
        <div class="flex">
          {#key currentFilterUid}
            <fieldset
              class="flex flex-col w-2/3 border-r border-foreground-weakest py-2"
            >
              {#each items as scenario}
                <label
                  on:focus={() => (hoveredScenario = scenario)}
                  on:mouseover={() => (hoveredScenario = scenario)}
                  on:mouseleave={() => (hoveredScenario = null)}
                  class="px-4 py-2 border-l-3"
                  class:bg-background-weaker={renderedScenario.uid ===
                    scenario.uid}
                  class:border-theme-base={scenario.isSelected}
                  class:border-transparent={!scenario.isSelected}
                >
                  <CheckboxInput
                    name="scenarios"
                    value={scenario.uid}
                    checked={scenario.isSelected}
                    on:change={() =>
                      CURRENT_SCENARIOS_UID.toggle(
                        scenario.uid,
                        currentFilterUid
                      )}
                    on:focus={() => (hoveredScenario = scenario)}
                  />
                  {scenario.label}
                  <span
                    class="w-3 h-3 rounded-full inline-block"
                    style={`background: ${scenario.color};`}
                  />
                </label>
              {/each}
            </fieldset>
          {/key}

          <div class="max-w-lg p-6">
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
      </div>
    </Content>
  </PopoverSelect>
</div>
