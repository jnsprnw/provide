<script>
  import {
    CURRENT_INDICATOR,
    CURRENT_INDICATOR_UID,
    CURRENT_GEOGRAPHY,
    TEMPLATE_PROPS,
    CURRENT_INDICATOR_OPTION_VALUES,
    CURRENT_SCENARIOS_UID,
    IS_COMBINATION_AVAILABLE,
    DOWNLOAD_URL_PARAMS,
    GRAPH_URL_PARAMS,
  } from '$stores/state.js';
  import { END_IMPACT_TIME, KEY_MODEL, KEY_SOURCE } from '$src/config.js';
  import LoadingWrapper from '$lib/helper/LoadingWrapper.svelte';
  import { writable } from 'svelte/store';
  import { fetchData } from '$lib/api/api';
  import ChartFrame from '$lib/charts/ChartFrame/ChartFrame.svelte';
  import ImpactTimeChart from './ImpactTimeChart.svelte';
  import { MEAN_TEMPERATURE_UID } from '$config';
  import LoadingPlaceholder from '$lib/helper/LoadingPlaceholder.svelte';

  let IMPACT_TIME_DATA = writable([]);

  export let title;
  // test comment
  $: $IS_COMBINATION_AVAILABLE &&
    fetchData(
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

  $: process = ({ impactTimeData }, { scenarios, graphParams, urlParams }) => {
    const impactTime = impactTimeData.map((datum, i) => {
      const MODEL = KEY_MODEL;
      const SOURCE = KEY_SOURCE;
      const {
        yearStart,
        yearStep,
        data,
        description,
        title,
        [MODEL]: model,
        [SOURCE]: source,
        parameters,
      } = datum.data;
      const indicatorData = data[$CURRENT_INDICATOR_UID];
      const scenario = scenarios[i];

      return {
        ...scenario,
        yearStart,
        yearStep,
        parameters,
        model,
        source,
        description,
        title,
        values: indicatorData.map((values, i) => {
          const gmt = scenario[MEAN_TEMPERATURE_UID][i].value;
          const wlvl = Math.round(gmt / 0.5) * 0.5;
          return {
            gmt,
            wlvl,
            min: values[0],
            value: values[1],
            max: values[2],
            year: yearStart + yearStep * i,
          };
        }),
      };
    });

    const hasSingleScenario = impactTimeData.length === 1;
    const chartInfo = [
      { label: 'Model', value: impactTime[0].model },
      { label: 'Source', value: impactTime[0].source },
      {
        label: 'Time resolution',
        value: `${impactTime[0].yearStep} years`,
      },
    ];

    const dataDownloadOptions = [
      {
        uid: 'scenario',
        label: 'Scenario',
        options: scenarios,
      },
      {
        uid: 'format',
        label: 'Format',
        options: impactTimeData[0].data.formats.map((uid) => ({
          label: uid,
          uid,
        })),
      },
    ];

    const graphDownloadParams = {
      ...urlParams,
      scenarios: scenarios.map((d) => d.uid),
    };
    return {
      impactTime,
      title: impactTime[0].title,
      description: impactTime[0].description,
      hasSingleScenario,
      chartInfo,
      dataDownloadOptions,
      dataDownloadParams: urlParams,
      graphDownloadParams,
    };
  };
</script>

{#if $IS_COMBINATION_AVAILABLE}
  <LoadingWrapper
    {process}
    let:asyncProps
    let:props
    asyncProps={{
      impactTimeData: $IMPACT_TIME_DATA,
    }}
    props={{
      ...$TEMPLATE_PROPS,
      graphParams: $GRAPH_URL_PARAMS,
      urlParams: $DOWNLOAD_URL_PARAMS,
    }}
  >
    <ChartFrame
      title={asyncProps.title}
      tagline={title}
      description={asyncProps.description}
      dataDownloadParams={asyncProps.dataDownloadParams}
      dataDownloadOptions={asyncProps.dataDownloadOptions}
      graphDownloadParams={asyncProps.graphDownloadParams}
      chartUid={END_IMPACT_TIME}
      chartInfo={asyncProps.chartInfo}
      templateProps={props}
    >
      <ImpactTimeChart
        data={asyncProps.impactTime}
        unit={props.indicator.unit.uid}
      />
    </ChartFrame>
    <LoadingPlaceholder slot="placeholder" />
  </LoadingWrapper>
{/if}
