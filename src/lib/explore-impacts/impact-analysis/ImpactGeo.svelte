<script>
  import { get } from 'lodash-es';
  import MapboxMap from '$lib/mapbox-map/index.svelte';
  import RasterLayer from '$lib/mapbox-map/RasterLayer.svelte';
  import { IMPACT_GEO_DATA } from '$stores/impact-geo.js';
  import { max, min } from 'd3-array';
  $: data = get($IMPACT_GEO_DATA, ['data']);

  $: console.log(data);
  $: scale = (() => {
    if (!data?.data) return;
    const minVal = min(data.data, (row) => min(row));
    const maxVal = max(data.data, (row) => max(row));
    console.log(minVal, maxVal);
  })();
</script>

<div class="map-wrapper">
  <MapboxMap>
    <RasterLayer {...data} />
  </MapboxMap>
</div>

<style lang="scss">
</style>
