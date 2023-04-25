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
  import { sortBy, reverse, find } from 'lodash-es';
  import { fetchData } from '$lib/api/api';
  import { writable } from 'svelte/store';
  import ChartFrame from '$lib/charts/ChartFrame/ChartFrame.svelte';
  import LoadingPlaceholder from '$lib/helper/LoadingPlaceholder.svelte';

  let currentThreshold;
  let UN_AVOIDABLE_RISK_DATA = writable({});

  $: $IS_COMBINATION_AVAILABLE &&
    fetchData(UN_AVOIDABLE_RISK_DATA, {
      endpoint: END_UN_AVOIDABLE_RISK,
      params: {
        geography: $CURRENT_GEOGRAPHY.uid,
        indicator: $CURRENT_INDICATOR.uid,
        ...$CURRENT_INDICATOR_OPTION_VALUES,
      },
    });

  $: process = ({ data }, { scenarios, allScenarios, downloadBaseParams }) => {
    const thresholds = data.thresholds.map((value) => ({
      label: formatValue(value, $CURRENT_INDICATOR_UNIT_UID),
      value,
    }));

    const hasThresholds = data.thresholds.length;
    let thresholdIndex = data.thresholds.indexOf(currentThreshold);

    if (thresholdIndex === -1) {
      thresholdIndex = hasThresholds
        ? data.thresholds.indexOf(data.defaultThreshold)
        : 0;
    }

    currentThreshold = data.thresholds[thresholdIndex];

    const mergedScenarios = [...scenarios, ...allScenarios];
    let processedScenarios = Object.entries(data.data).map(
      ([uid, scenarioData]) => {
        const scenario = find(mergedScenarios, { uid });
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
      }
    );

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

    const title =
      'Avoidable and unavoidable change in {{indicator.label}} under different scenarios';
    const description =
      'This chart shows the risk of {{indicator.label}} in {{geography.label}} exceeding a threshold of {{threshold}} {{indicatorUnit.label}}. Each vertical bar represents a snapshot in a given year. The areas at the bottom shows the extent of the impact that is unavoidable. The area at the top shows what can still be avoided under each of the scenarios.';

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

    return {
      ...data,
      thresholds,
      title: data.title || title,
      description: data.description || description,
      data: processedScenarios,
      // The following two items would be included anyway, but we state them for clarity
      model: data[KEY_MODEL],
      source: data[KEY_SOURCE],
      downloadParams,
      downloadBaseParams,
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
      threshold: currentThreshold,
      legendItems,
      downloadBaseParams: $URL_PARAMS,
    }}
  >
    <ChartFrame
      title={asyncProps.title}
      description={asyncProps.description}
      templateProps={props}
      downloadBaseParams={asyncProps.downloadBaseParams}
      downloadParams={asyncProps.downloadParams}
      chartUid={END_UN_AVOIDABLE_RISK}
    >
      <div class="mb-10" slot="controls">
        {#if asyncProps.thresholds.length > 1}
          <Select
            label="Threshold"
            options={asyncProps.thresholds}
            bind:value={currentThreshold}
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
        <figcaption class="mt-2">
          <span class="text-xs text-foreground-weaker"
            >To avoid overlapping of scenarios, the vertical and horizontal
            placement of each dot might not be perfectly correct.</span
          >
        </figcaption>
      </figure>
    </ChartFrame>
    <LoadingPlaceholder slot="placeholder" />
  </LoadingWrapper>
{/if}
