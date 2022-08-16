<script>
  import { IMPACT_TIME_DISTRIBUTION_DATA } from '$lib/../stores/impact-time-distribution.js';
  import { IMPACT_TIME_DATA } from '$lib/../stores/impact-time.js';
  import {
    CURRENT_INDICATOR_UNIT_UID,
    CURRENT_INDICATOR,
    CURRENT_INDICATOR_UID,
    CURRENT_GEOGRAPHY,
    CURRENT_SCENARIOS,
  } from '$lib/../stores/store.js';
  import LineDistributionChart from '$lib/charts/LineDistributionChart.svelte';
  import LineTimeSeries from '$lib/charts/LineTimeSeries.svelte';
  import ResolutionTime from './ResolutionTime.svelte';
  import TitleTimeSeries from './TitleTimeSeries.svelte';
  import DescriptionTimeSeries from './DescriptionTimeSeries.svelte';
  import ChartFacts from '$lib/helper/chart-description/ChartFacts.svelte';
  import LoadingWrapper from '$lib/helper/LoadingWrapper.svelte';

  $: process = ({ impactDistributionData, impactTimeData }) => {
    const impactDistribution = (() => {
      const { yearStart, valueStart, yearStep, valueStep, data } =
        impactDistributionData.data;

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

      return { mean, distribution, yearStep, valueStep };
    })();

    const impactTime = impactTimeData.map((datum, i) => {
      const { yearStart, yearStep, data } = datum.data; // Why is datum.data undefined on server here?
      const indicatorData = data[$CURRENT_INDICATOR_UID];

      return {
        color: $CURRENT_SCENARIOS[i].color,
        yearStart,
        yearStep,
        values: indicatorData.map((values, i) => ({
          value: values[values.length - 2],
          year: yearStart + yearStep * i,
        })),
      };
    });

    const hasSingleScenario = impactTimeData.length === 1;

    return { impactTime, impactDistribution, hasSingleScenario };
  };

  $: model = undefined; // TODO
</script>

<LoadingWrapper
  {process}
  let:asyncProps={{
    impactTime,
    impactDistribution,
    hasSingleScenario,
  }}
  let:props={{
    unit,
    indicator,
    scenarios,
    geography,
  }}
  asyncProps={{
    impactTimeData: $IMPACT_TIME_DATA,
    impactDistributionData: $IMPACT_TIME_DISTRIBUTION_DATA,
  }}
  props={{
    unit: $CURRENT_INDICATOR_UNIT_UID,
    indicator: $CURRENT_INDICATOR,
    scenarios: $CURRENT_SCENARIOS,
    geography: $CURRENT_GEOGRAPHY,
  }}
>
  <div class="wrapper grid">
    <div class="chart">
      {#if hasSingleScenario}
        <LineDistributionChart {...impactDistribution} {unit} />
      {:else}
        <LineTimeSeries data={impactTime} unit />
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
      <DescriptionTimeSeries {indicator} {geography} {scenarios} />
      <p>
        {#if hasSingleScenario}
          The line indicates the median estimate, while the colour variations
          indicate the dispersion of possible results around the median (the
          darker the colour, the more likely they can be obtained for this
          scenario).
        {:else}
          The lines indicates the median estimates for each scenario.
        {/if}
      </p>
      <ChartFacts>
        <ResolutionTime
          {hasSingleScenario}
          impactTimeData={impactTime}
          distributionData={impactDistribution}
        />
        <dt>Model:</dt>
        <dd>{model || '—'}</dd>
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
