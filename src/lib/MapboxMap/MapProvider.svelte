<script>
  import * as mapboxgl from 'mapbox-gl';
  import 'mapbox-gl/dist/mapbox-gl.css';
  import { getContext, setContext, onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import { IS_STATIC } from '$stores/state';

  let clazz = '';
  let _map;
  export { clazz as class };
  export let zoomRange = [1, 14];
  export let zoom = zoomRange[0];
  export let pitch = 0;
  export let bearing = 0;
  export { _map as map };

  export let style = undefined;
  export let projection = 'mercator';
  export let interactive = true;
  export let bounds = undefined;
  export let center = undefined;
  export let fitBoundsOptions = undefined;
  export let fitBoundsExtent = 20;
  export let paint = [];
  export let hideLogo = false;

  const theme = getContext('theme');

  export let ready = writable(false);
  let mapReady = writable(false);
  let map = writable(null);
  let stylesReady = writable(false);
  let clientWidth;

  setContext('mapbox', {
    map,
    ready,
    mapReady,
    stylesReady,
  });

  $: _style = style || $theme.mapStyle;
  $: $map && mapReady && $map.setStyle(_style);

  let node;
  onMount(() => {
    $map = new mapboxgl.Map({
      accessToken: import.meta.env.VITE_MAPBOX_ACCESS_TOKEN,
      container: node,
      style: _style,
      projection,
      pitch,
      zoom,
      bearing,
      bounds,
      fitBoundsOptions: fitBoundsOptions || { padding: clientWidth / fitBoundsExtent },
      interactive,
      attributionControl: false,
      minZoom: zoomRange[0] - 0.00000001,
      maxZoom: zoomRange[1],
      center,
      preserveDrawingBuffer: $IS_STATIC,
    });

    _map = $map;

    $map.on('load', () => {
      $mapReady = true;
    });

    $map.on('zoomend', () => {});

    $map.on('styledata', () => {
      $stylesReady = true;
    });

    $map.on('webglcontextlost', () => {
      console.log('A webglcontextlost event occurred.');
    });
  });

  $: if ($ready && bounds) {
    $map.fitBounds(bounds, fitBoundsOptions || { padding: clientWidth / fitBoundsExtent });
  }

  $: if ($ready && center && zoom) {
    $map.flyTo({ center, zoom });
  }

  $: {
    if ($mapReady && $stylesReady) {
      setTimeout(() => {
        $ready = true;
      }, 500);
    }
  }

  $: if ($ready) {
    ['scrollZoom', 'boxZoom', 'dragRotate', 'dragPan', 'keyboard', 'doubleClickZoom', 'touchZoomRotate'].map((handler) => (interactive ? $map[handler].enable() : $map[handler].disable()));
  }

  $: if ($ready && paint) {
    paint.forEach((layer) =>
      layer.properties.forEach((property) => {
        $map.setPaintProperty(layer.uid, property.uid, property.value);
      })
    );
  }
</script>

<div class:hide-logo={hideLogo} class="map w-full h-full hide-logo {projection} {clazz}" bind:clientWidth bind:this={node}>
  {#if $ready}
    <slot />
  {/if}
</div>

<style>
  :global(.hide-logo .mapboxgl-ctrl-logo) {
    opacity: 0;
  }
</style>
