<script>
  import mask from '@turf/mask';
  import syncMaps from '@mapbox/mapbox-gl-sync-move';
  import FillLayer from '$lib/MapboxMap/FillLayer.svelte';
  import Legend from './Legend.svelte';
  import MapProvider from '$lib/MapboxMap/MapProvider.svelte';
  import DataSource from '$lib/MapboxMap/DataSource.svelte';
  import bbox from '@turf/bbox';
  import { getContext } from 'svelte';
  import FilterLayer from '$lib/MapboxMap/FilterLayer.svelte';
  import PolygonLayer from '$lib/MapboxMap/PolygonLayer.svelte';

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
</script>

<Legend unit={indicator.unit} scale={colorScale} />

<div class={`aspect-[1.3] flex gap-2 cols-${geoData.length}`}>
  {#key geoData.length}
    {#each geoData as d, i}
      <div class="relative" style={`width: ${100 / geoData.length}%`}>
        <MapProvider
          bind:map={maps[i]}
          bounds={bbox(geoShape)}
          interactive={true}
        >
          <DataSource data={masked}>
            <!-- <FillLayer
              before={null}
              id="mask-layer"
              fillColor={$theme.color.background.weaker}
            /> -->
            <PolygonLayer
              before="settlement-minor-label"
              fillColor={$theme.color.background.base}
              fill={true}
              lineWidth={0.5}
              lineColor={$theme.color.foreground.base}
            />
            <PolygonLayer
              before="settlement-minor-label"
              lineWidth={3}
              lineOffset={1.5}
              lineOpacity={0.07}
              lineColor={$theme.color.foreground.base}
            />
            <FilterLayer layer="settlement-minor-label" geo={geoShape} />
            <FilterLayer layer="settlement-major-label" geo={geoShape} />
          </DataSource>
          <DataSource data={d.data}>
            <PolygonLayer fill={true} line={false} before="building" />
          </DataSource>
        </MapProvider>
        {#if d.label}
          <div
            class="absolute top-3 left-3 bg-background-base text-sm text-foreground-weak"
          >
            {d.label}
          </div>
        {/if}
      </div>
    {/each}
  {/key}
</div>
