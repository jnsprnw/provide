<script>
  import MapProvider from '$lib/MapboxMap/MapProvider.svelte';
</script>

<div class="w-full h-[60vh] relative overflow-hidden bg-theme-stronger">
  <div class="w-full h-full">
    <div class="w-3/5 h-[140%] bg-theme-stronger">
      <MapProvider
        layerVisibility={{ background: 'none' }}
        projection="globe"
        style="mapbox://styles/climateanalytics/clgxes1uo00c301qy9m8ubl5e"
        center={[50, 30]}
        zoomRange={[1.9, 1.9]}
      />
    </div>
  </div>
</div>
