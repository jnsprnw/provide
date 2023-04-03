<script>
  import FillLayer from '$lib/MapboxMap/FillLayer.svelte';
  import Header from './Header.svelte';
  import syncMaps from '@mapbox/mapbox-gl-sync-move';
  import Legend from './Legend.svelte';
  import { extent } from 'd3-array';
  import { scaleLinear } from 'd3-scale';
  import mask from '@turf/mask';
  import LoadingWrapper from '$lib/helper/LoadingWrapper.svelte';
  import Spinner from '$lib/helper/Spinner.svelte';
  import {
    CURRENT_GEOGRAPHY,
    CURRENT_IMPACT_GEO_YEAR_UID,
    CURRENT_INDICATOR,
    CURRENT_INDICATOR_OPTION_VALUES,
    CURRENT_SCENARIOS_UID,
    TEMPLATE_PROPS,
  } from '$src/stores/state';
  import { END_GEO_SHAPE, END_IMPACT_GEO } from '$src/config.js';
  import { writable } from 'svelte/store';
  import { fetchData } from '$lib/api/api';
  import { interpolateLab } from 'd3-interpolate';
  import ChartFrame from '$lib/charts/ChartFrame.svelte';
  import { coordinatesToRectGrid } from '$utils/geo.js';
  import MapProvider from '$lib/MapboxMap/MapProvider.svelte';
  import DataSource from '$lib/MapboxMap/DataSource.svelte';
  import bbox from '@turf/bbox';
  import Template from '$lib/helper/Template.svelte';

  let displayOption = 'side-by-side';

  let maps = [];
  // Needed to properly update the sync map thing
  $: {
    const newMaps = maps.slice(0);
    syncMaps(newMaps);
  }

  const POSITIVE_RANGE = ['#F9CEA6', '#C91C1C'];
  const NEGATIVE_RANGE = ['#437E8E', '#DACFBF'];
  const DIVERGING_RANGE = ['#437E8E', '#F4E4D6', '#C91C1C'];

  let IMPACT_GEO_DATA = writable([]);
  let GEO_SHAPE_DATA = writable({});

  $: fetchData(
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

  $: fetchData(GEO_SHAPE_DATA, {
    endpoint: END_GEO_SHAPE,
    params: {
      geography: $CURRENT_GEOGRAPHY.uid,
    },
  });

  $: process = ({ data, shape }, { currentScenarios }) => {
    const isDoubleMap = data.length === 2;
    const showDifference = displayOption === 'difference' && isDoubleMap;
    const isMultipMap = data.length > 1 && !showDifference;

    const calculateDifference = () => {
      const [grid1, grid2] = data;
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
      : data.map((d, i) => ({
          ...(isMultipMap ? currentScenarios[i] : {}),
          ...d.data,
        }));

    const colorScale = (() => {
      let range;
      const flatData = renderedData.map((grid) => grid.data).flat(3);
      let domain = extent(flatData);
      let [min, max] = domain;
      // Include 0 values to prevent dividing by zero when creating a diverging scale
      const isSequential = (min >= 0 && max >= 0) || (min <= 0 && max <= 0);
      if (isSequential) {
        range = min >= 0 ? POSITIVE_RANGE : NEGATIVE_RANGE;
      } else {
        // Is positive extent bigger than negative? Every calculation later on depends on this
        const leansPositive = Math.abs(min) <= max;
        // Set min/max extents according to which side the scale leans
        const maxExtent = leansPositive ? max : min;
        const minExtent = leansPositive ? min : max;
        const extentRatio = Math.abs(minExtent / maxExtent);
        // Color for the side that extends fully
        const maxColor = leansPositive
          ? DIVERGING_RANGE[2]
          : DIVERGING_RANGE[0];
        // Color for the side that gets cut somwhere
        const fullMinColor = leansPositive
          ? DIVERGING_RANGE[0]
          : DIVERGING_RANGE[2];
        // Find color at the correct ratio
        const minRange = scaleLinear()
          .domain([0, minExtent])
          .range([DIVERGING_RANGE[1], fullMinColor])(extentRatio * minExtent);

        range = leansPositive
          ? [minRange, DIVERGING_RANGE[1], maxColor]
          : [maxColor, DIVERGING_RANGE[1], minRange];
        domain = leansPositive
          ? [minExtent, 0, maxExtent]
          : [maxExtent, 0, minExtent];
      }

      return scaleLinear()
        .interpolate(interpolateLab)
        .domain(domain)
        .range(range);
    })();

    const geoData = renderedData.map(
      ({ data, coordinatesOrigin, resolution, ...d }) => ({
        ...d,
        data: coordinatesToRectGrid(data, {
          origin: coordinatesOrigin,
          resolution,
          colorScale,
        }),
      })
    );

    return {
      showDifference,
      geoData,
      geoShape: shape.data.data.features[0],
      colorScale,
    };
  };

  const title =
    'Change in {{indicator.label}} in {{geography.label}} in {{year}}';

  const description =
    'This map shows the change in {{indicator.label}} (expressed in {{indicatorUnit.labelLong}}) in {{geography.label}} in {{year}} compared to the reference period {{indicatorOptions.reference.label}}.';
</script>

<LoadingWrapper
  let:asyncProps
  let:props
  asyncProps={{ data: $IMPACT_GEO_DATA, shape: $GEO_SHAPE_DATA }}
  props={$TEMPLATE_PROPS}
  {process}
  let:isLoading
>
  <ChartFrame {title} {description} templateProps={props}>
    <div class={`maps cols-${asyncProps.geoData.length}`}>
      {#key asyncProps.geoData.length}
        {#each asyncProps.geoData as d, i}
          <div class="map-wrapper">
            <span class="chart-message">Preliminary results</span>
            <MapProvider bind:map={maps[i]} bounds={bbox(asyncProps.geoShape)}>
              <DataSource data={mask(asyncProps.geoShape)}>
                <FillLayer before="water" id="mask-layer" fillColor="#fff" />
              </DataSource>
              <DataSource data={d.data}>
                <FillLayer before="mask-layer" />
              </DataSource>
            </MapProvider>
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
      {/key}
    </div>
    <Spinner {isLoading} />
    <div class="legend">
      <Legend unit={props.indicator.unit} scale={asyncProps.colorScale} />
    </div>
  </ChartFrame>
  <!-- <div class="chart-info">
      <Header
        bind:displayOption
        showDifference={asyncProps.showDifference}
        {...props}
        data={asyncProps.geoData}
      />
    </div> -->
</LoadingWrapper>

<style lang="postcss">
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

  .chart-message {
    top: 10px;
    left: 10px;
    position: absolute;
    z-index: 1;
  }
</style>
