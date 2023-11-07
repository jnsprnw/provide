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
          uid: 'text-color',
          value: '#222',
        },
      ],
    };
  });
</script>

<div class="relative border border-contour-weakest overflow-hidden">
  <MapProvider
    {bounds}
    interactive={false}
    {paint}
    hideLogo={false}
  >
    <DataSource data={collection}>
      <DotLayer />
    </DataSource>
  </MapProvider>
</div>
