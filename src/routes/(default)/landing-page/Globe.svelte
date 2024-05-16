<script>
  import MapProvider from '$lib/MapboxMap/MapProvider.svelte';
  import { fetchData } from '$lib/api/api';
  import { writable } from 'svelte/store';
  import { END_IMPACT_GEO, END_GEO_SHAPE, URL_PATH_GEOGRAPHY, URL_PATH_INDICATOR, URL_PATH_SCENARIO, URL_PATH_YEAR } from '$config';
  import LoadingWrapper from '$lib/helper/LoadingWrapper.svelte';
  import MaMaskedData from './MaskedData.svelte';
  import Tabs from './Tabs.svelte';
  import { getContext, onDestroy } from 'svelte';
  import { coordinatesToRectGrid, getColorScale, coordinatesToContours } from '$lib/utils/geo';
  import mask from '@turf/mask';
  import centroid from '@turf/centroid';
  import { mapValues } from 'lodash-es';

  export let stories;

  const theme = getContext('theme');

  let currentIndex = 0;
  $: currentStory = stories[currentIndex];

  const zoomLevels = {
    admin0: 2.6,
    eez: 4,
    cities: 9,
  };

  $: currentZoomLevel = zoomLevels[currentStory.geographyType] ?? 2.6;

  let GEO_DATA = writable({});
  let GEO_SHAPE = writable({});

  $: {
    // We request data for all available stories
    fetchData(
      GEO_DATA,
      stories.map(({ geography, indicator, scenarios }) => ({
        endpoint: END_IMPACT_GEO,
        params: {
          [URL_PATH_GEOGRAPHY]: geography.uid,
          [URL_PATH_INDICATOR]: indicator.uid,
          [URL_PATH_SCENARIO]: scenarios[0].uid,
          ...mapValues(indicator.parameters, (options) => options[0]),
        },
      }))
    );
    // We request shape files for all available stories
    fetchData(
      GEO_SHAPE,
      stories.map(({ geography }) => ({
        endpoint: END_GEO_SHAPE,
        params: {
          [URL_PATH_GEOGRAPHY]: geography.uid,
        },
      }))
    );
  }

  $: process = ({ grids, shapes }) => {
    if (shapes.length !== grids.length) {
      return [];
    }
    return {
      data: grids.map((grid, i) => {
        const shape = shapes[i]; // Grids and shapes are in the same order

        const { coordinatesOrigin: origin, resolution, data: gridData } = grid.data;
        const colorScale = getColorScale([gridData], true);
        const cellCount = gridData.length * gridData[0].length;

        const geoData =
          cellCount > 10000
            ? coordinatesToContours(gridData, { resolution, origin, colorScale })
            : coordinatesToRectGrid(gridData, {
                origin,
                resolution,
                colorScale,
              });

        const geoShape = shape.data.data.features[0];

        return {
          mask: mask(shape.data.data),
          geoShape: geoShape,
          center: centroid(shape.data.data).geometry.coordinates,
          geoData: geoData,
        };
      }),
    };
  };

  const interval = setInterval(() => {
    currentIndex = currentIndex === stories.length - 1 ? 0 : currentIndex + 1;
  }, 10000);

  onDestroy(() => {
    clearInterval(interval);
  });

  function manualSelect({ detail }) {
    // The stories are numbered while the tabs use the geography type
    currentIndex = stories.findIndex(({ geographyType }) => geographyType === detail.id);
    clearInterval(interval); // Stop the interval
  }
</script>

<header class="h-[70vh] sm:h-[75vh] min-h-[400px] md:min-h-[600px] max-h-[750px] grid grid-rows-6 gap-x-6 gap-y-6 grid-cols-5 overflow-hidden bg-theme-stronger relative">
  <figure
    aria-hidden
    role="presentation"
    class="col-start-1 col-span-6 absolute top-[-50%] left-[-30%] w-[130%] h-[200%] z-10 to-transparent from-theme-base"
    style="background-image: radial-gradient(closest-side, var(--tw-gradient-from) 60%, var(--tw-gradient-to));"
  >
    <LoadingWrapper asyncProps={{ shapes: $GEO_SHAPE, grids: $GEO_DATA }} {process} let:asyncProps warningBackground={false} warningInverted={true}>
      <MapProvider interactive={false} projection="globe" style="mapbox://styles/climateanalytics/clqz980h0018301qwablpef7n" center={asyncProps.data[currentIndex].center} zoom={currentZoomLevel}>
        <!--<DataSource data={asyncProps.mask}>
          <PolygonLayer before="ocean-fill" fillColor={$theme.color.theme.stronger} fill={true} fillId="mask" lineWidth={0.5} lineColor={$theme.color.contour.base} />
          <PolygonLayer before="ocean-fill" lineWidth={3} lineOffset={1.5} lineOpacity={0.07} lineColor={$theme.color.theme.stronger} />
        </DataSource>-->
        {#each asyncProps.data as { geoShape, geoData }}
          <MaMaskedData {geoShape} {geoData} />
        {/each}
      </MapProvider>
    </LoadingWrapper>
  </figure>

  <div class="col-span-5 row-start-1 row-span-6 col-start-1 z-20 h-1/2 self-end bg-gradient-to-t from-theme-stronger/90" aria-hidden role="presentation" />
  <div class="col-span-5 row-start-1 row-span-6 col-start-1 z-30 flex items-center">
    <div class="max-w-6xl mx-auto px-3 sn:px-8 md:px-12 grid grid-cols-6 grid-rows-[auto_1fr] gap-y-24 md:gap-y-12">
      <header class="col-start-1 col-span-6 sm:col-span-5 md:col-span-5 lg:col-span-4 text-white">
        <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 leading-none drop-shadow-lg">A database for global-to-local climate impacts</h1>
        <p class="text-xl drop-shadow-md">Explore data across scales and sectors</p>
      </header>
      <div class="col-span-6 md:col-span-4 sm:col-span-4 lg:col-span-3 self-start sm:col-start-3 md:col-start-3 lg:col-start-4 py-2 px-0 md:px-6">
        <Tabs on:select={manualSelect} {currentStory} />
      </div>
    </div>
  </div>
</header>
