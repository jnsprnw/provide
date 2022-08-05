<script>
  import { get } from 'lodash-es';
  import MapboxMap from '$lib/mapbox-map/index.svelte';
  import RasterLayer from '$lib/mapbox-map/RasterLayer.svelte';
  import { IMPACT_GEO_DATA } from '$stores/impact-geo.js';
  $: data = get($IMPACT_GEO_DATA, ['data']);
</script>

<div class="map-wrapper">
  <MapboxMap>
    <RasterLayer {...data} />
  </MapboxMap>
</div>

<style lang="scss">
</style>
