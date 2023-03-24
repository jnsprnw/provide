<script context="module">
  let instance = 0;
</script>

<script>
  import mapbox from 'mapbox-gl';
  import 'mapbox-gl/dist/mapbox-gl.css';
  import { getContext, setContext, onMount, onDestroy } from 'svelte';
  import { writable } from 'svelte/store';
  import bbox from '@turf/bbox';

  export let fitShape;
  export let resize;
  export let bounds;

  const MAP = writable(null);

  setContext('map', { MAP });
  const theme = getContext('theme');
  const mapId = `map-${instance}`;

  function fitMap(fitShape) {
    if (fitShape) {
      const bounds = bbox(fitShape);
      $MAP?.fitBounds(bounds, {
        animate: false,
        padding: { left: 10, top: 10, right: 10, bottom: 10 },
      });
    }
  }

  $: handleMoveEnd = () => {
    if (!$MAP) return;
    const nextBounds = $MAP.getBounds();
    const sw = bounds?.getSouthWest() || {};
    const ne = bounds?.getNorthEast() || {};
    const nextSw = nextBounds.getSouthWest();
    const nextNe = nextBounds.getNorthEast();

    if (
      !bounds ||
      sw.lng !== nextSw.lng ||
      sw.lat !== nextSw.lat ||
      ne.lng !== nextNe.lng ||
      ne.lat !== nextNe.lat
    )
      bounds = nextBounds;
  };

  onMount(() => {
    const mapObject = new mapbox.Map({
      accessToken: import.meta.env.VITE_MAPBOX_ACCESS_TOKEN,
      container: mapId,
      style: $theme.mapStyle,
      interactive: false,
      attributionControl: false,
    });

    mapObject.on('load', () => {
      MAP.set(mapObject);
    });

    mapObject.on('webglcontextlost', () => {
      console.log('A webglcontextlost event occurred.');
    });

    mapObject.on('moveend', handleMoveEnd);
  });

  $: if (bounds && $MAP) $MAP.fitBounds(bounds, { animate: false });

  // Whenever the resize parameter changes, the map should be resized
  $: if ((resize || !resize) && $MAP) {
    $MAP.resize();
    fitMap(fitShape);
  }

  $: fitMap(fitShape);
  instance++;

  onDestroy(() => {
    $MAP?.off('moveend', handleMoveEnd);
  });
</script>

<div id={mapId} class="map container" />
{#if $MAP}
  <slot />
{/if}

<style lang="postcss">
  .container {
    display: block;
    width: 100%;
    height: 100%;
  }
</style>
