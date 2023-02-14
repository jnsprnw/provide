<script>
  import {
    CURRENT_INDICATOR,
    CURRENT_INDICATOR_UNIT_UID,
    CURRENT_GEOGRAPHY,
    CURRENT_INDICATOR_OPTION_VALUES,
    CURRENT_INDICATOR_OPTIONS,
    DICTIONARY_CURRENT_SCENARIOS,
  } from '$stores/store.js';
  import { DICTIONARY_SCENARIOS } from '$stores/meta.js';
  import RiskChart from '$lib/charts/RiskChart/index.svelte';
  import LoadingWrapper from '$lib/helper/LoadingWrapper.svelte';
  import ChartInfo from './ChartInfo.svelte';
  import Select from '$lib/helper/select/index.svelte';
  import { min } from 'd3-array';
  import { formatValue } from '$lib/utils/formatting';
  import {
    END_UN_AVOIDABLE_RISK,
    UNAVOIDABLE_UID,
    KEY_MODEL,
    KEY_SOURCE,
  } from '$src/config.js';
  import { sortBy, reverse } from 'lodash-es';
  import { dataPlease } from '$lib/api/new-api';
  import { writable } from 'svelte/store';

  let currentThreshold;
  let UN_AVOIDABLE_RISK_DATA = writable({});

  $: dataPlease(UN_AVOIDABLE_RISK_DATA, {
    endpoint: END_UN_AVOIDABLE_RISK,
    params: {
      geography: $CURRENT_GEOGRAPHY.uid,
      indicator: $CURRENT_INDICATOR.uid,
      ...$CURRENT_INDICATOR_OPTION_VALUES,
    },
  });

  $: process = ({ data }, { scenarios, currentScenarios }) => {
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
      const scenario = currentScenarios[key] || scenarios[key];
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
</script>

<LoadingWrapper
  let:props
  let:asyncProps
  let:isLoading
  {process}
  asyncProps={$UN_AVOIDABLE_RISK_DATA}
  props={{
    scenarios: $DICTIONARY_SCENARIOS,
    currentScenarios: $DICTIONARY_CURRENT_SCENARIOS,
    indicator: $CURRENT_INDICATOR,
    currentGeography: $CURRENT_GEOGRAPHY,
    currentIndicatorOptions: $CURRENT_INDICATOR_OPTIONS,
  }}
>
  <div class="wrapper grid">
    <div class="chart-info">
      <ChartInfo {...props} {...asyncProps} threshold={currentThreshold} />
    </div>
    <div class="chart-container">
      {#if asyncProps.thresholds.length > 1}
        <div class="chart-options">
          <Select
            label="Threshold"
            options={asyncProps.thresholds}
            bind:value={currentThreshold}
          />
        </div>
      {/if}
      <div class="chart">
        <RiskChart {isLoading} {...props} {...asyncProps} unit="percent" />
      </div>
    </div>
  </div>
</LoadingWrapper>

<style lang="scss">
  @import '../../../../styles/global.scss';

  .chart-container {
    grid-column: 7 / span 6;
  }

  .chart-options {
    margin-bottom: var(--space-m);
  }

  .chart {
    height: 400px;
  }

  .chart-info {
    grid-column: 1 / span 5;
    @include chart-info-layout();
  }
</style>
