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
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';
  import { STATUS_IDLE, STATUS_PROCESSING, STATUS_FAILED, WORKER_MESSAGE_START, STATUS_FINISHED } from '$config';
  import { CURRENT_GEOGRAPHY } from '$stores/state';
  import Progress from '$lib/helper/Progress.svelte';
  import { reduce } from 'lodash-es';
  import { formatValue } from '$formatting';
  import DotLayer from '$src/lib/MapboxMap/DotLayer.svelte';
  import GlacierLegend from './GlacierLegend.svelte';

  export let geoData;
  export let geoDetails;
  export let geoShape;
  export let colorScale;
  export let unit;
  export let isProcessing;
  export let showSatellite;

  let workerStatus = STATUS_IDLE;
  let workerMessage;

  let maskWorker;
  let workerStepsTotal = 0;
  let workerStepsCurrent = 0;

  async function initGeoMasker() {
    // This function initiates the web worker
    if (browser) {
      // Check if we are in a browser
      if (window.Worker) {
        // Check if the browser supports web worker
        // We reset some values we use to visualise the progress
        workerStatus = STATUS_IDLE;
        workerStepsCurrent = 0;
        workerStepsTotal = 0;
        maskedGeoData = [];
        workerMessage = undefined;

        const MyWorker = await import('$workers/geomask.js?worker');
        maskWorker = new MyWorker.default();

        if (!maskWorker) {
          workerStatus = STATUS_FAILED;
          workerMessage = 'Could not initiate web worker.';
        } else {
          maskWorker.onmessage = function (e) {
            const { data, stepsTotal, stepsCurrent, status, message } = e.data;
            if (status) {
              workerStatus = status;
            }
            if (message) {
              workerMessage = message;
            }
            // This checks what the status of the message is
            switch (status) {
              case STATUS_FINISHED:
                // Save the result returned from the web worker
                maskedGeoData = data;
                isProcessing = false;
                break;
              case STATUS_PROCESSING:
                // Save the current step number and total number of steps
                workerStepsCurrent = stepsCurrent;
                workerStepsTotal = stepsTotal;
                isProcessing = true;
                break;
            }
          };
        }
      }
    }
  }

  onMount(() => {
    // Initiate the web worker when the component in mounted
    initGeoMasker();
  });

  onDestroy(() => {
    // Terminate any web worker task that might be running when the component is destroyed.
    terminateWorker();
  });

  async function stopWorker() {
    // This seams to be the least hacky way of stopping a worker.
    // It would be nice to just cancel the function instead of terminating and reinitiating the worker.
    terminateWorker();
    await initGeoMasker();
  }

  function terminateWorker() {
    // Check if there is a worker present. This is sometimes nessecary when parts of the website reload.
    if (maskWorker) {
      maskWorker.terminate();
    }
  }

  let maps = [];
  const theme = getContext('theme');
  // Needed to properly update the sync map thing
  $: {
    const newMaps = maps.slice(0);
    syncMaps(newMaps);
  }

  async function createMaske(geoData, geoShape) {
    if (maskWorker) {
      isProcessing = true;
      // If there is a worker currently running
      if (workerStatus === STATUS_PROCESSING) {
        // Stop the currently runnning worker
        await stopWorker();
      }
      // We need to rebuild the geoData to only include the needed and plain data that can be stringified in the web worker message
      const plainGeoData = geoData.map(({ data, label }) => ({ features: data.features, label }));
      workerStatus = STATUS_PROCESSING;
      workerMessage = undefined;
      maskWorker.postMessage({ geoData: plainGeoData, geoShape, message: WORKER_MESSAGE_START });
    } else {
      workerStatus = STATUS_FAILED;
      workerMessage = 'No web worker found. Could not process data.';
    }
  }

  function invertShape(geoShape) {
    try {
      return mask(geoShape);
    } catch (error) {
      console.warn(`Invalid geoShape`);
      return undefined;
    }
  }

  // We need a Boolean value for the next step
  $: hasWorker = Boolean(maskWorker);
  // This is used to trigger the creation of the mask.
  // It is depended on the hasWorker Boolean. This is because when the page loads and geoData and geoShape is available, but the worker is not ready
  // We use the Boolean value because we do not want to trigger this step, when a new worker is created, but only if the worker becomes available
  $: hasWorker && createMaske(geoData, geoShape);

  let maskedGeoData = [];
  $: invertedGeoShape = invertShape(geoShape);
  let interactive = false;
  $: aspectRatio = {
    '1': 'aspect-[1.3]',
    '2': 'aspect-[1.5]',
    '3': 'aspect-[1.7]',
  }[geoData.length];

  $: domainMedian = median(colorScale.domain());
  $: mediumColor = colorScale(domainMedian);

  const paint = [];

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
  //         value: '#000000',
  //       },
  //     ],
  //   };
  // });

  let label;

  $: size = reduce(geoShape.geometry.coordinates, (sum, n) => sum + reduce(n, (s, m) => s + m.length, 0), 0);

  $: switch (workerStatus) {
    case STATUS_PROCESSING:
      label = workerMessage ?? `Processing data with ${formatValue(size, 'integer')} coordinates. Please wait.`;
      break;
    case STATUS_FAILED:
      label = workerMessage ?? 'Error occured while processing the data.';
      break;
  }

  $: displayedGeoData = showSatellite ? geoData : maskedGeoData;
  $: isUrban = $CURRENT_GEOGRAPHY.geographyType === 'cities';

  $: bounds = isUrban && showSatellite ? bbox(displayedGeoData[0].data) : bbox(geoShape);
