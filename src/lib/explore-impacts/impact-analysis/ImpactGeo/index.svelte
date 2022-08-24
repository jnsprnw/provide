<script>
  import MapboxMap from '$lib/mapbox-map/index.svelte';
  import RasterLayer from '$lib/mapbox-map/RasterLayer.svelte';
  import Header from './Header.svelte';
  import Legend from './Legend.svelte';
  import { extent } from 'd3-array';
  import { scaleLinear } from 'd3-scale';
  import Mask from '$lib/mapbox-map/Mask.svelte';
  import LoadingWrapper from '$lib/helper/LoadingWrapper.svelte';
  import Spinner from '$lib/helper/Spinner.svelte';
  import {
    CURRENT_GEOGRAPHY,
    CURRENT_IMPACT_GEO_YEAR_UID,
    CURRENT_INDICATOR,
    CURRENT_INDICATOR_OPTIONS,
    CURRENT_INDICATOR_OPTION_VALUES,
    CURRENT_SCENARIOS,
    CURRENT_SCENARIOS_UID,
  } from '$lib/../stores/store';
  import { END_GEO_SHAPE, END_IMPACT_GEO } from '$lib/../config.js';
  import { writable } from 'svelte/store';
  import { dataPlease } from '$lib/api/new-api';

  let displayOption = 'side-by-side';

  let zoom;
  let center;
  let bounds;

  let IMPACT_GEO_DATA = writable([]);
  let GEO_SHAPE_DATA = writable({});

  $: dataPlease(
    IMPACT_GEO_DATA,
    $CURRENT_SCENARIOS_UID.map((scenario) => ({
      endpoint: END_IMPACT_GEO,
      params: {
        geography: $CURRENT_GEOGRAPHY.uid,
        indicator: $CURRENT_INDICATOR.uid,
        scenario,
        year: $CURRENT_IMPACT_GEO_YEAR_UID,
        ...$CURRENT_INDICATOR_OPTION_VALUES,
      },
    }))
  );

  $: dataPlease(GEO_SHAPE_DATA, {
    endpoint: END_GEO_SHAPE,
    params: {
      geography: $CURRENT_GEOGRAPHY.uid,
    },
  });

  $: process = ({ geoData, geoShape }, { currentScenarios }) => {
    const isDoubleMap = geoData.length === 2;
    const showDifference = displayOption === 'difference' && isDoubleMap;
    const isMultipMap = geoData.length > 1 && !showDifference;

    const calculateDifference = () => {
      const [grid1, grid2] = geoData;
      return {
        ...grid1.data,
        data: grid1.data.data.map((row, lngIndex) =>
          row.map((value, latIndex) =>
            value === null ? null : grid2.data.data[lngIndex][latIndex] - value
          )
        ),
      };
    };

    // The data that is actually being rendered
    const renderedData = showDifference
      ? [calculateDifference()]
      : geoData.map((d, i) => ({
          ...(isMultipMap ? currentScenarios[i] : {}),
          ...d.data,
        }));

    const colorScale = (() => {
      const sequentialPositiveRange = ['#F9CEA6', '#C91C1C'];
      const sequentialNegativeRange = ['#437E8E', '#DACFBF'];
      const divergingRange = ['#437E8E', '#F4E4D6', '#C91C1C'];
      let range;
      const flatData = renderedData.map((grid) => grid.data).flat(3);
      const domain = extent(flatData);
      const isSequential =
        (domain[0] >= 0 && domain[1] >= 0) || (domain[0] < 0 && domain[1] < 0);
      if (isSequential) {
        range =
          domain[0] >= 0 ? sequentialPositiveRange : sequentialNegativeRange;
      } else {
        range = divergingRange;
      }

      //[-x, 0, +x]
      //[-x, -x]
      //[+x, +x]
      return scaleLinear().domain(domain).range(range);
    })();

    return {
      showDifference,
      geoData: renderedData,
      geoShape: geoShape.data.data.features[0],
      colorScale,
    };
  };
</script>

<LoadingWrapper
  let:asyncProps
  let:props
  asyncProps={{ geoData: $IMPACT_GEO_DATA, geoShape: $GEO_SHAPE_DATA }}
  props={{
    currentYear: $CURRENT_IMPACT_GEO_YEAR_UID,
    currentGeography: $CURRENT_GEOGRAPHY,
    currentIndicator: $CURRENT_INDICATOR,
    currentOptions: $CURRENT_INDICATOR_OPTIONS,
    currentScenarios: $CURRENT_SCENARIOS,
  }}
  {process}
  let:isLoading
>
  <div class="wrapper grid">
    <div class="chart-info">
      <Header
        bind:displayOption
        showDifference={asyncProps.showDifference}
        {...props}
        data={asyncProps.geoData}
      />
    </div>
    <div class={`maps cols-${asyncProps.geoData.length}`}>
      {#each asyncProps.geoData as d}
        <div class="map-wrapper">
          <MapboxMap
            bind:zoom
            bind:center
            bind:bounds
            fitShape={asyncProps.geoShape}
            resize={asyncProps.geoData.length}
          >
            <Mask feature={asyncProps.geoShape} layerId="mask-layer" />
            <RasterLayer
              colorScale={asyncProps.colorScale}
              {...d}
              before="mask-layer"
            />
          </MapboxMap>
          {#if d.label}
            <div
              style="--color: {d.color};"
              class="text-underlined scenario-label"
            >
              {d.label}
            </div>
          {/if}
        </div>
      {/each}
    </div>
    <Spinner {isLoading} />
    <div class="legend">
      <Legend
        unit={props.currentIndicator.unit}
        scale={asyncProps.colorScale}
      />
    </div>
  </div>
</LoadingWrapper>

<style lang="scss">
  .chart-info {
    grid-column: 1 / -1;
  }
  .maps {
    grid-column: 1 / -1;
    position: relative;
    display: flex;

    &.cols-1 .map-wrapper {
      width: 100%;
    }

    &.cols-2 .map-wrapper {
      width: 50%;
    }

    &.cols-3 .map-wrapper {
      width: 33.333%;
    }
  }

  .map-wrapper {
    height: 600px;
    position: relative;
    border: 1px solid var(--color-foreground-weakest);

    &:not(:last-child) {
      border-right: none;
    }
  }

  .scenario-label {
    position: absolute;
    top: var(--space-xxs);
    left: var(--space-xs);
    background: var(--color-background-base);
    color: var(--color-text-weaker);
    font-size: var(--font-size-s);
  }

  .legend {
    grid-column: 1 / span 12;
    display: flex;
    justify-content: flex-end;
  }
</style>
