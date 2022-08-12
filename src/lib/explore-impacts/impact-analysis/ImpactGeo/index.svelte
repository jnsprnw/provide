<script>
  import MapboxMap from '$lib/mapbox-map/index.svelte';
  import RasterLayer from '$lib/mapbox-map/RasterLayer.svelte';
  import Header from './Header.svelte';
  import { IMPACT_GEO_DATA } from '$stores/impact-geo.js';
  import { GEO_SHAPE_DATA } from '$stores/geo-shape.js';
  import { extent } from 'd3-array';
  import { scaleLinear } from 'd3-scale';
  import { getContext } from 'svelte';
  import { STATUS_SUCCESS } from '$lib/../config.js';

  import Mask from '$lib/mapbox-map/Mask.svelte';
  const theme = getContext('theme');
  let displayOption = 'side-by-side';
  $: data = $IMPACT_GEO_DATA;

  $: isDoubleMap = loadedData.length === 2;
  $: showDifference = displayOption === 'difference' && isDoubleMap;

  $: shape = $GEO_SHAPE_DATA.data.data?.features[0];

  // So we don't have to check in every step whether data is loaded
  $: loadedData = data.filter((d) => d.status === STATUS_SUCCESS);

  function calculateDifference(grids) {
    const [grid1, grid2] = grids;
    return {
      ...grid1,
      data: {
        ...grid1.data,
        data: grid1.data.data.map((row, lngIndex) =>
          row.map((value, latIndex) =>
            value === null ? null : grid2.data.data[lngIndex][latIndex] - value
          )
        ),
      },
    };
  }

  // Used to calculate scale
  $: calculatedData = showDifference
    ? [calculateDifference(loadedData)]
    : loadedData;

  // The data that is actually being rendered
  $: renderedData = showDifference ? calculatedData : data;

  $: colorScale = (() => {
    let domain = [0, 1];
    let range = [$theme.color.category[5], $theme.color.category[3]];
    let flatData = calculatedData.map((grid) => grid.data.data).flat(3);
    domain = extent(flatData);
    return scaleLinear().domain(domain).range(range);
  })();
</script>

<Header bind:displayOption data={renderedData} />
<div class={`maps cols-${renderedData.length}`}>
  {#each renderedData as d}
    <div class="map-wrapper">
      <MapboxMap fitShape={shape} resize={renderedData.length}>
        <Mask feature={shape} layerId="mask-layer" />
        {#if d.status === STATUS_SUCCESS}
          <RasterLayer {colorScale} {...d.data} before="mask-layer" />
        {/if}
      </MapboxMap>
    </div>
  {/each}
</div>

<style lang="scss">
  .maps {
    display: flex;

    &.cols-1 .map-wrapper {
      width: 100%;
    }

    &.cols-2 .map-wrapper {
      width: 50%;
    }

    &.cols-3 .map-wrapper {
      width: 33.333%;
    }
  }

  .map-wrapper {
    height: 600px;
    border: 1px solid var(--color-foreground-weakest);

    &:not(:last-child) {
      border-right: none;
    }
  }
</style>
