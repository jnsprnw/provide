<script>
  import THEME from '$styles/theme-store.js';
  import { getContext } from 'svelte';
  import { onDestroy } from 'svelte';

  const beforeFallback = 'settlement-major-label';

  const { map, source } = getContext('mapbox');

  export let before = 'settlement-major-label';
  export let radius = 10;
  export let stroke = true;
  export let strokeWidth = 1;
  export let strokeOpacity = 1;
  export let strokeColor = '#ffffff';
  export let fill = true;
  export let fillColor = '#000000';
  export let opacity = 1;

  function getBeforeId(before) {
    const beforeLayer = $map.getLayer(before);
    const fallbackLayer = $map.getLayer(beforeFallback);
    return beforeLayer?.id || fallbackLayer?.id || null;
  }

  const ID_CIRCLES = 'circles';
  if (!$map.getLayer(ID_CIRCLES)) {
    $map.addLayer(
      {
        id: ID_CIRCLES,
        type: 'circle',
        source,
        layout: {},
        paint: {
          'circle-color': ['case', ['boolean', ['get', 'isSelected'], false], $THEME.color.theme.base, $THEME.color.contour.base],
          'circle-radius': radius,
          'circle-stroke-color': strokeColor,
          'circle-stroke-width': stroke ? strokeWidth : 0,
          'circle-stroke-opacity': strokeOpacity,
          'circle-color': fill ? fillColor : 'rgba(0, 0, 0, 0)',
          'circle-opacity': opacity,
        },
      },
      getBeforeId(before)
    );
  }

  const ID_NUMBERS = 'numbers';
  if (!$map.getLayer(ID_NUMBERS)) {
    $map.addLayer(
      {
        id: ID_NUMBERS,
        type: 'symbol',
        source,
        layout: {
          'text-field': ['get', 'name'],
          'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
          'text-size': 12,
          'text-allow-overlap': true,
        },
        paint: {
          'text-color': '#ffffff',
        },
      },
      getBeforeId(before)
    );
  }

  onDestroy(() => {
    try {
      $map.removeLayer(ID_CIRCLES);
      $map.removeLayer(ID_NUMBERS);
    } catch (e) {
      console.log(e);
    }
  });
</script>
