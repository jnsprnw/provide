<script context="module">
  let instance = 0;
</script>

<script>
  import { featureCollection } from '@turf/helpers';

  import { getContext, setContext } from 'svelte';
  import { writable } from 'svelte/store';

  const mapbox = getContext('mapbox');
  $: ({ map } = mapbox);

  export let data;

  const sourceId = `data-source-${instance}`;
  let source = writable(null);

  instance++;

  setContext('mapbox', { ...mapbox, source: sourceId });

  $: geojsonData = data || featureCollection([]);

  // Initialize data layer and timer when map loaded
  $: if (!$map.getSource(sourceId)) {
    $map.addSource(sourceId, {
      type: 'geojson',
      data: geojsonData,
    });
    $source = $map.getSource(sourceId);
    // Otherwise simply update
  } else {
    $source.setData(geojsonData);
  }
</script>

{#if $source}
  <slot />
{/if}
