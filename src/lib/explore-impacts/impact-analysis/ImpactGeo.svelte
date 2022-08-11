<script>
  import MapboxMap from '$lib/mapbox-map/index.svelte';
  import RasterLayer from '$lib/mapbox-map/RasterLayer.svelte';
  import { IMPACT_GEO_DATA } from '$stores/impact-geo.js';
  import { max, min } from 'd3-array';
  import { scaleLinear } from 'd3-scale';
  import { getContext } from 'svelte';
  import { STATUS_SUCCESS } from '$lib/../config.js';
  import Grid from '$lib/helper/Grid.svelte';
  $: data = $IMPACT_GEO_DATA;

  $: loadedData = data
    .filter((d) => d.status === STATUS_SUCCESS)
    .map((d) => d.data);

  const theme = getContext('theme');

  $: colorScale = (() => {
    let domain = [0, 1];
    let range = [$theme.color.category[5], $theme.color.category[3]];
    const minVal = min(loadedData, (grid) => min(grid.data, (row) => min(row)));
    const maxVal = max(loadedData, (grid) => max(grid.data, (row) => max(row)));
    domain = [minVal, maxVal];
    return scaleLinear().domain(domain).range(range);
  })();
</script>

<Grid class="maps" container>
  {#each data as d}
    <Grid class="map-wrapper" md={12 / data.length}>
      <MapboxMap resize={data.length}>
        {#if d.status === STATUS_SUCCESS}
          <RasterLayer {colorScale} {...d.data} />
        {/if}
      </MapboxMap>
    </Grid>
  {/each}
</Grid>

<style lang="scss">
  .maps {
  }
</style>
