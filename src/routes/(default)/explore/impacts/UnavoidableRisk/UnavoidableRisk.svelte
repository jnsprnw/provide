<script>
  import {
    CURRENT_INDICATOR,
    CURRENT_INDICATOR_UNIT_UID,
    CURRENT_GEOGRAPHY,
    CURRENT_INDICATOR_OPTION_VALUES,
    TEMPLATE_PROPS,
    CURRENT_SCENARIOS,
    AVAILABLE_SCENARIOS,
    IS_COMBINATION_AVAILABLE,
    URL_PARAMS,
  } from '$stores/state.js';
  import UnavoidableRiskChart from './UnavoidableRiskChart/UnavoidableRiskChart.svelte';
  import ColorLegend from '$lib/charts/legends/ColorLegend.svelte';
  import LoadingWrapper from '$lib/helper/LoadingWrapper.svelte';
  import Select from '$lib/controls/Select/Select.svelte';
  import { min } from 'd3-array';
  import { formatValue } from '$lib/utils/formatting';
  import {
    END_UN_AVOIDABLE_RISK,
    UNAVOIDABLE_UID,
    KEY_MODEL,
    KEY_SOURCE,
  } from '$src/config.js';
  import { sortBy, reverse, find, uniqBy } from 'lodash-es';
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
      thresholdIndex = hasThresholds
        ? data.thresholds.indexOf(data.defaultThreshold)
        : 0;
    }

    console.log(data.thresholds);

    threshold = data.thresholds[thresholdIndex];
    const timeframe = scenarios[0].timeframe[1];
    const mergedScenarios = uniqBy(
      [...scenarios, ...allScenarios],
      'uid'
    ).filter((s) => s.endYear === timeframe);

    let processedScenarios = Object.entries(data.data)
      .map(([uid, scenarioData]) => {
        const scenario = find(mergedScenarios, { uid });
        if (!scenario) return;
        const values = data.years.map((year, yearIndex) => {
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

    const unavoidableValues = data.years.map((year, yearIndex) => {
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

    processedScenarios.unshift({
      uid: UNAVOIDABLE_UID,
      label: 'Unavoidable',
      values: unavoidableValues,
    });

    const downloadParams = [
      {
        uid: 'format',
        label: 'Format',
        options: (data.data.formats || ['csv']).map((uid) => ({
          label: uid,
          uid,
        })),
      },
    ];

    const downloadBaseParams = { ...urlParams, threshold };

    const chartInfo = [
      { label: 'Model', value: data.model },
      { label: 'Source', value: data.source },
    ];

    return {
      ...data,
      thresholds,
      title: data.title,
      description: data.description,
      data: processedScenarios,
      // The following two items would be included anyway, but we state them for clarity
      model: data[KEY_MODEL],
      source: data[KEY_SOURCE],
      downloadParams,
      downloadBaseParams,
      chartInfo,
    };
  };

  $: legendItems = [
    ...$CURRENT_SCENARIOS,
    { label: 'Other scenarios', uid: 'other' },
  ];
</script>

{#if $IS_COMBINATION_AVAILABLE}
  <LoadingWrapper
    let:props
    let:asyncProps
    let:isLoading
    {process}
    asyncProps={$UN_AVOIDABLE_RISK_DATA}
    props={{
      ...$TEMPLATE_PROPS,
      allScenarios: $AVAILABLE_SCENARIOS,
      threshold,
      legendItems,
      urlParams: $URL_PARAMS,
    }}
  >
    <ChartFrame
      tagline={title}
      title={asyncProps.title}
      description={asyncProps.description}
      templateProps={props}
      downloadBaseParams={asyncProps.downloadBaseParams}
      downloadParams={asyncProps.downloadParams}
      chartUid={END_UN_AVOIDABLE_RISK}
      chartInfo={asyncProps.chartInfo}
    >
      <div class="mb-10" slot="controls">
        {#if asyncProps.thresholds.length > 1}
          <Select
            label="Threshold"
            options={asyncProps.thresholds}
            bind:value={threshold}
          />
        {/if}
      </div>
      <ColorLegend items={props.legendItems} />
      <figure class="aspect-[2.1]">
        <UnavoidableRiskChart
          {isLoading}
          {...props}
          {...asyncProps}
          unit="percent"
        />
        <!-- <figcaption class="mt-2">
          <span class="text-xs text-foreground-weaker"
            >To avoid overlapping of scenarios, the vertical and horizontal
            placement of each dot might not be perfectly correct.</span
          >
        </figcaption> -->
      </figure>
    </ChartFrame>
    <LoadingPlaceholder slot="placeholder" />
  </LoadingWrapper>
{/if}
