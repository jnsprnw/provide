<script>
  import {
    AVAILABLE_SCENARIOS,
    CURRENT_SCENARIOS,
    CURRENT_SCENARIOS_UID,
    IS_EMPTY_INDICATOR,
    AVAILABLE_TIMEFRAMES,
    IS_COMBINATION_AVAILABLE_SCENARIO,
    IS_COMBINATION_AVAILABLE_INDICATOR,
    IS_EMPTY_GEOGRAPHY,
  } from '$stores/state.js';
  import { PATH_KEY_CONCEPTS, ANCHOR_EXPLAINER_SCENARIOS } from '$config';
  import PopoverSelect from '$lib/controls/PopoverSelect/PopoverSelect.svelte';
  import Content from '$lib/controls/PopoverSelect/Content.svelte';
  import LinkArrow from '$lib/helper/icons/LinkArrow.svelte';
  import ScenarioDetails from './ScenarioDetails.svelte';
  import ScenarioList from './ScenarioList.svelte';
  import { derived } from 'svelte/store';

  let hoveredScenarioUid;
  let currentTimeframe;
  let windowWidth;

  $: hasScenarioSelected = $CURRENT_SCENARIOS.length !== 0;

  $: multipleScenariosSelected = $CURRENT_SCENARIOS.length > 1;

  $: buttonLabel = hasScenarioSelected ? (multipleScenariosSelected ? `${$CURRENT_SCENARIOS.length} scenarios selected` : $CURRENT_SCENARIOS[0].label) : undefined;

  $: scenarios = $AVAILABLE_SCENARIOS.map((scenario) => {
    const current = $CURRENT_SCENARIOS.find((s) => s.uid === scenario.uid);
    const currentIndex = $CURRENT_SCENARIOS.indexOf(current);
    return {
      ...scenario,
      ...(current || {}),
      isSelected: !!current,
      isHighlighted: hoveredScenarioUid ? hoveredScenarioUid === scenario.uid : currentIndex === 0,
    };
  });

  $: chartScenarios = scenarios.filter((s) => s.endYear === currentTimeframe);

  $: renderedScenario = scenarios.find((s) => s.isHighlighted && s.endYear === currentTimeframe);

  const DISABLED = derived([IS_EMPTY_GEOGRAPHY, IS_EMPTY_INDICATOR, IS_COMBINATION_AVAILABLE_INDICATOR], ([$isEmptyGeography, $isEmptyIndicator, $isAvailableIndicator]) => {
    if ($isEmptyGeography) {
      return 'Select a geography first';
    }
    if ($isEmptyIndicator) {
      return 'Select an indicator first';
    }
    if (!$isAvailableIndicator) {
      return 'Select a valid indicator first';
    }
    return undefined;
  });
</script>

<svelte:window bind:innerWidth={windowWidth} />

<div class="relative md:pr-6 lg:pr-10 max-w-xs">
  <PopoverSelect
    label="Scenario"
    {buttonLabel}
    panelClass="w-screen-p max-w-4xl"
    buttonClass={`border border-contour-weakest aria-expanded:border-contour-weaker `}
    warning={!$IS_EMPTY_INDICATOR && hasScenarioSelected && !$IS_COMBINATION_AVAILABLE_SCENARIO ? `Unavailable scenario${multipleScenariosSelected ? 's' : ''} selected` : undefined}
    placeholder={!hasScenarioSelected ? 'Select one or more scenarios' : undefined}
    size="md"
    panelPlacement={windowWidth > 1200 ? 'right-start' : 'bottom-start'}
    class=""
    disabled={$DISABLED}
  >
    <Content
      filters={$AVAILABLE_TIMEFRAMES}
      filterKey="endYear"
      filterLabel="Pick a timeframe"
      disabledMessage="No scenarios available for this indicator in this timeframe"
      currentUid={$CURRENT_SCENARIOS_UID}
      bind:currentFilterUid={currentTimeframe}
      items={scenarios}
    >
      <a
        slot="header-link"
        class="text-sm leading-tight text-theme-base font-bold flex items-center rounded-sm bg-theme-base text-white px-3 sm:px-4 md:px-6 py-1 sm:py-2 md:py-3 gap-2 hover:bg-theme-stronger transition-colors"
        href={`/${PATH_KEY_CONCEPTS}#${ANCHOR_EXPLAINER_SCENARIOS}`}
      >
        <span>Which scenario should I select?</span>
        <LinkArrow />
      </a>
      <div slot="items" class="grid grid-cols-1 md:grid-cols-[auto_1fr]" let:items let:currentFilterUid>
        {#key currentFilterUid}
          <fieldset class="flex flex-col min-w-min md:border-r border-contour-weakest py-2">
            <ScenarioList highlightedScenarioUid={renderedScenario?.uid} bind:hoveredScenarioUid scenarios={items} {currentFilterUid} />
          </fieldset>
        {/key}

        <div class="p-6 hidden md:block">
          {#if renderedScenario}
            <ScenarioDetails scenario={renderedScenario} scenarios={chartScenarios} {currentFilterUid} />
          {:else}
            <div class="p-4 flex items-center rounded text-contour-weak justify-center min-h-[60vh]">Hover over a scenario to view details</div>
          {/if}
        </div>
      </div>
    </Content>
  </PopoverSelect>
</div>
