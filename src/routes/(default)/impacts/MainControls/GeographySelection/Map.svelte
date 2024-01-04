<script>
  import { geoPath, geoEqualEarth, geoCentroid } from 'd3-geo';
  import { UID_WORLD } from '$src/config.js';
  import { rewind } from '$lib/utils/geo';
  // import rewind from '@mapbox/geojson-rewind';
  import { geoGraticule } from 'd3-geo';
  import { point } from '@turf/helpers';
  import { every } from 'lodash-es';

  export let hovered;
  export let selected;
  export let dataLayer;
  export let baseLayer;

  // Default sizes. Will be changed later
  let width = 100;
  let height = 50;

  $: rewoundData = rewind(dataLayer);
  $: rewoundBaseLayer = rewind(baseLayer);

  const graticuleGenerator = geoGraticule();

  $: projection = geoEqualEarth().rotate([0, 0]).precision(0.1).fitSize([width, height], graticuleGenerator.outline());

  $: graticuleLines = graticuleGenerator.lines().map(project);
  $: graticuleOutline = project(graticuleGenerator.outline());

  // Build map projection function
  $: project = geoPath().pointRadius(2.5).projection(projection);

  // Loop over each country shape
  $: dataLayerShapes = rewoundData.features.map((feature, i) => {
    const area = project.area(feature);
    let shape = feature;
    if (area < 8) {
      shape = point(geoCentroid(feature), feature.properties);
    }
    const { uid } = feature.properties;

    if (uid === hovered || uid === selected) project.pointRadius(5);
    else project.pointRadius(2.5);
    return {
      uid,
      type: shape.geometry.type,
      d: project(shape),
    };
  });

  $: pointsOnly = every(dataLayerShapes, (d) => d.type === 'Point');

  $: baseLayerShapes = rewoundBaseLayer.features.map((feature, i) => {
    return {
      d: project(feature),
    };
  });

  $: selectedFeature = dataLayerShapes.find(({ uid }) => uid === selected);
  $: hoveredFeature = dataLayerShapes.find(({ uid }) => uid === hovered);
</script>

<figure class="w-full h-full" role="main" bind:clientHeight={height} bind:clientWidth={width}>
  <svg {width} {height} class="vis" aria-describedby="map-description" role="group" fill="currentColor">
    <g>
      {#each graticuleLines as line}
        <path d={line} class="stroke-contour-weakest fill-none stroke-[0.5]" />
      {/each}
    </g>
    <g role="list">
      {#each baseLayerShapes as shape}
        <path d={shape.d} class="fill-surface-weakest stroke-surface-base stroke-[0.5]" />
      {/each}
    </g>
    <g role="list">
      {#each dataLayerShapes as shape}
        <path
          d={shape.d}
          class:fill-contour-weaker={pointsOnly}
          class:fill-surface-weakest={!pointsOnly}
          class="stroke-surface-base stroke-[0.5]"
          class:fill-theme-weaker={selected === UID_WORLD}
          class:fill-theme-base={hovered === UID_WORLD}
        />
      {/each}
    </g>
    <g role="list">
      {#if hoveredFeature}
        <path d={hoveredFeature.d} class="fill-contour-weak stroke-surface-base stroke-1" />
      {/if}
    </g>
    <g role="list">
      {#if selectedFeature}
        <path d={selectedFeature.d} class="fill-theme-base stroke-surface-base stroke-1" />
      {/if}
    </g>
    <path d={graticuleOutline} class="stroke-contour-weak stroke-1 fill-none linejoin-round" />
    <desc id="map-description">TODO</desc>
  </svg>
</figure>
