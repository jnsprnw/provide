<script>
  import { getContext, onDestroy } from 'svelte';

  export let data;
  export let coordinatesOrigin;
  export let resolution;
  export let colorScale;
  export let before;

  const { MAP } = getContext('map');

  const sourceId = `data-source`;
  const layerId = `grid-layer`;

  $: geoJson = {
    type: 'FeatureCollection',
    features:
      data?.reduce((acc, cells, latIndex) => {
        cells.forEach((value, lngIndex) => {
          if (value === null) return;
          const lng =
            coordinatesOrigin[0] + resolution * lngIndex - resolution / 2;
          const lat =
            coordinatesOrigin[1] + resolution * latIndex - resolution / 2;

          acc.push({
            type: 'Feature',
            properties: { value, color: colorScale(value) },
            geometry: {
              type: 'Polygon',
              coordinates: [
                [
                  [lng, lat],
                  [lng + resolution, lat],
                  [lng + resolution, lat + resolution],
                  [lng, lat + resolution],
                  [lng, lat],
                ],
              ],
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
      id: layerId,
      type: 'fill',
      source: sourceId,
      paint: {
        'fill-color': ['get', 'color'],
        'fill-opacity': 1,
        'fill-antialias': true,
      },
    },
    before
  );

  onDestroy(() => {
    $MAP.getLayer(layerId) && $MAP.removeLayer(layerId);
    $MAP.getSource(sourceId) && $MAP.removeSource(sourceId);
  });
</script>
