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
  import Scenario from './Scenario.svelte';

  let hoveredScenarioUid;
  let currentTimeframe;

  $: buttonLabel =
    $CURRENT_SCENARIOS.length > 1
      ? `${$CURRENT_SCENARIOS.length} scenarios selected`
      : $CURRENT_SCENARIOS[0].label;

  $: scenarios = $AVAILABLE_SCENARIOS.map((scenario, i) => {
    const current = $CURRENT_SCENARIOS.find((s) => s.uid === scenario.uid);
    return {
      ...scenario,
      ...(current || {}),
      isSelected: !!current,
      isHighlighted: hoveredScenarioUid
        ? hoveredScenarioUid === scenario.uid
        : i === 0,
    };
  });

  $: chartScenarios = scenarios.filter(
    (s) => s.timeframe[1] === currentTimeframe
  );

  $: renderedScenario = scenarios.find((s) => s.isHighlighted);

  $: console.log(renderedScenario, hoveredScenarioUid, $CURRENT_SCENARIOS);
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
      bind:currentFilterUid={currentTimeframe}
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
                  on:focus={() => (hoveredScenarioUid = scenario.uid)}
                  on:mouseover={() => (hoveredScenarioUid = scenario.uid)}
                  on:mouseleave={() => (hoveredScenarioUid = null)}
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
                    on:focus={() => (hoveredScenarioUid = scenario)}
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

          <div class="max-w-xl p-6 overflow-y-scroll">
            {#if renderedScenario}
              <Scenario
                scenario={renderedScenario}
                scenarios={chartScenarios}
              />
            {/if}
          </div>
        </div>
      </div>
    </Content>
  </PopoverSelect>
</div>
