<script>
  import {
    CURRENT_INDICATOR,
    CURRENT_GEOGRAPHY,
    TEMPLATE_PROPS,
    CURRENT_INDICATOR_OPTION_VALUES,
    CURRENT_SCENARIOS_UID,
    IS_COMBINATION_AVAILABLE,
    DOWNLOAD_URL_PARAMS,
    GRAPH_URL_PARAMS,
  } from '$stores/state.js';
  import { END_IMPACT_TIME, KEY_MODEL, KEY_SOURCE, URL_PATH_GEOGRAPHY, URL_PATH_INDICATOR, URL_PATH_SCENARIOS } from '$config';
  import LoadingWrapper from '$lib/helper/LoadingWrapper.svelte';
  import { writable } from 'svelte/store';
  import { fetchData } from '$lib/api/api';
  import { formatValue } from '$lib/utils/formatting';
  import ChartFrame from '$lib/charts/ChartFrame/ChartFrame.svelte';
  import ImpactTimeChart from './ImpactTimeChart.svelte';
  import { MEAN_TEMPERATURE_UID } from '$config';
  import LoadingPlaceholder from '$lib/helper/LoadingPlaceholder.svelte';
  import { scaleThreshold } from 'd3-scale';
  import { range } from 'd3-array';

  let IMPACT_TIME_DATA = writable([]);

  export let title;

  $: $IS_COMBINATION_AVAILABLE &&
    fetchData(IMPACT_TIME_DATA, {
      endpoint: END_IMPACT_TIME,
      params: {
        [URL_PATH_GEOGRAPHY]: $CURRENT_GEOGRAPHY.uid,
        [URL_PATH_INDICATOR]: $CURRENT_INDICATOR.uid,
        [URL_PATH_SCENARIOS]: $CURRENT_SCENARIOS_UID,
        ...$CURRENT_INDICATOR_OPTION_VALUES,
      },
    });

  // This is used for the coloring of the line according to the GMT
  const colorMarkers = [-Infinity, 1.5, 2, 2.5, Infinity];
  const colorSteps = scaleThreshold()
    .domain(colorMarkers)
    .range(range(0, 1, 1 / colorMarkers.length));

  $: process = ({ impactTimeData }, { scenarios, urlParams }) => {
    // Scenarios are coming from TEMPLATE_PROPS
    const MODEL = KEY_MODEL;
    const SOURCE = KEY_SOURCE;
    const { yearStart, yearStep, data, description, title, [MODEL]: model, [SOURCE]: source, parameters } = impactTimeData.data;
    const impactTime = scenarios.map((scenario) => {
      const scenarioData = data[scenario.uid]; // Data is coming from the impact time endpoint
      if (scenarioData.length !== scenario[MEAN_TEMPERATURE_UID].length) {
        console.warn(`Scenario data length does not match ${MEAN_TEMPERATURE_UID} length.`);
      }

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
          const year = yearStart + yearStep * i;
          let gmt = scenario[MEAN_TEMPERATURE_UID].find((d) => d.year === year)?.value; // We match try to find the gmt value based on the year
          if (typeof Boolean(gmt) === 'undefined') {
            console.warn(`Could not find matching GMT value for ${year} in ${scenario.uid}.`);
          }
          gmt = formatValue(gmt, 'degrees-warming'); // Use the same formatting
          const wlvl = parseFloat(gmt); // Use the same formatting
          const step = colorSteps(wlvl); // The step is calculated to better work with the colors
          // This values are not always in the correct order of min, average (?), max.
          // https://stackoverflow.com/a/7000895/2314684
          const [min, value, max] = values.sort((a, b) => a - b);
          return {
            gmt,
            wlvl,
            step,
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

    const dataDownloadOptions = [
      {
        uid: 'scenario',
        label: 'Scenario',
        options: scenarios,
      },
      {
        uid: 'format',
        label: 'Format',
        options: (data.formats || ['csv']).map((uid) => ({
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
      <ImpactTimeChart data={asyncProps.impactTime} unit={props.indicator.unit} indicatorLabel={props.indicatorLabel} steps={colorSteps} />
    </ChartFrame>
    <LoadingPlaceholder slot="placeholder" />
  </LoadingWrapper>
{/if}
