<script>
  import { get, isEmpty, map } from 'lodash-es';
  import { onMount } from 'svelte';
  import { geoPath, geoEqualEarth } from 'd3-geo';
  import { feature } from 'topojson-client';
  import * as world from './ne_110m_admin_0_countries.json';
  import { UID_WORLD } from '$src/config.js';

  export let hovered;
  export let selected;

  const MAP_KEY = 'ne_110m_admin_0_countries';

  // Convert the country shapefiles of the geojson. The object key needs to correspond with the file imported above.
  const objects = get(world, ['objects', MAP_KEY], {});
  if (isEmpty(objects)) {
    console.warn('Could not find any countries. The MAP_KEY might be wrong.');
  }
  const mapFeatures = feature(world, objects);

  // Default sizes. Will be changed later
  let width = 100;
  let height = 50;

  let svg;

  // Aspect ratio is 1:1.5
  const ratio = 2;

  $: size = Math.min(width, height * ratio);

  // Set the viewbox based on the size
  $: viewBox = `0 0 ${size} ${size / ratio}`;

  // Select the projection and fit into the current dimensions
  // Centroid from https://dropchop.io/
  // Projection: https://github.com/d3/d3-geo-projection#geoEqualEarth
  // https://en.m.wikipedia.org/wiki/Lambert_azimuthal_equal-area_projection

  $: projection = geoEqualEarth()
    .rotate([0, 0])
    .precision(0.1)
    .fitSize([width, height], mapFeatures);

  // Build map projection function
  $: mapProjection = geoPath().projection(projection);

  // Loop over each country shape
  $: countries = map(get(mapFeatures, 'features', []), (country, i) => {
    // console.log({ mapFeatures })
    // Transform the shape using the transformation
    const d = mapProjection(country);
    // Get the country code and use that to find the country’s data
    const code = get(country, ['properties', 'ADM0_A3']);

    return {
      code,
      d,
    };
  });

  $: selectedCountry = countries.find(({ code }) => code === selected);
  $: hoveredCountry = countries.find(({ code }) => code === hovered);

  // Fetch the map data on mount
  onMount(async () => {
    resizeSVG();
  });

  const resizeSVG = () => {
    ({ width, height } = svg.getBoundingClientRect());
  };
</script>

<figure class="page-map" role="main">
  <svg
    bind:this={svg}
    class="vis"
    {viewBox}
    preserveAspectRatio="xMinYMin meet"
    aria-describedby="map-description"
    role="group"
    fill="currentColor"
  >
    <g>
      <g role="list">
        {#each countries as country}
          <path
            d={country.d}
            class:active={selected === UID_WORLD}
            class:hover={hovered === UID_WORLD}
          />
        {/each}
      </g>
      <g role="list">
        {#if hoveredCountry}
          <path d={hoveredCountry.d} class="hover" />
        {/if}
      </g>
      <g role="list">
        {#if selectedCountry}
          <path d={selectedCountry.d} class="active" />
        {/if}
      </g>
    </g>
    <desc id="map-description">TODO</desc>
  </svg>
</figure>

<style lang="postcss">
  path {
    fill: var(--color-foreground-weakest);
    transition: fill var(--transition-duration-quick) ease-out;

    &.hover {
      fill: var(--color-foreground-base);
    }

    &.active {
      fill: var(--color-functional-accent);
    }
  }
</style>
