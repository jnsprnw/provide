<script>
  import { get } from 'lodash-es';
  import MapboxMap from '$lib/mapbox-map/index.svelte';
  import RasterLayer from '$lib/mapbox-map/RasterLayer.svelte';
  import { IMPACT_GEO_DATA } from '$stores/impact-geo.js';
  import { max, min } from 'd3-array';
  import { scaleLinear } from 'd3-scale';
  import { getContext } from 'svelte';
  $: data = get($IMPACT_GEO_DATA, ['data']);

  const theme = getContext('theme');

  $: colorScale = (() => {
    let domain = [0, 1];
    let range = [$theme.color.category[5], $theme.color.category[3]];
    if (data?.data) {
      const minVal = min(data.data, (row) => min(row));
      const maxVal = max(data.data, (row) => max(row));
      domain = [minVal, maxVal];
    }

    return scaleLinear().domain(domain).range(range);
  })();
</script>

<div class="map-wrapper">
  <MapboxMap>
    <RasterLayer {colorScale} {...data} />
  </MapboxMap>
</div>

<style lang="scss">
</style>
