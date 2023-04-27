<script>
  import LoadingWrapper from '$lib/helper/LoadingWrapper.svelte';

  import {
    CURRENT_GEOGRAPHY,
    CURRENT_INDICATOR,
    CURRENT_INDICATOR_OPTION_VALUES,
    CURRENT_SCENARIOS_UID,
    TEMPLATE_PROPS,
    URL_PARAMS,
    IS_COMBINATION_AVAILABLE,
    CURRENT_SCENARIOS,
  } from '$src/stores/state';
  import {
    IMPACT_GEO_YEARS,
    IMPACT_GEO_DISPLAY_OPTIONS,
    END_GEO_SHAPE,
    END_IMPACT_GEO,
    DEFAULT_IMPACT_GEO_YEAR,
  } from '$src/config.js';
  import { writable } from 'svelte/store';
  import { fetchData } from '$lib/api/api';
  import ChartFrame from '$lib/charts/ChartFrame/ChartFrame.svelte';

  import Controls from './Controls.svelte';
  import Maps from './Maps.svelte';
  import {
    getColorScale,
    coordinatesToRectGrid,
    calculateDifference,
    coordinatesToContours,
  } from '$utils/geo.js';
  import LoadingPlaceholder from '$lib/helper/LoadingPlaceholder.svelte';
  import { formatValue } from '$lib/utils/formatting';

  export let title;
  export let year = DEFAULT_IMPACT_GEO_YEAR;
  export let displayOption = 'side-by-side';

  let IMPACT_GEO_DATA = writable([]);
  let GEO_SHAPE_DATA = writable({});

  $: {
    // Reset year if the currently selected one is not available
    year =
      $CURRENT_SCENARIOS[0].timeframe[1] >= year
        ? year
        : DEFAULT_IMPACT_GEO_YEAR;
  }
  $: availableYears = IMPACT_GEO_YEARS.filter(
    (year) => year.uid <= $CURRENT_SCENARIOS[0].timeframe[1]
  );

  $: if ($IS_COMBINATION_AVAILABLE) {
    fetchData(
      IMPACT_GEO_DATA,
      $CURRENT_SCENARIOS_UID.map((scenario) => ({
        endpoint: END_IMPACT_GEO,
        params: {
          geography: $CURRENT_GEOGRAPHY.uid,
          indicator: $CURRENT_INDICATOR.uid,
          scenario,
          year,
          ...$CURRENT_INDICATOR_OPTION_VALUES,
        },
      }))
    );

    fetchData(GEO_SHAPE_DATA, {
      endpoint: END_GEO_SHAPE,
      params: {
        geography: $CURRENT_GEOGRAPHY.uid,
      },
    });
  }

  $: process = ({ data, shape }, { scenarios, urlParams }) => {
    const showDifference = data.length === 2 && displayOption === 'difference';
    const isMultipMap = data.length > 1 && !showDifference;

    // The data that is actually being rendered
    const renderedData = showDifference
      ? [calculateDifference(data)]
      : data.map((d, i) => ({
          ...(isMultipMap ? scenarios[i] : {}),
          ...d.data,
        }));

    const colorScale = getColorScale(renderedData.map((d) => d.data));

    const geoData = renderedData.map(
      ({ data, coordinatesOrigin: origin, resolution, ...d }) => {
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
      }
    );

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

    const downloadParams = [
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

    const downloadBaseParams = {
      ...urlParams,
      displayOption,
      year,
    };

    return {
      showDifference,
      geoData,
      geoShape: shape.data.data.features[0],
      title: data[0].data.title,
      description: data[0].data.description,
      colorScale,
      chartInfo,
      downloadBaseParams,
      downloadParams,
    };
  };
</script>

{#if $IS_COMBINATION_AVAILABLE}
  <LoadingWrapper
    let:asyncProps
    let:props
    asyncProps={{ data: $IMPACT_GEO_DATA, shape: $GEO_SHAPE_DATA }}
    props={{ ...$TEMPLATE_PROPS, year, urlParams: $URL_PARAMS }}
    {process}
    let:isLoading
  >
    <ChartFrame
      title={asyncProps.title}
      tagline={title}
      description={asyncProps.description}
      downloadParams={asyncProps.downloadParams}
      chartUid={END_IMPACT_GEO}
      downloadBaseParams={asyncProps.downloadBaseParams}
      templateProps={{ ...props, showDifference: asyncProps.showDifference }}
      chartInfo={asyncProps.chartInfo}
      {isLoading}
    >
      <svelte:fragment slot="controls">
        <Controls
          scenarios={props.scenarios}
          yearOptions={availableYears}
          displayOptions={IMPACT_GEO_DISPLAY_OPTIONS}
          bind:displayOption
          bind:year
        />
      </svelte:fragment>
      <Maps {...props} {...asyncProps} />
    </ChartFrame>
    <LoadingPlaceholder slot="placeholder" />
  </LoadingWrapper>
{/if}
