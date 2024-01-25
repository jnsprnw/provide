<script>
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';
  import { WORKER_MESSAGE_START, STATUS_FINISHED } from '$config';
  import DataSource from '$lib/MapboxMap/DataSource.svelte';
  import PolygonLayer from '$lib/MapboxMap/PolygonLayer.svelte';

  export let geoData;
  export let geoShape;

  let maskWorker;
  let maskedGeoData = [];

  async function initGeoMasker() {
    // This function initiates the web worker
    if (browser) {
      // Check if we are in a browser
      if (window.Worker) {
        // Check if the browser supports web worker

        const MyWorker = await import('$workers/geomask.js?worker');
        maskWorker = new MyWorker.default();

        if (maskWorker) {
          maskWorker.onmessage = function (e) {
            const { data, status } = e.data;
            // This checks what the status of the message is
            switch (status) {
              case STATUS_FINISHED:
                // Save the result returned from the web worker
                maskedGeoData = data;
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

  function terminateWorker() {
    // Check if there is a worker present. This is sometimes nessecary when parts of the website reload.
    if (maskWorker) {
      maskWorker.terminate();
    }
  }

  async function createMask(geoData, geoShape) {
    if (maskWorker) {
      // We need to rebuild the geoData to only include the needed and plain data that can be stringified in the web worker message
      maskWorker.postMessage({ geoData: [geoData].map(({ features, label }) => ({ features: features, label })), geoShape, message: WORKER_MESSAGE_START });
    }
  }

  // We need a Boolean value for the next step
  $: hasWorker = Boolean(maskWorker);
  // This is used to trigger the creation of the mask.
  // It is depended on the hasWorker Boolean. This is because when the page loads and geoData and geoShape is available, but the worker is not ready
  // We use the Boolean value because we do not want to trigger this step, when a new worker is created, but only if the worker becomes available
  $: hasWorker && createMask(geoData, geoShape);
</script>

{#if maskedGeoData.length}
  {#each maskedGeoData as { data }}
    <DataSource {data}>
      <PolygonLayer fill={true} line={false} />
    </DataSource>
  {/each}
{/if}
