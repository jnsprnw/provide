<script>
  import {
    CURRENT_INDICATOR,
    CURRENT_INDICATOR_UNIT_UID,
    CURRENT_GEOGRAPHY,
    CURRENT_INDICATOR_OPTION_VALUES,
    TEMPLATE_PROPS,
    CURRENT_SCENARIOS,
    SELECTABLE_SCENARIOS,
    IS_COMBINATION_AVAILABLE,
    DOWNLOAD_URL_PARAMS,
  } from '$stores/state.js';
  import UnavoidableRiskChart from './UnavoidableRiskChart/UnavoidableRiskChart.svelte';
  import ColorLegend from '$lib/charts/legends/ColorLegend.svelte';
  import LoadingWrapper from '$lib/helper/LoadingWrapper.svelte';
  import Select from '$lib/controls/Select/Select.svelte';
  import { min } from 'd3-array';
  import { formatValue } from '$lib/utils/formatting';
  import { END_UN_AVOIDABLE_RISK, UNAVOIDABLE_UID, KEY_MODEL, KEY_SOURCE, KEY_SCENARIO_TIMEFRAME } from '$src/config.js';
  import { sortBy, reverse, find, uniqBy, without } from 'lodash-es';
  import { fetchData } from '$lib/api/api';
  import { writable } from 'svelte/store';
  import ChartFrame from '$lib/charts/ChartFrame/ChartFrame.svelte';
  import LoadingPlaceholder from '$lib/helper/LoadingPlaceholder.svelte';

  let threshold; // This holds the selected threshold
  let UN_AVOIDABLE_RISK_DATA = writable({});

  export let title;

  /** @type {Array} A list of currently selected scenarios.
  This is nesecssary because of the two modes: The user can select scenarios in Future Impacts.
  In this case we use the list given by the state with the selected scenarios.
  In the Avoiding Impacts mode, we display the default list of scenarios. */
  export let currentScenarios = [];

  // This checks if the passed list of scenarios is valid. If yes, it uses it, otherwise it falls back to the list in the state.
  $: currentSelectedScenarios = (Array.isArray(currentScenarios) && currentScenarios.length ? currentScenarios : $CURRENT_SCENARIOS).map(
    // We just need a small set of attributes
    ({ uid, label, color, [KEY_SCENARIO_TIMEFRAME]: timeframe }) => ({ uid, label, color, [KEY_SCENARIO_TIMEFRAME]: timeframe })
  );

  $: $IS_COMBINATION_AVAILABLE &&
    fetchData(UN_AVOIDABLE_RISK_DATA, {
      endpoint: END_UN_AVOIDABLE_RISK,
      params: {
        geography: $CURRENT_GEOGRAPHY.uid,
        indicator: $CURRENT_INDICATOR.uid,
        ...$CURRENT_INDICATOR_OPTION_VALUES,
      },
    });

  $: process = ({ data }, { selectedScenarios, urlParams, allScenarios }) => {
    // This creates the list of thresholds
    const thresholds = data.thresholds.map((value) => ({
      label: `${formatValue(value, $CURRENT_INDICATOR_UNIT_UID)} (${value})`,
      value,
    }));

    const hasThresholds = data.thresholds.length;
    let thresholdIndex = data.thresholds.indexOf(threshold); // Get the index of the currently selected threshold

    // If the currently selected threshold does not exist is the list of possible thresholds
    if (thresholdIndex === -1) {
      // If no thresholds are present, we use 0
      // If thresholds are present, we try to use the default threshold. If this is not present, we fallback to 0
      thresholdIndex = hasThresholds ? data.thresholds.indexOf(data.defaultThreshold) || 0 : 0;
    }

    // We use the index to find the threshold, but fallback to 0
    threshold = data.thresholds[thresholdIndex] ?? 0;

    // The timeframe is determined by the first selected scenario, because the selected scenarios must have the same timeframe
    const timeframe = selectedScenarios[0][KEY_SCENARIO_TIMEFRAME];

    // We filter out unused years
    const validYears = data.years.filter((y) => y <= timeframe);

    // We display all scenarios in this timeframe
    // For this, we merge the selected and all scenarios together
    // This is because the selected scenarios have the assigned colors included
    // That’s why we spread them first in the new array
    const mergedScenarios = uniqBy([...selectedScenarios, ...allScenarios], 'uid').filter((s) => s[KEY_SCENARIO_TIMEFRAME] === timeframe);

    let processedScenarios = Object.entries(data.data)
      .map(([uid, scenarioData]) => {
        // Find the current scenario in the list of valid scenarios
        const scenario = find(mergedScenarios, { uid });
        // If the scenario is not present (probably because the timeframe is different), we skip/remove it
        if (!scenario) return;
        const values = validYears.map((year, yearIndex) => {
          const value = scenarioData[thresholdIndex][yearIndex];
          return {
            year,
            value,
            formattedValue: formatValue(value, 'percent'),
          };
        });
        return {
          ...scenario,
          values,
        };
      })
      .filter(Boolean);

    // The selected scenarios (the ones with a color) should come first. We don’t need a more refined sorting here, as the dots don’t overlay
    processedScenarios = reverse(sortBy(processedScenarios, 'color'));

    const unavoidableValues = validYears.map((year, yearIndex) => {
      const value = min(processedScenarios, (d) => d.values[yearIndex].value);
      return {
        year,
        value,
        formattedValue: formatValue(value, 'percent'),
      };
    });

    unavoidableValues.unshift({
      year: 'Today’s risk',
      value: data.today[thresholdIndex],
      formattedValue: formatValue(data.today[thresholdIndex], 'percent'),
    });

    const xDomain = unavoidableValues.map(({ year }) => year);

    processedScenarios.unshift({
      uid: UNAVOIDABLE_UID,
      label: 'Unavoidable',
      values: unavoidableValues,
    });

    const dataDownloadOptions = [
      {
        uid: 'format',
        label: 'Format',
        options: (data.data.formats || ['csv']).map((uid) => ({
          label: uid,
          uid,
        })),
      },
    ];

    const dataDownloadParams = { ...urlParams, threshold };
    const graphDownloadParams = {
      ...dataDownloadParams,
      scenarios: selectedScenarios.map((d) => d.uid),
    };

    const chartInfo = [
      { label: 'Model', value: data.model },
      { label: 'Source', value: data.source },
    ];

    // The endpoint might not always return data for all scenarios
    const includedScenarios = Object.keys(data.data);
    const legendItems = [...currentSelectedScenarios.filter(({ uid }) => includedScenarios.includes(uid))];

    // Checking if there are more scenarios than the selected ones included
    const hasOtherScenarios = without(includedScenarios, ...currentSelectedScenarios.map(({ uid }) => uid)).length;
    if (hasOtherScenarios) {
      legendItems.push({ label: 'Other scenarios', uid: 'other' });
    }

    return {
      ...data,
      thresholds,
      title: data.title,
      description: data.description,
      data: processedScenarios,
      // The following two items would be included anyway, but we state them for clarity
      model: data[KEY_MODEL],
      source: data[KEY_SOURCE],
      dataDownloadOptions,
      dataDownloadParams,
      graphDownloadParams,
      chartInfo,
      xDomain,
      legendItems,
    };
  };
