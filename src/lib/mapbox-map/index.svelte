<script context="module">
  let instance = 0;
</script>

<script>
  import mapbox from 'mapbox-gl';
  import 'mapbox-gl/dist/mapbox-gl.css';
  import { getContext, setContext, onMount } from 'svelte';
  import { writable } from 'svelte/store';

  export let bounds;

  const MAP = writable(null);

  setContext('map', { MAP });
  const theme = getContext('theme');
  const mapId = `map-${instance}`;

  onMount(() => {
    const mapObject = new mapbox.Map({
      accessToken: import.meta.env.VITE_MAPBOX_ACCESS_TOKEN,
      container: mapId,
      style: $theme.mapStyle,
      bounds: bounds,
      attributionControl: false,
    });

    mapObject.on('load', () => {
      MAP.set(mapObject);
    });

    mapObject.on('webglcontextlost', () => {
      console.log('A webglcontextlost event occurred.');
    });
  });

  // $: if (bounds) {
  //   map?.fitBounds(bounds, {
  //     padding: { left: 10, top: 100, right: 10, bottom: 10 },
  //   });
  // }
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
