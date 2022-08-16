<script>
  import MapboxMap from '$lib/mapbox-map/index.svelte';
  import RasterLayer from '$lib/mapbox-map/RasterLayer.svelte';
  import Header from './Header.svelte';
  import { IMPACT_GEO_DATA } from '$stores/impact-geo.js';
  import { GEO_SHAPE_DATA } from '$stores/geo-shape.js';
  import { extent } from 'd3-array';
  import { scaleLinear } from 'd3-scale';
  import { getContext } from 'svelte';
  import Mask from '$lib/mapbox-map/Mask.svelte';
  import LoadingWrapper from '$lib/helper/LoadingWrapper.svelte';
  import Spinner from '$lib/helper/Spinner.svelte';
  import {
    CURRENT_GEOGRAPHY,
    CURRENT_IMPACT_GEO_YEAR_UID,
    CURRENT_INDICATOR,
    CURRENT_INDICATOR_OPTIONS,
    CURRENT_SCENARIOS,
  } from '$lib/../stores/store';
  const theme = getContext('theme');
  let displayOption = 'side-by-side';

  let zoom;
  let center;
  let bounds;

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
      let domain = [0, 1];
      let range = [$theme.color.category[5], $theme.color.category[3]];
      let flatData = renderedData.map((grid) => grid.data).flat(3);
      domain = extent(flatData);
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
  <div slot="placeholder" class="placeholder">Loading</div>
  <Header
    bind:displayOption
    showDifference={asyncProps.showDifference}
    {...props}
    data={asyncProps.geoData}
    resolution={asyncProps.geoData[0].resolution}
  />
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
    <Spinner {isLoading} />
  </div>
</LoadingWrapper>

<style lang="scss">
  .placeholder {
    height: 400px;
    background: var(--color-foreground-weakest);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .maps {
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
</style>
