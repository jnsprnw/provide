<script>
  import { get } from 'lodash-es';
  import Grid from '$lib/helper/Grid.svelte';
  import { IMPACT_TIME_DATA } from '$lib/../stores/impact-time.js';
  import { IMPACT_TIME_DISTRIBUTION_DATA } from '$lib/../stores/impact-time-distribution.js';
  import {
    CURRENT_INDICATOR_UNIT,
    CURRENT_INDICATOR,
    CURRENT_GEOGRAPHY,
  } from '$lib/../stores/store.js';
  import LineDistributionChart from '$lib/charts/LineDistributionChart.svelte';

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
</script>

<Grid container>
  <Grid md="8">
    {#if get($IMPACT_TIME_DISTRIBUTION_DATA, ['status']) === 'success'}
      <div class="impact-time-chart">
        <LineDistributionChart
          {...distributionData}
          unit={$CURRENT_INDICATOR_UNIT}
        />
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