</script>

{#if $IS_COMBINATION_AVAILABLE}
  <LoadingWrapper
    let:props
    let:isLoading
    let:asyncProps
    {process}
    asyncProps={$UN_AVOIDABLE_RISK_DATA}
    props={{
      ...$TEMPLATE_PROPS,
      allScenarios: $SELECTABLE_SCENARIOS,
      selectedScenarios: currentSelectedScenarios,
      threshold,
      urlParams: $DOWNLOAD_URL_PARAMS,
    }}
  >
    <ChartFrame
      tagline={title}
      title={asyncProps.title}
      description={asyncProps.description}
      templateProps={props}
      dataDownloadParams={asyncProps.dataDownloadParams}
      dataDownloadOptions={asyncProps.dataDownloadOptions}
      graphDownloadParams={asyncProps.graphDownloadParams}
      chartUid={END_UN_AVOIDABLE_RISK}
      chartInfo={asyncProps.chartInfo}
      {isLoading}
    >
      <div
        class="0"
        slot="controls"
      >
        {#if asyncProps.thresholds.length > 1}
          <Select
            label="Threshold"
            options={asyncProps.thresholds}
            bind:value={threshold}
          />
        {/if}
      </div>
      <ColorLegend
        items={asyncProps.legendItems}
        class="my-4"
      />
      <figure class="aspect-[2.5]">
        <UnavoidableRiskChart
          xDomain={asyncProps.xDomain}
          data={asyncProps.data}
          currentScenarios={currentSelectedScenarios}
        />
        <figcaption class="mt-2">
          <span class="text-xs text-contour-weaker">To avoid overlapping scenarios, the vertical and horizontal placement of each dot may not be perfectly correct.</span>
        </figcaption>
      </figure>
    </ChartFrame>
    <LoadingPlaceholder slot="placeholder" />
  </LoadingWrapper>
{/if}
