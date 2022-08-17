<script>
  import { UN_AVOIDABLE_RISK_DATA } from '$lib/../stores/un-avoidable-risk.js';
  import {
    CURRENT_INDICATOR,
    DICTIONARY_SCENARIOS,
    DICTIONARY_CURRENT_SCENARIOS,
    CURRENT_INDICATOR_UNIT_UID,
  } from '$lib/../stores/store.js';
  import RiskChart from '$lib/charts/RiskChart/index.svelte';
  import LoadingWrapper from '$lib/helper/LoadingWrapper.svelte';
  import ChartInfo from './ChartInfo.svelte';
  import Select from '$lib/helper/select/index.svelte';
  import { min } from 'd3-array';
  import { formatValue } from '$lib/utils/formatting';
  import {
    UNAVOIDABLE_UID,
    KEY_PARAMETERS,
    KEY_MODEL,
  } from '$lib/../config.js';
  import { sortBy, reverse } from 'lodash-es';

  let currentThreshold;

  $: process = ({ data }, { scenarios, currentScenarios }) => {
    const thresholds = data.thresholds.map((value) => ({
      label: formatValue(value, $CURRENT_INDICATOR_UNIT_UID),
      value,
    }));
    currentThreshold = currentThreshold || thresholds[0].value;

    const thresholdIndex = data.thresholds.indexOf(currentThreshold);
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

    processedScenarios = reverse(sortBy(processedScenarios, 'color'))

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

    const { [KEY_MODEL]: model, [KEY_PARAMETERS]: parameters } = data;

    return { thresholds, data: processedScenarios, model, parameters };
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
  }}
>
  <div slot="placeholder">This is a custom loading thing</div>

  <div class="wrapper grid">
    <div class="chart-info">
      <ChartInfo {...props} {...asyncProps} threshold={currentThreshold} />
    </div>
    <div class="chart-container">
      <Select
        label="Threshold"
        options={asyncProps.thresholds}
        bind:value={currentThreshold}
      />
      <div class="chart">
        <RiskChart {isLoading} {...props} {...asyncProps} unit="percent" />
      </div>
    </div>
  </div>
</LoadingWrapper>

<style lang="scss">
  @import '../../../styles/global.scss';

  .chart-container {
    grid-column: 7 / span 6;
  }
  .chart {
    height: 400px;
  }
  .chart-info {
    grid-column: 1 / span 5;
    @include chart-info-layout();
  }
</style>
