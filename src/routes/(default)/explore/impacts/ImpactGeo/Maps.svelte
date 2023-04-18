<script>
  import mask from '@turf/mask';
  import syncMaps from '@mapbox/mapbox-gl-sync-move';
  import FillLayer from '$lib/MapboxMap/FillLayer.svelte';
  import Legend from './Legend.svelte';
  import MapProvider from '$lib/MapboxMap/MapProvider.svelte';
  import DataSource from '$lib/MapboxMap/DataSource.svelte';
  import bbox from '@turf/bbox';
  import { getContext } from 'svelte';

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

<div class={`aspect-[1.3] bg-background-weaker flex cols-${geoData.length}`}>
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
            <FillLayer
              before="water"
              id="mask-layer"
              fillColor={$theme.color.background.weaker}
            />
          </DataSource>
          <DataSource data={d.data}>
            <FillLayer before="mask-layer" />
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

<div class="legend">
  <Legend unit={indicator.unit} scale={colorScale} />
</div>
