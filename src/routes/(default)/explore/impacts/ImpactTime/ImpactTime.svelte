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
  // test comment - test update
  $: $IS_COMBINATION_AVAILABLE &&
    fetchData(
      IMPACT_TIME_DATA,
      {
        endpoint: END_IMPACT_TIME,
        params: {
          geography: $CURRENT_GEOGRAPHY.uid,
          indicator: $CURRENT_INDICATOR.uid,
          scenarios: $CURRENT_SCENARIOS_UID,
          ...$CURRENT_INDICATOR_OPTION_VALUES,
        },
      }
    );

  $: process = ({ impactTimeData }, { scenarios, urlParams }) => {
    const MODEL = KEY_MODEL;
    const SOURCE = KEY_SOURCE;
    const { yearStart, yearStep, data, description, title, [MODEL]: model, [SOURCE]: source, parameters } = impactTimeData.data;


    const impactTime = scenarios.map((scenario, i) => {
      const scenarioData = data[scenario.uid];

      return {
        ...scenario,
        yearStart,
        yearStep,
        parameters,
        model,
        source,
        description,
        title,
        values: scenarioData.map((values, i) => {
          const gmt = scenario[MEAN_TEMPERATURE_UID][i].value;
          const wlvl = Math.round(gmt / 0.5) * 0.5;
          const [min, value, max] = values.sort(); // This values are not always in the correct order of min, average (?), max.
          return {
            gmt,
            wlvl,
            min,
            value,
            max,
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

    console.log(impactTime);

    const dataDownloadOptions = [
      {
        uid: 'scenario',
        label: 'Scenario',
        options: scenarios,
      },
      {
        uid: 'format',
        label: 'Format',
        options: (data.formats || ["json"]).map((uid) => ({
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
      <ImpactTimeChart data={asyncProps.impactTime} unit={props.indicator.unit.uid} />
    </ChartFrame>
    <LoadingPlaceholder slot="placeholder" />
  </LoadingWrapper>
{/if}
