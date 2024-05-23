<script>
  import LoadingWrapper from '$lib/helper/LoadingWrapper.svelte';

  import {
    CURRENT_GEOGRAPHY,
    CURRENT_INDICATOR,
    CURRENT_INDICATOR_OPTION_VALUES,
    CURRENT_SCENARIOS_UID,
    TEMPLATE_PROPS,
    DOWNLOAD_URL_PARAMS,
    IS_COMBINATION_AVAILABLE,
    CURRENT_SCENARIOS,
  } from '$src/stores/state';
  import {
    URL_PATH_SCENARIO,
    URL_PATH_YEAR,
    URL_PATH_INDICATOR,
    IMPACT_GEO_YEARS,
    IMPACT_GEO_DISPLAY_OPTIONS,
    END_GEO_SHAPE,
    END_IMPACT_GEO,
    DEFAULT_IMPACT_GEO_YEAR,
    URL_PATH_GEOGRAPHY_TYPE,
    URL_PATH_GEOGRAPHY,
    URL_PATH_SCENARIOS,
    IMPACT_GEO_KEY_DIFFERENCE,
    IMPACT_GEO_KEY_SIDE_BY_SIDE,
    GEOGRAPHY_TYPE_CITY,
  } from '$config';
  import { writable } from 'svelte/store';
  import { fetchData } from '$lib/api/api';
  import { extractTimeframe } from '$utils/meta.js';
  import ChartFrame from '$lib/charts/ChartFrame/ChartFrame.svelte';

  import Controls from './Controls.svelte';
  import Maps from './Maps.svelte';
  import LinkSection from './LinkSection.svelte';
  import { getColorScale, coordinatesToRectGrid, calculateDifference, coordinatesToContours } from '$utils/geo.js';
  import LoadingPlaceholder from '$lib/helper/LoadingPlaceholder.svelte';
  import { formatValue } from '$lib/utils/formatting';
  import { isObject, isString, has } from 'lodash-es';

  export let tagline;
  export let year = DEFAULT_IMPACT_GEO_YEAR;
  export let displayOption = IMPACT_GEO_KEY_SIDE_BY_SIDE;
  export let showSatellite = false;
  export let showSatelliteOption = true;

  let isProcessing = false;

  let IMPACT_GEO_DATA = writable([]);
  let GEO_SHAPE_DATA = writable({});

  $: {
    // Reset year if the currently selected one is not available
    year = extractTimeframe($CURRENT_SCENARIOS[0]) >= year ? year : DEFAULT_IMPACT_GEO_YEAR;
  }
  $: availableYears = IMPACT_GEO_YEARS.filter((year) => year.uid <= extractTimeframe($CURRENT_SCENARIOS[0]));

  $: if ($IS_COMBINATION_AVAILABLE) {
    fetchData(
      IMPACT_GEO_DATA,
      $CURRENT_SCENARIOS_UID.map((scenario) => ({
        endpoint: END_IMPACT_GEO,
        params: {
          [URL_PATH_GEOGRAPHY]: $CURRENT_GEOGRAPHY.uid,
          [URL_PATH_GEOGRAPHY_TYPE]: $CURRENT_GEOGRAPHY.geographyType,
          [URL_PATH_INDICATOR]: $CURRENT_INDICATOR.uid,
          [URL_PATH_SCENARIO]: scenario,
          [URL_PATH_SCENARIOS]: $CURRENT_SCENARIOS_UID,
          [URL_PATH_YEAR]: year,
          ...$CURRENT_INDICATOR_OPTION_VALUES,
        },
      }))
    );

    fetchData(GEO_SHAPE_DATA, {
      endpoint: END_GEO_SHAPE,
      params: {
        [URL_PATH_GEOGRAPHY]: $CURRENT_GEOGRAPHY.uid,
      },
    });
  }

  $: process = ({ data, shape }, { scenarios, urlParams, geography }) => {
    isProcessing = true;
    const showDifference = data.length === 2 && displayOption === IMPACT_GEO_KEY_DIFFERENCE;
    const isMultipMap = data.length > 1 && !showDifference;

    if (geography.geographyType !== GEOGRAPHY_TYPE_CITY) {
      showSatelliteOption = false;
      showSatellite = false;
    } else {
      showSatelliteOption = true;
    }

    // The data that is actually being rendered
    const renderedData = showDifference
      ? [calculateDifference(data)]
      : data.map((d, i) => ({
          ...(isMultipMap ? scenarios[i] : {}),
          ...d.data,
        }));

    const colorScale = getColorScale(renderedData.map((d) => d.data));

    const geoData = renderedData.map(({ data, coordinatesOrigin: origin, resolution, ...d }) => {
      const cellCount = data.length * data[0].length;
      const geoData =
        cellCount > 10000
          ? coordinatesToContours(data, { resolution, origin, colorScale })
          : coordinatesToRectGrid(data, {
              origin,
              resolution,
              colorScale,
            });
      return {
        ...d,
        data: geoData,
      };
    });

    const { model, source, resolution } = data[0].data;
    const formattedResolution = formatValue(resolution, 'degree', {
      addSuffix: false,
    });
    const chartInfo = [
      { label: 'Model', value: model },
      { label: 'Source', value: source },
      {
        label: 'Spatial resolution',
        value: `${formattedResolution} × ${formattedResolution}°`,
      },
    ];

    const dataDownloadOptions = [
      {
        uid: 'scenario',
        label: 'Scenario',
        options: scenarios,
      },
      {
        uid: 'resolution',
        label: 'Resolution',
        options: data[0].data.resolutions.map((uid) => ({ label: uid, uid })),
      },
      {
        uid: 'format',
        label: 'Format',
        options: data[0].data.formats.map((uid) => ({ label: uid, uid })),
      },
    ];

    const dataDownloadParams = {
      ...urlParams,
      displayOption,
      year,
    };

    const graphDownloadParams = {
      ...dataDownloadParams,
      scenarios: scenarios.map((d) => d.uid),
    };

    const geoShape = shape.data.data.features.find((feature) => feature.properties.uid === urlParams.geography) ?? shape.data.data.features[0];

    // // In some cases, the API provides descriptions for each threshold
    const rawDesciption = data[0].data.description; // The descriptions for all scenarios are the same.
    let description;
    if (isObject(rawDesciption) && has(rawDesciption, displayOption)) {
      description = rawDesciption[displayOption];
    } else if (isString(rawDesciption)) {
      description = rawDesciption;
    }

    return {
      showDifference,
      geoData,
      geoShape: geoShape, // shape.data.data.features[0],
      title: data[0].data.title,
      description,
      colorScale,
      chartInfo,
      dataDownloadParams,
      dataDownloadOptions,
      graphDownloadParams,
    };
  };
