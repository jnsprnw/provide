<script>
  import {
    CURRENT_SCENARIOS,
    CURRENT_SCENARIOS_UID,
    AVAILABLE_SCENARIOS,
    AVAILABLE_TIMEFRAMES,
  } from '$stores/state.js';
  import PopoverSelect from '$lib/controls/PopoverSelect/PopoverSelect.svelte';
  import Content from '$lib/controls/PopoverSelect/Content.svelte';
  import ScenarioDetails from './ScenarioDetails.svelte';
  import ScenarioList from './ScenarioList.svelte';

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
</script>

<div class="relative">
  <PopoverSelect
    label="Indicator"
    {buttonLabel}
    panelClass="max-w-4xl"
    buttonClass="border border-foreground-weakest"
    size="md"
    panelPlacement="right-start"
  >
    <Content
      filters={$AVAILABLE_TIMEFRAMES}
      filterKey="endYear"
      filterLabel="Timeframes"
      currentUid={$CURRENT_SCENARIOS_UID}
      bind:currentFilterUid={currentTimeframe}
      items={scenarios}
    >
      <a
        slot="header-link"
        class="text-sm text-theme-base font-bold flex gap-1.5 items-center"
        href="/methodology#scenarios"
        ><span
          class="flex align-center justify-center text-xs w-4 h-4 rounded-full bg-theme-base text-background-base"
          >?</span
        >Which scenario should I select?</a
      >
      <div slot="items" class="flex" let:items let:currentFilterUid>
        {#key currentFilterUid}
          <fieldset
            class="flex flex-col min-w-min border-r border-foreground-weakest py-2"
          >
            <ScenarioList
              highlightedScenarioUid={renderedScenario.uid}
              bind:hoveredScenarioUid
              scenarios={items}
              {currentFilterUid}
            />
          </fieldset>
        {/key}

        <div class="p-6 overflow-y-scroll max-w-xl">
          {#if renderedScenario}
            <ScenarioDetails
              scenario={renderedScenario}
              scenarios={chartScenarios}
            />
          {/if}
        </div>
      </div>
    </Content>
  </PopoverSelect>
</div>
