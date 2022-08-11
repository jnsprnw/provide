<script>
  import MapboxMap from '$lib/mapbox-map/index.svelte';
  import RasterLayer from '$lib/mapbox-map/RasterLayer.svelte';
  import { IMPACT_GEO_DATA } from '$stores/impact-geo.js';
  import { GEO_SHAPE_DATA } from '$stores/geo-shape.js';
  import { max, min } from 'd3-array';
  import { scaleLinear } from 'd3-scale';
  import { getContext } from 'svelte';
  import { IMPACT_GEO_YEARS, STATUS_SUCCESS } from '$lib/../config.js';
  import Select from '$lib/helper/select/index.svelte';
  import Grid from '$lib/helper/Grid.svelte';
  import { CURRENT_IMPACT_GEO_YEAR_UID } from '$lib/../stores/store';
  import Mask from '$lib/mapbox-map/Mask.svelte';
  $: data = $IMPACT_GEO_DATA;
  $: shape = $GEO_SHAPE_DATA.data.data?.features[0];

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

  $: console.log($CURRENT_IMPACT_GEO_YEAR_UID);
</script>

<Grid class="maps" container>
  <Select
    options={IMPACT_GEO_YEARS}
    bind:value={$CURRENT_IMPACT_GEO_YEAR_UID}
    label="Year"
  />
</Grid>
<Grid class="maps" container>
  {#each data as d}
    <Grid class="map-wrapper" md={12 / data.length}>
      <MapboxMap fitShape={shape} resize={data.length}>
        <Mask feature={shape} layerId="mask-layer" />
        {#if d.status === STATUS_SUCCESS}
          <RasterLayer {colorScale} {...d.data} before="mask-layer" />
        {/if}
      </MapboxMap>
    </Grid>
  {/each}
</Grid>

<style lang="scss">
  .maps {
  }
</style>