</script>

<div class={`${aspectRatio} flex cols-${geoData.length} gap-x-[1px] animate-defer-visibility relative rounded border border-contour-weakest`}>
  <div class="flex gap-3 items-center absolute bottom-2 right-2 py-2 px-2 bg-surface-base z-10 shadow-sm rounded-sm">
    <Legend {unit} scale={colorScale} hasUrbanBoundary={showSatellite && isUrban} />
    {#if geoDetails}
      <GlacierLegend />
    {/if}
  </div>
  <!-- {#if geoDetails}
    <div class="flex gap-3 items-center absolute top-2 right-2 py-2 px-2 bg-surface-base z-10 shadow-sm rounded-sm">
      <GlacierLegend />
    </div>
  {/if} -->
  {#if ![STATUS_FINISHED, STATUS_IDLE].includes(workerStatus)}
    <div class="rounded flex items-center justify-center absolute top-0 left-0 w-full h-full py-2 px-2 bg-surface-base z-10">
      <div class="grid grid-rows-[auto_4px] justify-center items-center gap-y-4 justify-items-center">
        <span class="text-xs text-contour-weak row-start-1">{label}</span>
        <div class="row-start-2 flex items-center w-full justify-center">
          {#if workerStatus === STATUS_PROCESSING}<Progress current={(100 / workerStepsTotal) * workerStepsCurrent} />{/if}
        </div>
      </div>
    </div>
  {/if}
  {#key maskedGeoData.length}
    {#each displayedGeoData as { data, label }, i}
      <div
        class:rounded-l={maskedGeoData.length === 1 || i === 0}
        class:rounded-r={maskedGeoData.length === 1 || i === maskedGeoData.length - 1}
        class:border-r-1={maskedGeoData.length > 1 && i !== maskedGeoData.length - 1}
        class="w-full border-contour-weakest overflow-hidden relative"
      >
        {#key showSatellite}
          <MapProvider bind:map={maps[i]} {bounds} {interactive} {paint} hideLogo={i > 0} style={showSatellite && import.meta.env.VITE_MAPBOX_STYLE_SATELLITE}>
            {#if invertedGeoShape && !isUrban}
              <DataSource data={invertedGeoShape}>
                <PolygonLayer before={showSatellite ? 'tunnel-path' : 'ocean-fill'} lineWidth={3} lineOffset={1.5} lineOpacity={0.1} lineColor={$theme.color.contour.base} />
                <FilterLayer layer="settlement-minor-label" geo={geoShape} />
                <FilterLayer layer="admin-1-boundary" geo={geoShape} />
              </DataSource>
            {/if}
            {#if invertedGeoShape && showSatellite}
              <DataSource data={invertedGeoShape}>
                <FilterLayer layer="settlement-minor-label" geo={geoShape} />
                <FilterLayer layer="admin-1-boundary" geo={geoShape} />
              </DataSource>
              <DataSource data={geoShape}>
                <PolygonLayer before="waterway-label" fill={false} line={true} lineColor={$theme.color.surface.base} lineWidth={4.5} lineOpacity={0.5} lineJoin="round" lineId="line-halo" />
                <PolygonLayer
                  before="waterway-label"
                  fill={false}
                  line={true}
                  lineColor={$theme.color.contour.base}
                  lineWidth={1.2}
                  lineOpacity={0.85}
                  lineDasharray={[1.3, 1.5, 4, 1.5]}
                  lineJoin="round"
                  lineOffset={-1.5}
                />
              </DataSource>
            {/if}

            <DataSource {data}>
              {#if showSatellite}
                <PolygonLayer before="tunnel-path" fill={true} line={false} fillOpacity={0.25} />
              {:else}
                <PolygonLayer fill={true} line={false} />
              {/if}
            </DataSource>
            {#if geoDetails}
              <DataSource data={geoDetails}>
                <DotLayer radius={['interpolate', ['linear'], ['zoom'], 4, 0.75, 16, 5]} stroke={false} opacity={['interpolate', ['linear'], ['zoom'], 2, 0.02, 12, 0.6]} />
              </DataSource>
            {/if}
          </MapProvider>
        {/key}
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
