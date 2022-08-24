<script>
  import {
    CURRENT_INDICATOR,
    CURRENT_INDICATOR_UID,
    CURRENT_GEOGRAPHY,
    CURRENT_SCENARIOS,
    CURRENT_INDICATOR_OPTIONS,
    CURRENT_INDICATOR_OPTION_VALUES,
    CURRENT_SCENARIOS_UID,
  } from '$lib/../stores/store.js';
  import { END_IMPACT_TIME, END_DISTRIBUTION } from '$lib/../config.js';
  import DistributionChart from '$lib/charts/DistributionChart/DistributionChart.svelte';
  import LineTimeSeries from '$lib/charts/LineTimeSeries.svelte';
  import ResolutionTime from './ResolutionTime.svelte';
  import TitleTimeSeries from './TitleTimeSeries.svelte';
  import DescriptionTimeSeries from './DescriptionTimeSeries.svelte';
  import ChartFacts from '$lib/helper/chart-description/ChartFacts.svelte';
  import ModelList from '$lib/helper/chart-description/ModelList.svelte';
  import LoadingWrapper from '$lib/helper/LoadingWrapper.svelte';
  import { writable } from 'svelte/store';
  import { dataPlease } from '$lib/api/new-api';

  let IMPACT_TIME_DATA = writable([]);
  let IMPACT_TIME_DISTRIBUTION_DATA = writable({});

  $: dataPlease(
    IMPACT_TIME_DATA,
    $CURRENT_SCENARIOS_UID.map((scenario) => ({
      endpoint: END_IMPACT_TIME,
      params: {
        geography: $CURRENT_GEOGRAPHY.uid,
        indicator: $CURRENT_INDICATOR.uid,
        scenario,
        ...$CURRENT_INDICATOR_OPTION_VALUES,
      },
    }))
  );

  $: dataPlease(IMPACT_TIME_DISTRIBUTION_DATA, {
    endpoint: END_DISTRIBUTION,
    params: {
      geography: $CURRENT_GEOGRAPHY.uid,
      indicator: $CURRENT_INDICATOR.uid,
      scenario: $CURRENT_SCENARIOS_UID[0],
      ...$CURRENT_INDICATOR_OPTION_VALUES,
    },
  });

  $: process = ({ impactDistributionData, impactTimeData }, { scenarios }) => {
    const impactDistribution = (() => {
      const {
        yearStart,
        valueStart,
        yearStep,
        valueStep,
        data,
        model,
        parameters,
      } = impactDistributionData.data;

      const mean = data?.mean.map((value, i) => {
        return { year: yearStart + yearStep * i, value };
      });

      const distribution = data?.distribution.map((yearValues, i) => {
        return yearValues.map((distribution, j) => ({
          year: yearStart + yearStep * i,
          value: valueStart + valueStep * j,
          distribution,
        }));
      });

      return { mean, distribution, yearStep, valueStep, model, parameters };
    })();

    const impactTime = impactTimeData.map((datum, i) => {
      const { yearStart, yearStep, data, model, parameters } = datum.data;
      const indicatorData = data[$CURRENT_INDICATOR_UID];

      return {
        color: scenarios[i].color,
        yearStart,
        yearStep,
        parameters,
        model,
        values: indicatorData.map((values, i) => ({
          value: values[values.length - 2],
          year: yearStart + yearStep * i,
        })),
      };
    });

    const hasSingleScenario = impactTimeData.length === 1;

    return { impactTime, impactDistribution, hasSingleScenario };
  };
</script>

<LoadingWrapper
  {process}
  let:asyncProps={{
    impactTime,
    impactDistribution,
    hasSingleScenario,
  }}
  let:props={{
    indicator,
    scenarios,
    geography,
    parameters,
  }}
  asyncProps={{
    impactTimeData: $IMPACT_TIME_DATA,
    impactDistributionData: $IMPACT_TIME_DISTRIBUTION_DATA,
  }}
  props={{
    indicator: $CURRENT_INDICATOR,
    scenarios: $CURRENT_SCENARIOS,
    geography: $CURRENT_GEOGRAPHY,
    parameters: $CURRENT_INDICATOR_OPTIONS,
  }}
>
  <div class="wrapper grid">
    <div class="chart">
      {#if hasSingleScenario}
        <DistributionChart {...impactDistribution} unit={indicator.unit.uid} />
      {:else}
        <LineTimeSeries data={impactTime} unit={indicator.unit.uid} />
      {/if}
    </div>
    <div class="chart-info">
      <TitleTimeSeries
        {indicator}
        {geography}
        {hasSingleScenario}
        impactTimeData={impactTime}
        distributionData={impactDistribution}
      />
      <DescriptionTimeSeries {indicator} {geography} {scenarios} {parameters} />

      <ChartFacts>
        <ResolutionTime
          {hasSingleScenario}
          impactTimeData={impactTime}
          distributionData={impactDistribution}
        />
        <ModelList
          data={hasSingleScenario
            ? [impactDistribution.model]
            : impactTime.map((d) => d.model)}
        />
      </ChartFacts>
    </div>
  </div>
</LoadingWrapper>

<style lang="scss">
  @import '../../../../styles/global.scss';

  .chart {
    height: 400px;
    grid-column: 1 / span 7;
    margin-bottom: var(--space-xxl);
  }

  .chart-info {
    grid-column: 8 / span 5;
    @include chart-info-layout();
  }
</style>
