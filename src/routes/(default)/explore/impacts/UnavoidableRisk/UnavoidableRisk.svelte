<script>
  import {
    CURRENT_INDICATOR,
    CURRENT_INDICATOR_UNIT_UID,
    CURRENT_GEOGRAPHY,
    CURRENT_INDICATOR_OPTION_VALUES,
    TEMPLATE_PROPS,
  } from '$stores/state.js';
  import { SCENARIOS } from '$stores/meta.js';
  import RiskChart from '$lib/charts/RiskChart/RiskChart.svelte';
  import LoadingWrapper from '$lib/helper/LoadingWrapper.svelte';
  import ChartInfo from './ChartInfo.svelte';
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

  let currentThreshold;
  let UN_AVOIDABLE_RISK_DATA = writable({});

  $: fetchData(UN_AVOIDABLE_RISK_DATA, {
    endpoint: END_UN_AVOIDABLE_RISK,
    params: {
      geography: $CURRENT_GEOGRAPHY.uid,
      indicator: $CURRENT_INDICATOR.uid,
      ...$CURRENT_INDICATOR_OPTION_VALUES,
    },
  });

  $: process = ({ data }, { scenarios, allScenarios }) => {
    const hasThresholds = !!data.thresholds.length;
    const thresholds = data.thresholds.map((value) => ({
      label: formatValue(value, $CURRENT_INDICATOR_UNIT_UID),
      value,
    }));

    currentThreshold =
      (hasThresholds && currentThreshold) || thresholds[0]?.value;

    const thresholdIndex = hasThresholds
      ? data.thresholds.indexOf(currentThreshold)
      : 0;
    let processedScenarios = data.data.map((scenarioData) => {
      const key = Object.keys(scenarioData)[0]; // TODO: API datastructure has to be adjusted here
      const scenario = find([...scenarios, ...allScenarios], { uid: key });
      const values = data.years.map((year, yearIndex) => {
        const value = scenarioData[key][thresholdIndex][yearIndex];
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
    });

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
      year: "Today's risk",
      value: data.today[thresholdIndex],
      formattedValue: formatValue(data.today[thresholdIndex], 'percent'),
    });

    processedScenarios.unshift({
      uid: UNAVOIDABLE_UID,
      label: 'Unavoidable',
      values: unavoidableValues,
    });

    return {
      ...data,
      thresholds,
      data: processedScenarios,
      // The following two items would be included anyway, but we state them for clarity
      model: data[KEY_MODEL],
      source: data[KEY_SOURCE],
    };
  };

  const title =
    'Avoidable and unavoidable change in {{indicator.label}} under different scenarios';
  const description =
    'This chart shows the risk of {{indicator.label}} in {{geography.label}} exceeding a threshold of {{threshold}} {{indicatorUnit.label}}. Each vertical bar represents a snapshot in a given year. The areas at the bottom shows the extent of the impact that is unavoidable. The area at the top shows what can still be avoided under each of the scenarios.';
</script>

<LoadingWrapper
  let:props
  let:asyncProps
  let:isLoading
  {process}
  asyncProps={$UN_AVOIDABLE_RISK_DATA}
  props={{
    ...$TEMPLATE_PROPS,
    allScenarios: $SCENARIOS,
    threshold: currentThreshold,
  }}
>
  <ChartFrame {title} {description} templateProps={props}>
    <div slot="controls">
      {#if asyncProps.thresholds.length > 1}
        <Select
          label="Threshold"
          options={asyncProps.thresholds}
          bind:value={currentThreshold}
        />
      {/if}
    </div>
    <div class="aspect-video">
      <RiskChart {isLoading} {...props} {...asyncProps} unit="percent" />
    </div>
  </ChartFrame>
</LoadingWrapper>
