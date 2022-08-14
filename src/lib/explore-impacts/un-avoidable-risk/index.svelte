<script>
  import { UN_AVOIDABLE_RISK_DATA } from '$lib/../stores/un-avoidable-risk.js';
  import {
    CURRENT_INDICATOR,
    DICTIONARY_SCENARIOS,
    DICTIONARY_CURRENT_SCENARIOS,
    CURRENT_INDICATOR_UNIT_UID
  } from '$lib/../stores/store.js';
  import RiskChart from '$lib/charts/RiskChart/index.svelte';
  import LoadingWrapper from '$lib/helper/LoadingWrapper.svelte';
  import ChartInfo from './ChartInfo.svelte';
  import Select from '$lib/helper/Select/index.svelte';
  import { min } from 'd3-array';
  import { formatValue } from '$lib/utils/formatting';
  import { UNAVOIDABLE_UID } from '$lib/../config.js';

  let currentThreshold;

  $: process = ({ data: { data }, scenarios, currentScenarios }) => {
    const thresholds = data.thresholds.map((value) => ({
      label: formatValue(value, $CURRENT_INDICATOR_UNIT_UID),
      value,
    }));
    currentThreshold = currentThreshold || thresholds[0].value;

    const thresholdIndex = data.thresholds.indexOf(currentThreshold);
    const processedScenarios = data.data.map((scenarioData) => {
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
    });

    processedScenarios.unshift({
      uid: UNAVOIDABLE_UID,
      label: 'Unavoidable',
      values: unavoidableValues,
    });

    return { thresholds, data: processedScenarios };
  };
</script>

<LoadingWrapper
  let:props
  let:isLoading
  {process}
  slotProps={{
    data: $UN_AVOIDABLE_RISK_DATA,
    scenarios: $DICTIONARY_SCENARIOS,
    currentScenarios: $DICTIONARY_CURRENT_SCENARIOS,
    indicator: $CURRENT_INDICATOR,
  }}
>
  <div slot="placeholder">This is a custom loading thing</div>
<<<<<<< HEAD
  <div class="wrapper grid">
    <div class="chart-info">
      <ChartInfo {...props} threshold={currentThreshold} />
    </div>
    <div class="chart-container">
      <Select
        label="Threshold"
        options={props.thresholds}
        bind:value={currentThreshold}
      />
      <div class="chart">
        <RiskChart {isLoading} {...props} />
      </div>
    </div>
=======
  <ChartInfo {currentThreshold} />
  <Select
    label="Threshold"
    options={props.thresholds}
    bind:value={currentThreshold}
  />
  <div class="chart">
    <RiskChart {isLoading} {...props} unit="celsius" />
>>>>>>> ed49616ec8f641da5b27aad4e9d6b95fbe655bf2
  </div>
</LoadingWrapper>

<style lang="scss">
  .chart-container {
    grid-column: 5 / span 8;
  }
  .chart {
    height: 500px;
  }
  .chart-info {
    grid-column: 1 / span 4;
  }
</style>
