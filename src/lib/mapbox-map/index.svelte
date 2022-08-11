<script context="module">
  let instance = 0;
</script>

<script>
  import mapbox from 'mapbox-gl';
  import 'mapbox-gl/dist/mapbox-gl.css';
  import { getContext, setContext, onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import bbox from '@turf/bbox';

  export let fitShape;
  export let resize;

  const MAP = writable(null);

  setContext('map', { MAP });
  const theme = getContext('theme');
  const mapId = `map-${instance}`;

  onMount(() => {
    const mapObject = new mapbox.Map({
      accessToken: import.meta.env.VITE_MAPBOX_ACCESS_TOKEN,
      container: mapId,
      style: $theme.mapStyle,
      attributionControl: false,
    });

    mapObject.on('load', () => {
      MAP.set(mapObject);
    });

    mapObject.on('webglcontextlost', () => {
      console.log('A webglcontextlost event occurred.');
    });
  });

  // Whenever the resize parameter changes, the map should be resized
  $: (resize || !resize) && $MAP && $MAP.resize();

  $: if (fitShape) {
    const bounds = bbox(fitShape);
    $MAP?.fitBounds(bounds, {
      padding: { left: 10, top: 10, right: 10, bottom: 10 },
    });
  }
  instance++;
</script>

<div id={mapId} class="map container" />
{#if $MAP}
  <slot />
{/if}

<style lang="scss">
  .container {
    display: block;
    width: 100%;
    height: 600px;
  }
</style>
