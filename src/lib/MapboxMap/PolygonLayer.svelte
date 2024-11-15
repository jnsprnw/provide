<script context="module">
  let instance = 0;
</script>

<script>
  import { getContext } from 'svelte';
  import { onDestroy } from 'svelte';

  const beforeFallback = 'ocean-stroke';
  const theme = getContext('theme');

  export let zoomRange = [0, 20];
  export let before = 'ocean-stroke';

  export let line = true;
  export let lineId = null;
  export let lineColor = ['coalesce', ['get', 'lineColor'], ['get', 'color']];
  export let lineWidth = 1;
  export let lineOpacity = ['coalesce', ['get', 'lineOpacity'], 1];
  export let lineOffset = 0;
  export let lineDasharray = null;

  export let fill = false;
  export let fillId = null;
  export let fillColor = ['coalesce', ['get', 'fillColor'], ['get', 'color']];
  export let fillOpacity = ['coalesce', ['get', 'fillOpacity'], ['get', 'opacity'], 1];

  export let label = false;
  export let labelId = undefined;
  export let labelField = 'label';

  const { map, source } = getContext('mapbox');

  const lineLayerId = lineId || `polygon-line-${instance}`;
  const fillLayerId = fillId || `polygon-fill-${instance}`;
  const labelLayerId = labelId || `polygon-symbol-${instance}`;
  instance++;

  function getBeforeId(before) {
    const beforeLayer = $map.getLayer(before);
    const fallbackLayer = $map.getLayer(beforeFallback);
    return beforeLayer?.id || fallbackLayer?.id || null;
  }

  // Initialize data layer and timer when map loaded

  // Create fill layer
  if (fill && !$map.getLayer(fillLayerId)) {
    $map.addLayer(
      {
        id: fillLayerId,
        type: 'fill',
        source,
        minzoom: zoomRange[0],
        maxzoom: zoomRange[1],
        layout: {},
        paint: {
          'fill-color': fillColor || $theme.color.get('foreground.base'),
          'fill-opacity': fillOpacity || 0.01,
        },
      },
      getBeforeId(before)
    );
  }

  // Create layers
  if (line && !$map.getLayer(lineLayerId)) {
    $map.addLayer(
      {
        id: lineLayerId,
        type: 'line',
        source,
        minzoom: zoomRange[0],
        maxzoom: zoomRange[1],
        layout: {},
        paint: {
          'line-color': lineColor,
          'line-width': lineWidth,
          'line-opacity': lineOpacity,
          'line-offset': lineOffset,
          ...(lineDasharray ? { 'line-dasharray': lineDasharray } : {}),
        },
      },
      getBeforeId(before)
    );
  }

  // Create label layer
  if (label && !$map.getLayer(labelLayerId)) {
    $map.addLayer(
      {
        id: labelLayerId,
        type: 'symbol',
        source,
        minzoom: zoomRange[0],
        maxzoom: zoomRange[1],
        layout: {
          'text-field': ['get', labelField],
          'symbol-placement': 'line-center',
          'text-size': 10,
        },
        paint: {
          'text-color': lineColor || $theme.color.get('foreground.base'),
          'text-halo-color': $theme.color.get('background.weaker'),
          'text-halo-width': 2,
        },
      },
      getBeforeId(before)
    );
  }

  onDestroy(() => {
    try {
      label && $map.removeLayer(labelLayerId);
      line && $map.removeLayer(lineLayerId);
      fill && $map.removeLayer(fillLayerId);
    } catch (e) {
      console.log(e);
    }
  });
</script>
