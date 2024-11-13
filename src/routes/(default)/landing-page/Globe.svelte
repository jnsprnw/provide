<script>
  import MapProvider from '$lib/MapboxMap/MapProvider.svelte';
  import { fetchData } from '$lib/api/api';
  import { writable } from 'svelte/store';
  import { END_IMPACT_GEO, END_GEO_SHAPE, URL_PATH_GEOGRAPHY, URL_PATH_INDICATOR, URL_PATH_SCENARIO, COLOR_SCALES } from '$config';
  import LoadingWrapper from '$lib/helper/LoadingWrapper.svelte';
  import MaMaskedData from './MaskedData.svelte';
  import Tabs from './Tabs.svelte';
  import { onDestroy } from 'svelte';
  import { coordinatesToRectGrid, getColorScale, coordinatesToContours } from '$lib/utils/geo';
  import mask from '@turf/mask';
  import centroid from '@turf/centroid';
  import { mapValues } from 'lodash-es';

  let _stories;
  export { _stories as stories };

  let stories = _stories;

  let currentIndex = 0;
  let allData = [];
  $: currentStory = stories[currentIndex];

  const zoomLevels = {
    admin0: 2.6,
    eez: 4,
    cities: 9,
  };

  let GEO_DATA = writable({});
  let GEO_SHAPE = writable({});

  // $: {
  //   // We request data for all available stories
  //   fetchData(
  //     GEO_DATA,
  //     stories.map(({ geography, indicator, scenarios }) => ({
  //       endpoint: END_IMPACT_GEO,
  //       params: {
  //         [URL_PATH_GEOGRAPHY]: geography.uid,
  //         [URL_PATH_INDICATOR]: indicator.uid,
  //         [URL_PATH_SCENARIO]: scenarios[0].uid,
  //         ...mapValues(indicator.parameters, (options) => options[0]),
  //       },
  //     }))
  //   );
  //   // We request shape files for all available stories
  //   fetchData(
  //     GEO_SHAPE,
  //     stories.map(({ geography }) => ({
  //       endpoint: END_GEO_SHAPE,
  //       params: {
  //         [URL_PATH_GEOGRAPHY]: geography.uid,
  //       },
  //     }))
  //   );
  // }

  $: {
    // We request data for all available stories

    fetchData(GEO_DATA, {
      endpoint: END_IMPACT_GEO,
      params: {
        [URL_PATH_GEOGRAPHY]: currentStory.geography.uid,
        [URL_PATH_INDICATOR]: currentStory.indicator.uid,
        [URL_PATH_SCENARIO]: currentStory.scenarios[0].uid,
        ...mapValues(currentStory.indicator.parameters, (options) => options[0]),
      },
    });
    // We request shape files for all available stories
    fetchData(GEO_SHAPE, {
      endpoint: END_GEO_SHAPE,
      params: {
        [URL_PATH_GEOGRAPHY]: currentStory.geography.uid,
      },
    });
  }

  $: process = ({ grid, shape }, { currentIndex, currentStory }) => {
    if (shape.length !== grid.length) {
      return [];
    }

    function processGrid(grid, shape) {
      //const shape = shapes[i]; // Grids and shapes are in the same order

      const { coordinatesOrigin: origin, resolution, data: gridData } = grid.data;
      const colorScale = getColorScale([gridData], COLOR_SCALES.simple);
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
    }

    if (!allData[currentIndex]) allData[currentIndex] = processGrid(grid, shape);

    return {
      data: allData,
      currentIndex,
      currentStory,
      currentZoomLevel: zoomLevels[currentStory.geographyType] ?? 2.6,
    };
  };

  const interval = setInterval(() => {
    currentIndex = currentIndex === stories.length - 1 ? 0 : currentIndex + 1;
  }, 5000);

  onDestroy(() => {
    clearInterval(interval);
  });

  function manualSelect({ detail }) {
    // The stories are numbered while the tabs use the geography type
    currentIndex = stories.findIndex(({ id }) => id === detail.id);
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
    <LoadingWrapper asyncProps={{ shape: $GEO_SHAPE, grid: $GEO_DATA }} props={{ currentIndex, currentStory }} {process} let:asyncProps warningBackground={false} warningInverted={true}>
      <MapProvider interactive={false} projection="globe" style={import.meta.env.VITE_MAPBOX_STYLE_GLOBE} center={asyncProps.data[asyncProps.currentIndex].center} zoom={asyncProps.currentZoomLevel}>
        {#each asyncProps.data as storyData}
          {#if storyData}
            <MaMaskedData geoShape={storyData.geoShape} geoData={storyData.geoData} />
          {/if}
        {/each}
      </MapProvider>
    </LoadingWrapper>
  </figure>

  <div class="col-span-5 row-start-1 row-span-6 col-start-1 z-20 h-1/2 self-end bg-gradient-to-t from-theme-stronger/90" aria-hidden role="presentation" />
  <div class="col-span-5 row-start-1 row-span-6 col-start-1 z-30 flex">
    <div class="w-full max-w-6xl mx-auto mt-[10vh] xs:mt-[5vh] md:mt-[7vh] lg:mt-[10vh] px-3 sn:px-8 md:px-12 flex flex-col justify-between">
      <header class="col-start-1 col-span-6 sm:col-span-5 md:col-span-5 lg:col-span-4 text-white max-w-3xl">
        <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 leading-none drop-shadow-ladingpage">A database for global-to-local climate impacts</h1>
        <p class="text-xl drop-shadow-ladingpage">Explore data across scales and sectors</p>
      </header>
      <div class="col-span-6 md:col-span-5 sm:col-span-5 lg:col-span-4 sm:col-start-2 md:col-start-2 lg:col-start-3 py-4 px-0 md:px-6 self-end max-w-3xl">
        <Tabs on:select={manualSelect} {currentStory} {stories} />
      </div>
    </div>
  </div>
</header>