</script>

{#if $IS_COMBINATION_AVAILABLE}
  <LoadingWrapper
    let:asyncProps
    let:props
    asyncProps={{ data: $IMPACT_GEO_DATA, shape: $GEO_SHAPE_DATA }}
    props={{ ...$TEMPLATE_PROPS, year, urlParams: $DOWNLOAD_URL_PARAMS }}
    {process}
    let:isLoading
  >
    <ChartFrame
      title={asyncProps.title}
      {tagline}
      description={asyncProps.description}
      dataDownloadOptions={asyncProps.dataDownloadOptions}
      dataDownloadParams={asyncProps.dataDownloadParams}
      graphDownloadParams={asyncProps.graphDownloadParams}
      graphDownloadSettings={{
        formats: ['png'],
        processingIntensity: asyncProps.geoData.length * 4,
      }}
      chartUid={END_IMPACT_GEO}
      templateProps={{ ...props, showDifference: asyncProps.showDifference }}
      chartInfo={asyncProps.chartInfo}
      {isLoading}
      {isProcessing}
    >
      <svelte:fragment slot="controls">
        <Controls scenarios={props.scenarios} yearOptions={availableYears} displayOptions={IMPACT_GEO_DISPLAY_OPTIONS} {showSatelliteOption} bind:showSatellite bind:displayOption bind:year />
      </svelte:fragment>
      <Maps bind:isProcessing unit={props.indicator.unit} geoData={asyncProps.geoData} geoShape={asyncProps.geoShape} colorScale={asyncProps.colorScale} {showSatellite} />
    </ChartFrame>
    <LinkSection geography={$CURRENT_GEOGRAPHY} />
    <LoadingPlaceholder slot="placeholder" />
  </LoadingWrapper>
{/if}
