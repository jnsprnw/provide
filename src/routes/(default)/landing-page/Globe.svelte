<script>
  import MapProvider from '$lib/MapboxMap/MapProvider.svelte';
  import { fetchData } from '$lib/api/api';
  import { writable } from 'svelte/store';
  import { END_IMPACT_GEO, END_GEO_SHAPE, URL_PATH_GEOGRAPHY, URL_PATH_INDICATOR, URL_PATH_SCENARIO, URL_PATH_YEAR } from '$config';
  import LoadingWrapper from '$lib/helper/LoadingWrapper.svelte';
  import DataSource from '$lib/MapboxMap/DataSource.svelte';
  import PolygonLayer from '$lib/MapboxMap/PolygonLayer.svelte';
  import { getContext, onDestroy } from 'svelte';
  import { coordinatesToRectGrid, getColorScale } from '$lib/utils/geo';
  import mask from '@turf/mask';
  import centroid from '@turf/centroid';

  import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@rgossiaux/svelte-headlessui';

  export let stories;

  const theme = getContext('theme');

  let currentIndex = 0;
  $: currentStory = stories[currentIndex];

  let GEO_DATA = writable({});
  let GEO_SHAPE = writable({});

  $: {
    fetchData(GEO_DATA, {
      endpoint: END_IMPACT_GEO,
      params: {
        [URL_PATH_GEOGRAPHY]: currentStory.geography.uid,
        [URL_PATH_INDICATOR]: currentStory.indicator.uid,
        [URL_PATH_SCENARIO]: currentStory.scenarios[0].uid,
        [URL_PATH_YEAR]: 2050,
        'geography-type': 'admin0',
        time: 'annual',
        reference: 'present-day',
        spatial: 'area',
        frequency: 0.1,
      },
    });

    fetchData(GEO_SHAPE, {
      endpoint: END_GEO_SHAPE,
      params: {
        [URL_PATH_GEOGRAPHY]: currentStory.geography.uid,
      },
    });
  }

  $: process = ({ grid, shape }) => {
    const { coordinatesOrigin: origin, resolution, data: gridData } = grid.data;
    const colorScale = getColorScale([gridData]);
    const geoData = coordinatesToRectGrid(gridData, {
      origin,
      resolution,
      colorScale,
    });

    return {
      mask: mask(shape.data.data),
      center: centroid(shape.data.data).geometry.coordinates,
      data: geoData,
    };
  };

  const interval = setInterval(() => {
    currentIndex = currentIndex === stories.length - 1 ? 0 : currentIndex + 1;
  }, 5000);
  onDestroy(() => {
    clearInterval(interval);
  });
</script>

<header class="h-[70vh] max-h-[700px] grid grid-rows-6 gap-x-6 gap-y-6 grid-cols-5 overflow-hidden bg-theme-stronger relative">
  <figure
    aria-hidden
    role="presentation"
    class="col-start-1 col-span-3 absolute top-[-50%] left-[-30%] w-[130%] h-[200%] z-10 to-transparent from-theme-base"
    style="background-image: radial-gradient(closest-side, var(--tw-gradient-from) 60%, var(--tw-gradient-to));"
  >
    <LoadingWrapper asyncProps={{ shape: $GEO_SHAPE, grid: $GEO_DATA }} {process} let:asyncProps warningBackground={false} warningInverted={true}>
      <MapProvider interactive={false} projection="globe" style="mapbox://styles/climateanalytics/clqz980h0018301qwablpef7n" center={asyncProps.center} zoomRange={[2.6, 2.6]}>
        <DataSource data={asyncProps.mask}>
          <PolygonLayer before="ocean-fill" fillColor={$theme.color.theme.stronger} fill={true} fillId="mask" lineWidth={0.5} lineColor={$theme.color.contour.base} />
          <PolygonLayer before="ocean-fill" lineWidth={3} lineOffset={1.5} lineOpacity={0.07} lineColor={$theme.color.theme.stronger} />
        </DataSource>
        <DataSource data={asyncProps.data}>
          <PolygonLayer fill={true} line={false} before="mask" />
        </DataSource>
      </MapProvider>
    </LoadingWrapper>
  </figure>

  <div class="col-span-5 row-start-1 row-span-6 col-start-1 z-20 h-1/2 self-end bg-gradient-to-t from-theme-stronger/90" aria-hidden role="presentation" />
  <div class="col-span-5 row-start-1 row-span-6 col-start-1 z-30 flex">
    <div class="max-w-7xl mx-auto px-6 grid grid-cols-6 grid-rows-[auto_1fr] gap-y-12 my-20">
      <header class="col-start-1 col-span-4 text-white">
        <h1 class="text-6xl font-semibold">A database for global-to-local climate impacts</h1>
        <p class="text-xl">Explore data across scales and sectors. All based on the latest science</p>
      </header>
      <div class="col-span-3 self-center col-start-4 p-4 bg-white/10 border-white/40 border rounded-sm">
        <span class="font-bold text-xs uppercase text-sky-100 tracking-wider mb-2 block">Sectors</span>
        <TabGroup>
          <TabList class="grid grid-cols-3 gap-x-8 mb-4 text-white">
            <Tab class="flex flex-col items-start border-b-2 border-b-white">
              <strong class="text-xl">Climate</strong>
            </Tab>
            <Tab class="flex flex-col items-start">
              <strong class="text-xl">Ocean habitability</strong>
            </Tab>
            <Tab class="flex flex-col items-start">
              <strong class="text-xl">Urban heat stress</strong>
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel class="flex flex-col text-white">
              <span class="text-base mb-4">We cover data for all 190 countries in the world. Ranging from China to Lesotho. Lorem ipsum dolor something.</span>
              <a href={currentStory.url} class="">
                <span class="text-base text-surface-base max-w-md leading-snug">
                  Explore, for example, how {currentStory.indicator.labelWithinSentence} in {currentStory.geography.label} will develop under a {currentStory.scenarios[0].label} scenario.
                </span>
              </a>
            </TabPanel>
            <TabPanel>Content 2</TabPanel>
            <TabPanel>Content 3</TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
    </div>
  </div>
</header>
