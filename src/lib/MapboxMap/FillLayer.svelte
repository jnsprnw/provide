<script context="module">
  let instance = 0;
</script>

<script>
  import { getContext, onDestroy } from 'svelte';

  export let before;
  export let fillColor = ['get', 'color'];
  export let fillOpacity = 1;
  export let id;

  instance++;

  const { map, source } = getContext('mapbox');

  const layerId = id || `grid-layer-${instance}`;

  $: beforeExists = $map.getLayer(before);

  $: $map.addLayer(
    {
      id: layerId,
      type: 'fill',
      source,
      paint: {
        'fill-color': fillColor,
        'fill-opacity': fillOpacity,
        'fill-antialias': true,
      },
    },
    beforeExists ? before : null
  );

  onDestroy(() => {
    $map.getLayer(layerId) && $map.removeLayer(layerId);
  });
</script>
