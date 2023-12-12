<script>
  import mask from '@turf/mask';
  import intersect from '@turf/intersect';
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
  import { featureCollection } from '@turf/helpers';
  import isValid from '@turf/boolean-valid';
  import { rewind } from '$lib/utils/geo';

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

  function createMaske(geoData, geoShape) {
    console.log(geoData, geoShape);
    // We need to build our own masking of the data and the shapefile of the geo shape provided by the API
    return geoData.map((datum) => {
      // Loop through the different data layer
      const features = rewind(datum.data.features).map((feature) => {
        // The feature collection consists of multiple features. They all need to be masked individually
        // We calculate the intersection of the feature (data layer) and the geo shape
        let intersection = feature;
        try {
          intersection = intersect(feature, geoShape);
        } catch (error) {
          // console.error(error);
          console.warn(`Invalid geography`);
          console.log({ feature });
          intersection = feature;
        }
        // const intersection = intersect(feature, geoShape);
        return {
          ...intersection,
          properties: {
            // because the properties are lost by the intersection, we add them again
            ...feature.properties,
          },
        };
      });
      // We rebuild the geo data object
      return {
        ...datum,
        data: featureCollection(features), // The individual features are combined to a feature collection again
      };
    });
  }

  function invertShape(geoShape) {
    try {
      return mask(geoShape);
    } catch (error) {
      console.warn(`Invalid geoShape`);
      console.log({ geoShape });
      return undefined;
    }
  }

  $: maskedGeoData = createMaske(geoData, geoShape);
  $: console.log({ maskedGeoData });
  $: console.log({ geoShape }, isValid(geoShape));
  $: invertedGeoShape = invertShape(geoShape);
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

<div class={`${aspectRatio} flex cols-${geoData.length} animate-defer-visibility relative`}>
  <div class="flex items-center absolute bottom-2 right-2 py-2 px-2 bg-surface-base z-10 shadow-sm rounded-sm">
    <Legend
      unit={indicator.unit}
      scale={colorScale}
    />
  </div>
  {#key maskedGeoData.length}
    {#each maskedGeoData as d, i}
      <div
        class:rounded-l={maskedGeoData.length === 1 || i === 0}
        class:rounded-r={maskedGeoData.length === 1 || i === maskedGeoData.length - 1}
        class:border-r-0={maskedGeoData.length > 1 && i !== maskedGeoData.length - 1}
        class="relative border border-contour-weakest overflow-hidden"
        style={`width: ${100 / maskedGeoData.length}%`}
      >
        <MapProvider
          bind:map={maps[i]}
          bounds={bbox(geoShape)}
          {interactive}
          {paint}
          hideLogo={i > 0}
        >
          {#if invertedGeoShape}
            <DataSource data={invertedGeoShape}>
              <!--<PolygonLayer
              before="ocean-fill"
              fillColor={'#fafafa'}
              fill={true}
              fillId="mask"
              lineWidth={0.5}
              lineColor={$theme.color.contour.base}
            />-->
              <PolygonLayer
                before="ocean-fill"
                lineWidth={3}
                lineOffset={1.5}
                lineOpacity={0.07}
                lineColor={$theme.color.contour.base}
              />
              <FilterLayer
                layer="settlement-minor-label"
                geo={geoShape}
              />
              <FilterLayer
                layer="settlement-major-label"
                geo={geoShape}
              />
            </DataSource>
          {/if}
          <DataSource data={d.data}>
            <PolygonLayer
              fill={true}
              line={false}
            />
          </DataSource>
        </MapProvider>
        {#if d.label}
          <div class="absolute top-3 left-1/2 -translate-x-1/2 bg-surface-base/70 px-2 rounded-full text-sm text-contour-base whitespace-nowrap font-bold">
            {d.label}
          </div>
        {/if}
      </div>
    {/each}
  {/key}
  <InteractivityOverlay bind:interactive />
</div>
