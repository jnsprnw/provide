<script context="module">
  export const load = async ({ fetch }) => {
    const res = await fetch(`${import.meta.env.VITE_DATA_API_URL}/meta/`);
    //const res = await fetch(`/api/meta/`);
    const data = await res.json();
    return {
      props: {
        meta: data,
      },
    };
  };
</script>

<script>
  import { page } from '$app/stores';
  import ListLink from '$lib/helper/ListLink.svelte';
  import { setContext } from 'svelte';
  import {
    SECTORS,
    INDICATORS,
    GEOGRAPHY_TYPES,
    GEOGRAPHIES,
    AVAILABLE_SCENARIOS,
  } from '$lib/../stores/store.js';

  export let meta;

  GEOGRAPHY_TYPES.set(meta.geographyTypes);
  INDICATORS.set(meta.indicators);
  SECTORS.set(meta.sectors);
  AVAILABLE_SCENARIOS.set(meta.scenarios);
  GEOGRAPHIES.set(meta);

  setContext('meta', {
    getGeographyTypes: () => meta.geographyTypes,
    getContinents: () => meta.continents,
    getAdmin0: () => meta.admin0,
    getAdmin1: () => meta.admin1,
    getCities: () => meta.cities,
    getIconicRegions: () => meta.iconicRegions,
    getScenarios: () => meta.scenarios,
    getUnits: () => meta.units,
    getSectors: () => meta.sectors,
    getIndicators: () => meta.indicators,
  });

  $: currentPath = $page.routeId || '';
</script>

<nav class="explore-menu container">
  <div class="wrapper">
    <span class="text-label">Explore</span>
    <ul>
      <ListLink {currentPath} link="explore/impacts" loc="location" type="tab">
        <h2 class="title">Explore Impacts</h2>
        <span class="subtitle">Select scenarios and explore impacts</span>
      </ListLink>
      <ListLink
        {currentPath}
        link="explore/scenarios"
        loc="location"
        disabled={true}
        type="tab"
      >
        <h2 class="title">Explore Scenarios</h2>
        <span class="subtitle"
          >Set an impact threshold and explore scenarios</span
        >
      </ListLink>
    </ul>
  </div>
</nav>

<slot />

<style lang="scss">
  @import '../../styles/global.scss';

  .explore-menu {
    padding-top: 2rem; // TODO
    background-color: var(--color-light-blue100);

    .wrapper {
      @include tab-nav-wrapper();

      .title {
        font-size: var(--font-size-large-xl);
      }

      .subtitle {
        font-size: var(--font-size-large-m);
        line-height: var(--font-line-height-tightest);
      }
    }
  }
</style>
