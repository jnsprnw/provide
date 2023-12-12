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

<figure class="h-[70vh] grid grid-cols-5 overflow-hidden bg-theme-stronger relative">
  <div class="col-span-3 row-start-1 col-start-1 h-[130%] bg-theme-strongest">
    <LoadingWrapper
      asyncProps={{ shape: $GEO_SHAPE, grid: $GEO_DATA }}
      {process}
      let:asyncProps
      warningBackground={false}
      warningInverted={true}
    >
      <MapProvider
        interactive={false}
        projection="globe"
        style="mapbox://styles/climateanalytics/clgxes1uo00c301qy9m8ubl5e"
        center={asyncProps.center}
        zoomRange={[1.9, 1.9]}
      >
        <DataSource data={asyncProps.mask}>
          <PolygonLayer
            before="ocean-fill"
            fillColor={$theme.color.surface.base}
            fill={true}
            fillId="mask"
            lineWidth={0.5}
            lineColor={$theme.color.contour.base}
          />
          <PolygonLayer
            before="ocean-fill"
            lineWidth={3}
            lineOffset={1.5}
            lineOpacity={0.07}
            lineColor={$theme.color.contour.base}
          />
        </DataSource>
        <DataSource data={asyncProps.data}>
          <PolygonLayer
            fill={true}
            line={false}
            before="mask"
          />
        </DataSource>
      </MapProvider>
    </LoadingWrapper>
  </div>
  <div class="col-span-3 row-start-1 col-start-1 z-10 h-1/2 self-end bg-gradient-to-t from-theme-stronger/60" />
  <figcaption class="pl-8 col-span-2 self-center col-start-4">
    <p class="text-3xl text-surface-base font-bold max-w-md leading-snug mb-12">
      How will {currentStory.indicator.label} in {currentStory.geography.emoji}&nbsp;{currentStory.geography.label} develop under a {currentStory.scenarios[0].label} scenario?
    </p>
    <a
      href={currentStory.url}
      class="bg-surface-base text-lg border text-theme-base rounded px-5 py-3">Find out more</a
    >
  </figcaption>
</figure>
