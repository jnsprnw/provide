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
</script>

<div class="flex items-center justify-end">
  <Legend unit={indicator.unit} scale={colorScale} />
</div>

<div
  class={`aspect-[1.3] flex gap-2 cols-${geoData.length} relative animate-defer-visibility`}
>
  {#key geoData.length}
    {#each geoData as d, i}
      <div class="relative" style={`width: ${100 / geoData.length}%`}>
        <MapProvider bind:map={maps[i]} bounds={bbox(geoShape)} {interactive}>
          <DataSource data={masked}>
            <PolygonLayer
              before="ocean-fill"
              fillColor={'#fafafa'}
              fill={true}
              fillId="mask"
              lineWidth={0.5}
              lineColor={$theme.color.foreground.base}
            />
            <PolygonLayer
              before="ocean-fill"
              lineWidth={3}
              lineOffset={1.5}
              lineOpacity={0.07}
              lineColor={$theme.color.foreground.base}
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
            class="absolute top-3 left-1/2 -translate-x-1/2 bg-background-base/70 px-2 rounded-full text-sm text-foreground-base whitespace-nowrap font-bold"
          >
            {d.label}
          </div>
        {/if}
      </div>
    {/each}
  {/key}
  <InteractivityOverlay bind:interactive />
</div>
