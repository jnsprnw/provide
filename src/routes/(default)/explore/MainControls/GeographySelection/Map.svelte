<script>
  import { get, isEmpty, map } from 'lodash-es';
  import { geoPath, geoEqualEarth } from 'd3-geo';
  import { UID_WORLD } from '$src/config.js';
  import { rewind } from '$lib/utils/geo';

  export let hovered;
  export let selected;
  export let data;

  // Default sizes. Will be changed later
  let width = 100;
  let height = 50;

  $: rewoundData = rewind(data);

  // Aspect ratio is 1:1.5
  const ratio = 2;

  $: size = Math.min(width, height * ratio);

  // Set the viewbox based on the size
  $: viewBox = `0 0 ${size} ${size / ratio}`;

  $: projection = geoEqualEarth()
    .rotate([0, 0])
    .precision(0.1)
    .fitSize([width, height], rewoundData);

  // Build map projection function
  $: mapProjection = geoPath().projection(projection);

  // Loop over each country shape
  $: countries = rewoundData.features.map((country, i) => ({
    code: country.properties.uid,
    d: mapProjection(country),
  }));

  $: selectedCountry = countries.find(({ code }) => code === selected);
  $: hoveredCountry = countries.find(({ code }) => code === hovered);
</script>

<figure
  class="w-full h-full"
  role="main"
  bind:clientHeight={height}
  bind:clientWidth={width}
>
  <svg
    {width}
    {height}
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
            class="fill-background-weakest stroke-background-base stroke-[0.5]"
            class:fill-theme-weaker={selected === UID_WORLD}
            class:fill-theme-base={hovered === UID_WORLD}
          />
        {/each}
      </g>
      <g role="list">
        {#if hoveredCountry}
          <path d={hoveredCountry.d} class="fill-foreground-weaker" />
        {/if}
      </g>
      <g role="list">
        {#if selectedCountry}
          <path d={selectedCountry.d} class="fill-theme-base" />
        {/if}
      </g>
    </g>
    <desc id="map-description">TODO</desc>
  </svg>
</figure>
