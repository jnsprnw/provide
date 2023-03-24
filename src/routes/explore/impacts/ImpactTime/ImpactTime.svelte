<script>
  import {
    CURRENT_INDICATOR,
    CURRENT_INDICATOR_UID,
    CURRENT_GEOGRAPHY,
    CURRENT_SCENARIOS,
    CURRENT_INDICATOR_OPTIONS,
    CURRENT_INDICATOR_OPTION_VALUES,
    CURRENT_SCENARIOS_UID,
  } from '$stores/state.js';
  import { END_IMPACT_TIME, KEY_MODEL, KEY_SOURCE } from '$src/config.js';
  import LineTimeSeries from '$lib/charts/LineTimeSeries.svelte';

  import TitleTimeSeries from './TitleTimeSeries.svelte';
  import DescriptionTimeSeries from './DescriptionTimeSeries.svelte';
  import ChartFacts from '$lib/helper/chart-description/ChartFacts.svelte';
  import ChartMetaList from '$lib/helper/chart-description/ChartMetaList.svelte';
  import ResolutionTime from './ResolutionTime.svelte';
  import LoadingWrapper from '$lib/helper/LoadingWrapper.svelte';
  import { writable } from 'svelte/store';
  import { fetchData } from '$lib/api/api';
  import ChartFrame from '$lib/charts/ChartFrame.svelte';

  let IMPACT_TIME_DATA = writable([]);

  $: fetchData(
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

  $: process = ({ impactTimeData }, { scenarios }) => {
    const impactTime = impactTimeData.map((datum, i) => {
      const MODEL = KEY_MODEL;
      const SOURCE = KEY_SOURCE;
      const {
        yearStart,
        yearStep,
        data,
        [MODEL]: model,
        [SOURCE]: source,
        parameters,
      } = datum.data;
      const indicatorData = data[$CURRENT_INDICATOR_UID];

      return {
        color: scenarios[i].color,
        yearStart,
        yearStep,
        parameters,
        model,
        source,
        strokeWidth: 3,
        values: indicatorData.map((values, i) => ({
          min: values[0],
          value: values[1],
          max: values[2],
          year: yearStart + yearStep * i,
        })),
      };
    });

    const hasSingleScenario = impactTimeData.length === 1;

    return { impactTime, hasSingleScenario };
  };

  const description = `This graph shows how changes in {indicator.label} (expressed in {unit.label}) will play out over time in 
  {geography.label} compared to the reference period {referencePeriod.label}, according to the selected scenario. The line indicates 
  the median estimate for this scenario`;
</script>

<LoadingWrapper
  {process}
  let:asyncProps={{
    impactTime,
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
  }}
  props={{
    indicator: $CURRENT_INDICATOR,
    scenarios: $CURRENT_SCENARIOS,
    geography: $CURRENT_GEOGRAPHY,
    parameters: $CURRENT_INDICATOR_OPTIONS,
  }}
>
  <ChartFrame
    title={'Development of {indicator.label} until {timeFrame.label}'}
    {description}
  >
    <div class="aspect-video">
      <LineTimeSeries
        yLabel={indicator.label}
        data={impactTime}
        unit={indicator.unit.uid}
      />
    </div>
  </ChartFrame>
  <!-- <div class="chart-info">
      <TitleTimeSeries
        {indicator}
        {geography}
        {hasSingleScenario}
        impactTimeData={impactTime}
      />
      <DescriptionTimeSeries {indicator} {geography} {scenarios} {parameters} />

      <ChartFacts>
        <ResolutionTime {hasSingleScenario} impactTimeData={impactTime} />
        <ChartMetaList data={impactTime.map((d) => d.model)} term="Model" />
        <ChartMetaList data={impactTime.map((d) => d.source)} term="Source" />
      </ChartFacts>
    </div> -->
</LoadingWrapper>
