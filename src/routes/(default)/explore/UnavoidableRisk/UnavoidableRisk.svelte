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

  export let threshold;
  let UN_AVOIDABLE_RISK_DATA = writable({});

  export let title;

  $: $IS_COMBINATION_AVAILABLE &&
    fetchData(UN_AVOIDABLE_RISK_DATA, {
      endpoint: END_UN_AVOIDABLE_RISK,
      params: {
        geography: $CURRENT_GEOGRAPHY.uid,
        indicator: $CURRENT_INDICATOR.uid,
        ...$CURRENT_INDICATOR_OPTION_VALUES,
      },
    });

  $: process = ({ data }, { scenarios, allScenarios, urlParams }) => {
    const thresholds = data.thresholds.map((value) => ({
      label: formatValue(value, $CURRENT_INDICATOR_UNIT_UID),
      value,
    }));

    const hasThresholds = data.thresholds.length;
    let thresholdIndex = data.thresholds.indexOf(threshold);

    if (thresholdIndex === -1) {
      thresholdIndex = hasThresholds ? data.thresholds.indexOf(data.defaultThreshold) : 0;
    }

    threshold = data.thresholds[thresholdIndex];

    const timeframe = scenarios[0][KEY_SCENARIO_TIMEFRAME];

    const validYears = data.years.filter((y) => y <= timeframe);

    const mergedScenarios = uniqBy([...scenarios, ...allScenarios], 'uid').filter((s) => s[KEY_SCENARIO_TIMEFRAME] === timeframe);

    let processedScenarios = Object.entries(data.data)
      .map(([uid, scenarioData]) => {
        const scenario = find(mergedScenarios, { uid });
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
      scenarios: scenarios.map((d) => d.uid),
    };

    const chartInfo = [
      { label: 'Model', value: data.model },
      { label: 'Source', value: data.source },
    ];

    // The endpoint might not always return data for all scenarios
    const includedScenarios = Object.keys(data.data);
    const legendItems = [...$CURRENT_SCENARIOS.filter(({ uid }) => includedScenarios.includes(uid))];

    // Checking if there are more scenarios than the selected ones included
    const hasOtherScenarios = without(includedScenarios, ...$CURRENT_SCENARIOS.map(({ uid }) => uid)).length;
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
        class="mb-6"
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
        id={1}
      />
      <figure class="aspect-[2.5]">
        <UnavoidableRiskChart
          xDomain={asyncProps.xDomain}
          data={asyncProps.data}
        />
        <figcaption class="mt-2">
          <span class="text-xs text-contour-weaker">To avoid overlapping scenarios, the vertical and horizontal placement of each dot may not be perfectly correct.</span>
        </figcaption>
      </figure>
    </ChartFrame>
    <LoadingPlaceholder slot="placeholder" />
  </LoadingWrapper>
{/if}
