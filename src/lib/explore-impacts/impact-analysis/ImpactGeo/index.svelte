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
  import LoadingWrapper from '$lib/helper/LoadingWrapper.svelte';
  import { isEmpty } from 'lodash-es';
  import Spinner from '$lib/helper/Spinner.svelte';
  const theme = getContext('theme');
  let displayOption = 'side-by-side';
  $: shape = $GEO_SHAPE_DATA.data.data?.features[0];

  $: data = $IMPACT_GEO_DATA;
  $: isDoubleMap = data.length === 2;
  $: showDifference = displayOption === 'difference' && isDoubleMap;

  $: process = ({ data }) => {
    const calculateDifference = () => {
      const [grid1, grid2] = data;
      return {
        ...grid1,
        data: {
          ...grid1.data,
          data: grid1.data.data.map((row, lngIndex) =>
            row.map((value, latIndex) =>
              value === null
                ? null
                : grid2.data.data[lngIndex][latIndex] - value
            )
          ),
        },
      };
    };

    // The data that is actually being rendered
    const renderedData = showDifference ? [calculateDifference()] : data;

    const colorScale = (() => {
      let domain = [0, 1];
      let range = [$theme.color.category[5], $theme.color.category[3]];
      let flatData = renderedData.map((grid) => grid.data.data).flat(3);
      domain = extent(flatData);
      return scaleLinear().domain(domain).range(range);
    })();

    return { data: renderedData, colorScale };
  };
</script>

<LoadingWrapper
  let:props={{ data, colorScale }}
  {process}
  slotProps={{ data: $IMPACT_GEO_DATA }}
  let:isLoading
>
  <div slot="empty" class="placeholder">Loading</div>
  <Header bind:displayOption {showDifference} {data} />
  <div class={`maps cols-${data.length}`}>
    {#each data as d}
      <div class="map-wrapper">
        <MapboxMap fitShape={shape} resize={data.length}>
          <Mask feature={shape} layerId="mask-layer" />
          {#if d.status === STATUS_SUCCESS}
            <RasterLayer {colorScale} {...d.data} before="mask-layer" />
          {/if}
        </MapboxMap>
      </div>
    {/each}
    <Spinner {isLoading} />
  </div>
</LoadingWrapper>

<style lang="scss">
  .placeholder {
    height: 400px;
    background: var(--color-foreground-weakest);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .maps {
    position: relative;
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
