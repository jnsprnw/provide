<script>
  import { getContext, onDestroy } from 'svelte';

  export let data;
  export let coordinatesOrigin;
  export let resolution;

  const { MAP } = getContext('map');

  const sourceId = `data-source`;
  const gridLayerId = `grid-layer`;

  $: geoJson = {
    type: 'FeatureCollection',
    features:
      data?.reduce((acc, cells, lngIndex) => {
        cells.forEach((value, latIndex) => {
          const lng = coordinatesOrigin[0] + resolution * lngIndex;
          const lat = coordinatesOrigin[1] + resolution * latIndex;

          acc.push({
            type: 'Feature',
            properties: { value, radius: 1 },
            geometry: {
              type: 'Point',
              coordinates: [lng, lat],
            },
          });
        });
        return acc;
      }, []) || [],
  };

  $: if (!$MAP.getSource(sourceId)) {
    $MAP.addSource(sourceId, {
      type: 'geojson',
      data: geoJson,
    });
  }

  $: $MAP.getSource(sourceId).setData(geoJson);

  $: $MAP.addLayer(
    {
      id: gridLayerId,
      type: 'circle',
      source: sourceId,
      paint: {
        'circle-color': '#000000',
        'circle-opacity': 1,
        'circle-radius': ['get', 'radius'],
      },
    }
    //'settlement-minor-label'
  );

  onDestroy(() => {
    console.log('destroying layer');
    $MAP.removeLayer(gridLayerId);
    $MAP.removeSource(sourceId);
  });
</script>
