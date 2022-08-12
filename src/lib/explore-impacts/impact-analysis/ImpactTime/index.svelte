<script>
  import { get } from 'lodash-es';
  import Grid from '$lib/helper/Grid.svelte';
  import { IMPACT_TIME_DISTRIBUTION_DATA } from '$lib/../stores/impact-time-distribution.js';
  import { IMPACT_TIME_DATA } from '$lib/../stores/impact-time.js';
  import {
    CURRENT_INDICATOR_UNIT_UID,
    CURRENT_INDICATOR,
    CURRENT_INDICATOR_UID,
    CURRENT_GEOGRAPHY,
    CURRENT_SCENARIOS_UID,
    CURRENT_SCENARIOS,
  } from '$lib/../stores/store.js';
  import LineDistributionChart from '$lib/charts/LineDistributionChart.svelte';
  import LineTimeSeries from '$lib/charts/LineTimeSeries.svelte';
  import ResolutionTime from './ResolutionTime.svelte';
  import TitleTimeSeries from './TitleTimeSeries.svelte';
  import DescriptionTimeSeries from './DescriptionTimeSeries.svelte';
  import { STATUS_SUCCESS } from '$lib/../config.js';

  $: hasSingleScenario = $CURRENT_SCENARIOS_UID.length === 1;

  $: distributionData = (() => {
    const { yearStart, valueStart, yearStep, valueStep, data } =
      get($IMPACT_TIME_DISTRIBUTION_DATA, ['data']) || {};

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

  $: impactTimeData = $IMPACT_TIME_DATA
    .filter((d) => d.status === STATUS_SUCCESS)
    .map((datum, i) => {
      const { yearStart, yearStep, data } = datum.data || {}; // Why is datum.data undefined on server here?
      const indicatorData = data ? data[$CURRENT_INDICATOR_UID] : [];

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
</script>

<Grid container>
  <Grid md="8">
    {#if hasSingleScenario}
      {#if get($IMPACT_TIME_DISTRIBUTION_DATA, ['status']) === STATUS_SUCCESS}
        <div class="impact-time-chart">
          <LineDistributionChart
            {...distributionData}
            unit={$CURRENT_INDICATOR_UNIT_UID}
          />
        </div>
      {/if}
    {:else}
      <div class="impact-time-chart">
        <LineTimeSeries
          data={impactTimeData}
          unit={$CURRENT_INDICATOR_UNIT_UID}
        />
      </div>
    {/if}
  </Grid>
  <Grid md="4">
    <div>
      <TitleTimeSeries
        indicator={$CURRENT_INDICATOR}
        geography={$CURRENT_GEOGRAPHY}
        {hasSingleScenario}
        {impactTimeData}
        {distributionData}
      />
      <DescriptionTimeSeries
        indicator={$CURRENT_INDICATOR}
        geography={$CURRENT_GEOGRAPHY}
        scenarios={$CURRENT_SCENARIOS}
      />
      <p>
        The gridded background shows the certainty of our calculations. The
        darker the color, the more likely it will become true.
      </p>
      <dl>
        <ResolutionTime
          {hasSingleScenario}
          {impactTimeData}
          {distributionData}
        />
      </dl>
    </div>
  </Grid>
</Grid>

<style lang="scss">
  .impact-time-chart {
    height: 400px;
    width: 100%;
  }
</style>
