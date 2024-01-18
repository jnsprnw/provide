<script>
  import mask from '@turf/mask';
  import syncMaps from '@mapbox/mapbox-gl-sync-move';
  import Legend from './Legend.svelte';
  import MapProvider from '$lib/MapboxMap/MapProvider.svelte';
  import DataSource from '$lib/MapboxMap/DataSource.svelte';
  import bbox from '@turf/bbox';
  import { getContext } from 'svelte';
  import FilterLayer from '$lib/MapboxMap/FilterLayer.svelte';
  import PolygonLayer from '$lib/MapboxMap/PolygonLayer.svelte';
  import InteractivityOverlay from './InteractivityOverlay.svelte';
  import { median } from 'd3-array';
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import { STATUS_IDLE, STATUS_PROCESSING, STATUS_FAILED } from '$config';
  import Spinner from '$lib/helper/Spinner.svelte';
  import { reduce } from 'lodash-es';

  export let geoData;
  export let geoShape;
  export let colorScale;
  export let unit;

  let status = STATUS_IDLE;

  let mapMasker;
  let max = 0;
  let current = 0;

  async function initGeoMasker() {
    if (mapMasker) {
      return true;
    }
    if (browser) {
      // prevent the script from being executed server-side
      if (window.Worker) {
        const MyWorker = await import('$lib/workers/geomask.js?worker');
        mapMasker = new MyWorker.default();

        mapMasker.onmessage = function (e) {
          const { data, max: m, current: c } = e.data;
          if (data?.length) {
            maskedGeoData = data;
            status = STATUS_IDLE;
          }
          if (c && m) {
            current = c;
            max = m;
          }
        };
        return true;
      }
    }
    return false;
  }

  onMount(async () => {
    initGeoMasker();
  });

  let maps = [];
  const theme = getContext('theme');
  // Needed to properly update the sync map thing
  $: {
    const newMaps = maps.slice(0);
    syncMaps(newMaps);
  }

  async function createMaske(geoData, geoShape) {
    status = STATUS_PROCESSING;
    const hasWorker = await initGeoMasker();
    if (hasWorker) {
      // We need to rebuild the geoData to only include the needed and plain data that can be stringified in the web worker message
      const plainGeoData = geoData.map(({ data, label }) => ({ features: data.features, label }));
      mapMasker.postMessage({ geoData: plainGeoData, geoShape });
    } else {
      status = STATUS_FAILED;
    }
  }

  function invertShape(geoShape) {
    try {
      return mask(geoShape);
    } catch (error) {
      console.warn(`Invalid geoShape`);
      // console.log({ geoShape });
      return undefined;
    }
  }

  $: createMaske(geoData, geoShape);

  let maskedGeoData = [];
  // $: console.log({ geoShape }, isValid(geoShape));
  $: invertedGeoShape = invertShape(geoShape);
  let interactive = false;
  $: aspectRatio = {
    '1': 'aspect-[1.3]',
    '2': 'aspect-[1.5]',
    '3': 'aspect-[1.7]',
  }[geoData.length];

  $: domainMedian = median(colorScale.domain());
  $: mediumColor = colorScale(domainMedian);

  $: paint = [];

  // $: paint = [
  //   'settlement-minor-label',
  //   'settlement-major-label',
  //   'settlement-subdivision-label',
  //   'airport-label',
  //   'water-point-label',
  //   'water-line-label',
  //   'natural-point-label',
  //   'natural-line-label',
  //   'waterway-label',
  //   'road-label-simple',
  // ].map((uid) => {
  //   return {
  //     uid,
  //     properties: [
  //       {
  //         uid: 'text-halo-color',
  //         value: mediumColor,
  //       },
  //       {
  //         uid: 'text-color',
  //         value: '#ffffff',
  //       },
  //     ],
  //   };
  // });
  //
  let label;

  $: size = reduce(geoShape.geometry.coordinates, (sum, n) => sum + reduce(n, (s, m) => s + m.length, 0), 0);

  $: switch (status) {
    case STATUS_PROCESSING:
      label = `Processing data with ${size} coordinates. Please wait.`;
      break;
    case STATUS_FAILED:
      label = 'Error occured while processing the data.';
      break;
  }
</script>

<div class={`${aspectRatio} flex cols-${geoData.length} gap-x-[1px] animate-defer-visibility relative rounded border border-contour-weakest`}>
  <div class="flex items-center absolute bottom-2 right-2 py-2 px-2 bg-surface-base z-10 shadow-sm rounded-sm">
    <Legend {unit} scale={colorScale} />
  </div>
  {#if status !== STATUS_IDLE}
    <div class="rounded flex items-center justify-center absolute top-0 left-0 w-full h-full py-2 px-2 bg-surface-base z-10">
      <div class="flex justify-center flex-col gap-y-4">
        {#if status === STATUS_PROCESSING}<Spinner size={15} strokeWidth={2} />{/if}
        <span class="text-xs text-contour-weak">{label}</span>
        {#if status === STATUS_PROCESSING}<progress {max} value={current}>{(100 / max) * current}%</progress>{/if}
      </div>
    </div>
  {/if}
  {#key maskedGeoData.length}
    {#each maskedGeoData as { data, label }, i}
      <div
        class:rounded-l={maskedGeoData.length === 1 || i === 0}
        class:rounded-r={maskedGeoData.length === 1 || i === maskedGeoData.length - 1}
        class:border-r-1={maskedGeoData.length > 1 && i !== maskedGeoData.length - 1}
        class="w-full border-contour-weakest overflow-hidden relative"
      >
        <MapProvider bind:map={maps[i]} bounds={bbox(geoShape)} {interactive} {paint} hideLogo={i > 0}>
          {#if invertedGeoShape}
            <DataSource data={invertedGeoShape}>
              <!--<PolygonLayer before="ocean-fill" fillColor={'#fafafa'} fill={true} fillId="mask" lineWidth={0.5} lineColor={$theme.color.contour.base} />-->
              <PolygonLayer before="ocean-fill" lineWidth={3} lineOffset={1.5} lineOpacity={0.07} lineColor={$theme.color.contour.base} />
              <!--<FilterLayer layer="settlement-minor-label" geo={geoShape} />-->
              <FilterLayer layer="settlement-major-label" geo={geoShape} />
            </DataSource>
          {/if}
          <DataSource {data}>
            <PolygonLayer fill={true} line={false} />
          </DataSource>
        </MapProvider>
        {#if label}
          <div class="absolute top-3 left-1/2 -translate-x-1/2 bg-surface-base/70 px-2 rounded-full text-sm text-contour-base whitespace-nowrap font-bold">
            {label}
          </div>
        {/if}
      </div>
    {/each}
  {/key}
  <InteractivityOverlay bind:interactive />
</div>
