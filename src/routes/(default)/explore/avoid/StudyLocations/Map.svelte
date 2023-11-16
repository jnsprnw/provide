<script>
  export let studyLocations;
  import { point, featureCollection } from '@turf/helpers';
  import MapProvider from '$lib/MapboxMap/MapProvider.svelte';
  import DataSource from '$lib/MapboxMap/DataSource.svelte';
  import DotLayer from '$lib/MapboxMap/DotLayer.svelte';

  import bbox from '@turf/bbox';

  $: locations = studyLocations.filter(({ isAverage }) => !isAverage).map(({ lat, lng, order, isSelected }) => ({ lat, lng, order, isSelected }));

  $: collection = featureCollection(locations.map(({ lat, lng, order, isSelected }) => point([lng, lat], { name: order, isSelected })));

  $: bounds = bbox(collection);
</script>

<div class="relative border border-contour-weakest overflow-hidden aspect-square h-full">
  <MapProvider
    style="mapbox://styles/climateanalytics/clp1bo67901bb01pbhz5ahyi0"
    {bounds}
    interactive={false}
    hideLogo={false}
  >
    <DataSource data={collection}>
      <DotLayer />
    </DataSource>
  </MapProvider>
</div>
