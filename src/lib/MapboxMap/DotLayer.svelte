<script context="module">
  let instance = 0;
</script>

<script>
  import THEME from '$styles/theme-store.js';
  import { getContext } from 'svelte';
  import { onDestroy } from 'svelte';

  const beforeFallback = 'settlement-major-label';
  const theme = getContext('theme');

  const { map, source } = getContext('mapbox');

  export let before = 'settlement-major-label';

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
          'circle-color': '#000',
          'circle-radius': 10,
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
