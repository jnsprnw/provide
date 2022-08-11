<script context="module">
  let instance = 0;
</script>

<script>
  import difference from '@turf/difference';
  import { getContext, onDestroy } from 'svelte';

  export let feature = {
    type: 'Feature',
    geometry: { coordinates: [], type: 'Polygon' },
  };

  const worldRect = {
    type: 'Feature',
    properties: {},
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [-180, 90],
          [180, 90],
          [180, -90],
          [-180, -90],
          [-180, 90],
        ],
      ],
    },
  };
  $: mask = difference(worldRect, feature);

  const { MAP } = getContext('map');

  const sourceId = `mask-source-${instance}`;
  const layerId = `mask-layer-${instance}`;

  $: if (!$MAP.getSource(sourceId)) {
    $MAP.addSource(sourceId, {
      type: 'geojson',
      data: mask,
    });
  }

  $: $MAP.getSource(sourceId).setData(mask);

  $: $MAP.addLayer(
    {
      id: layerId,
      type: 'fill',
      source: sourceId,
      paint: {
        'fill-color': '#fff',
        'fill-opacity': 1,
      },
    },
    'water'
  );

  onDestroy(() => {
    $MAP.getLayer(layerId) && $MAP.removeLayer(layerId);
    $MAP.getSource(sourceId) && $MAP.removeSource(sourceId);
  });
</script>
