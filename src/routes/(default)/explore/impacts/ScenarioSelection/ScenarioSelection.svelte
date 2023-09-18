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
  let windowWidth;

  $: buttonLabel =
    $CURRENT_SCENARIOS.length > 1
      ? `${$CURRENT_SCENARIOS.length} scenarios selected`
      : $CURRENT_SCENARIOS[0].label;

  $: scenarios = $AVAILABLE_SCENARIOS.map((scenario, i) => {
    const current = $CURRENT_SCENARIOS.find((s) => s.uid === scenario.uid);
    const currentIndex = $CURRENT_SCENARIOS.indexOf(current);
    return {
      ...scenario,
      ...(current || {}),
      isSelected: !!current,
      isHighlighted: hoveredScenarioUid
        ? hoveredScenarioUid === scenario.uid
        : currentIndex === 0,
    };
  });

  $: chartScenarios = scenarios.filter((s) => s.endYear === currentTimeframe);

  $: renderedScenario = scenarios.find(
    (s) => s.isHighlighted && s.endYear === currentTimeframe
  );
</script>

<svelte:window bind:innerWidth={windowWidth} />

<div class="relative md:pr-6 lg:pr-10">
  <PopoverSelect
    label="Scenario"
    {buttonLabel}
    panelClass="w-screen-p max-w-4xl"
    buttonClass="border border-contour-weakest aria-expanded:border-contour-weaker"
    size="md"
    panelPlacement={windowWidth > 1200 ? 'right-start' : 'bottom-start'}
  >
    <Content
      filters={$AVAILABLE_TIMEFRAMES}
      filterKey="endYear"
      filterLabel="Pick a timeframe"
      currentUid={$CURRENT_SCENARIOS_UID}
      bind:currentFilterUid={currentTimeframe}
      items={scenarios}
    >
      <a
        slot="header-link"
        class="text-sm text-theme-base font-bold flex gap-1.5 items-center"
        href="/documentation#scenarios"
        ><span
          class="flex align-center justify-center text-xs w-4 h-4 rounded-full bg-theme-base text-surface-base"
          >?</span
        >Which scenario should I select?</a
      >
      <div
        slot="items"
        class="grid grid-cols-1 md:grid-cols-[auto_1fr]"
        let:items
        let:currentFilterUid
      >
        {#key currentFilterUid}
          <fieldset
            class="flex flex-col min-w-min md:border-r border-contour-weakest py-2"
          >
            <ScenarioList
              highlightedScenarioUid={renderedScenario?.uid}
              bind:hoveredScenarioUid
              scenarios={items}
              {currentFilterUid}
            />
          </fieldset>
        {/key}

        <div class="p-6 hidden md:block">
          {#if renderedScenario}
            <ScenarioDetails
              scenario={renderedScenario}
              scenarios={chartScenarios}
            />
          {:else}
            <div
              class="p-4 flex items-center rounded text-contour-weak justify-center min-h-[60vh]"
            >
              Hover over a scenario to view details
            </div>
          {/if}
        </div>
      </div>
    </Content>
  </PopoverSelect>
</div>
