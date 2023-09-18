<script>
  import mask from '@turf/mask';
  import syncMaps from '@mapbox/mapbox-gl-sync-move';
  import Legend from './Legend.svelte';
  import MapProvider from '$lib/MapboxMap/MapProvider.svelte';
  import DataSource from '$lib/MapboxMap/DataSource.svelte';
  import bbox from '@turf/bbox';
  import { getContext } from 'svelte';
  import FilterLayer from '$lib/MapboxMap/FilterLayer.svelte';
  import PolygonLayer from '$lib/MapboxMap/PolygonLayer.svelte';
  import InteractivityOverlay from './InteractivityOverlay.svelte';
  import { median } from 'd3-array';

  export let geoData;
  export let geoShape;
  export let colorScale;
  export let indicator;

  let maps = [];
  const theme = getContext('theme');
  // Needed to properly update the sync map thing
  $: {
    const newMaps = maps.slice(0);
    syncMaps(newMaps);
  }

  $: masked = mask(geoShape);
  let interactive = false;
  $: aspectRatio = {
    '1': 'aspect-[1.3]',
    '2': 'aspect-[1.5]',
    '3': 'aspect-[1.7]',
  }[geoData.length];

  $: domainMedian = median(colorScale.domain());
  $: mediumColor = colorScale(domainMedian);

  $: paint = [
    'settlement-minor-label',
    'settlement-major-label',
    'settlement-subdivision-label',
    'airport-label',
    'water-point-label',
    'water-line-label',
    'natural-point-label',
    'natural-line-label',
    'waterway-label',
    'road-label-simple',
  ].map((uid) => {
    return {
      uid,
      properties: [
        {
          uid: 'text-halo-color',
          value: mediumColor,
        },
        {
          uid: 'text-color',
          value: '#ffffff',
        },
      ],
    };
  });
</script>

<div
  class={`${aspectRatio} flex cols-${geoData.length} animate-defer-visibility relative`}
>
  <div
    class="flex items-center absolute bottom-2 right-2 py-2 px-2 bg-surface-base z-10 shadow-sm rounded-sm"
  >
    <Legend unit={indicator.unit} scale={colorScale} />
  </div>
  {#key geoData.length}
    {#each geoData as d, i}
      <div
        class:rounded-l={geoData.length === 1 || i === 0}
        class:rounded-r={geoData.length === 1 || i === geoData.length - 1}
        class:border-r-0={geoData.length > 1 && i !== geoData.length - 1}
        class="relative border border-contour-weakest overflow-hidden"
        style={`width: ${100 / geoData.length}%`}
      >
        <MapProvider
          bind:map={maps[i]}
          bounds={bbox(geoShape)}
          {interactive}
          {paint}
          hideLogo={i > 0}
        >
          <DataSource data={masked}>
            <PolygonLayer
              before="ocean-fill"
              fillColor={'#fafafa'}
              fill={true}
              fillId="mask"
              lineWidth={0.5}
              lineColor={$theme.color.contour.base}
            />
            <PolygonLayer
              before="ocean-fill"
              lineWidth={3}
              lineOffset={1.5}
              lineOpacity={0.07}
              lineColor={$theme.color.contour.base}
            />
            <FilterLayer layer="settlement-minor-label" geo={geoShape} />
            <FilterLayer layer="settlement-major-label" geo={geoShape} />
          </DataSource>
          <DataSource data={d.data}>
            <PolygonLayer fill={true} line={false} before="mask" />
          </DataSource>
        </MapProvider>
        {#if d.label}
          <div
            class="absolute top-3 left-1/2 -translate-x-1/2 bg-surface-base/70 px-2 rounded-full text-sm text-contour-base whitespace-nowrap font-bold"
          >
            {d.label}
          </div>
        {/if}
      </div>
    {/each}
  {/key}
  <InteractivityOverlay bind:interactive />
</div>
