<script>
  import { get } from 'lodash-es';
  import Grid from '$lib/helper/Grid.svelte';
  import { IMPACT_TIME_DISTRIBUTION_DATA } from '$lib/../stores/impact-time-distribution.js';
  import { IMPACT_TIME_CACHE } from '$lib/../stores/impact-time.js';
  import { handle } from '$lib/api/api.js';
  import { END_IMPACT_TIME } from '$lib/../config.js';
  import {
    CURRENT_INDICATOR_UNIT,
    CURRENT_INDICATOR,
    CURRENT_INDICATOR_UID,
    CURRENT_GEOGRAPHY,
    CURRENT_GEOGRAPHY_UID,
    CURRENT_SCENARIOS_UID,
    ALT_CURRENT_SCENARIOS,
  } from '$lib/../stores/store.js';
  import LineDistributionChart from '$lib/charts/LineDistributionChart.svelte';
  import LineTimeSeries from '$lib/charts/LineTimeSeries.svelte';

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

  $: impactTimeData = handle(
    END_IMPACT_TIME,
    'get',
    {
      geography: $CURRENT_GEOGRAPHY_UID,
      scenarios: $CURRENT_SCENARIOS_UID,
      indicator: $CURRENT_INDICATOR_UID,
    },
    $IMPACT_TIME_CACHE
  )
    .filter((d) => d.status === 'success')
    .map((datum, i) => {
      const { yearStart, yearStep } = datum.data;
      const indicatorData = get(datum, [
        'data',
        'data',
        $CURRENT_INDICATOR_UID,
      ]);

      return {
        color: $ALT_CURRENT_SCENARIOS[i].color,
        values: indicatorData?.map((values, i) => ({
          value: values[values.length - 2],
          year: yearStart + yearStep * i,
        })),
      };
    });
</script>

<Grid container>
  <Grid md="8">
    {#if $CURRENT_SCENARIOS_UID.length === 1}
      {#if get($IMPACT_TIME_DISTRIBUTION_DATA, ['status']) === 'success'}
        <div class="impact-time-chart">
          <LineDistributionChart
            {...distributionData}
            unit={$CURRENT_INDICATOR_UNIT}
          />
        </div>
      {/if}
    {:else}
      <div class="impact-time-chart">
        <LineTimeSeries data={impactTimeData} unit="celsius" />
      </div>
    {/if}
  </Grid>
  <Grid md="4">
    <div>
      <h2>
        {$CURRENT_INDICATOR.label} in {$CURRENT_GEOGRAPHY.label} until 2100
      </h2>
    </div>
  </Grid>
</Grid>

<style lang="scss">
  .impact-time-chart {
    height: 400px;
    width: 100%;
  }
</style>
