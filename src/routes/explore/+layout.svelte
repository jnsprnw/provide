<script>
  import { page } from '$app/stores';
  import ListLink from '$lib/helper/ListLink.svelte';
  import {
    SECTORS,
    INDICATORS,
    GEOGRAPHY_TYPES,
    GEOGRAPHIES,
    SCENARIOS,
    INDICATOR_PARAMETERS,
    UNITS,
  } from '$stores/meta.js';
  import { urlToState } from '$utils/url';

  export let data;

  const { meta } = data;

  GEOGRAPHY_TYPES.set(meta.geographyTypes);
  GEOGRAPHIES.set(meta);
  INDICATORS.set(meta);
  SECTORS.set(meta.sectors);
  SCENARIOS.set(meta.scenarios);
  INDICATOR_PARAMETERS.set(meta.indicatorParameters);
  UNITS.set(meta.units);

  $: urlToState($page.url);

  $: currentPath = $page.routeId || '';
</script>

<nav class="explore-menu container">
  <div class="wrapper">
    <span class="text-label">Explore</span>
    <ul>
      <ListLink {currentPath} link="explore/impacts" loc="location" type="tab">
        <h2 class="title">Impacts</h2>
        <span class="subtitle">Select scenarios and explore impacts</span>
      </ListLink>
      <ListLink
        {currentPath}
        link="explore/scenarios"
        loc="location"
        disabled={true}
        type="tab"
      >
        <h2 class="title">Emission Scenarios</h2>
        <span class="subtitle"
          >Set an impact threshold and explore scenarios</span
        >
      </ListLink>
    </ul>
  </div>
</nav>

<slot />

<style lang="postcss">
  //@import '../../styles/global.scss';

  .explore-menu {
    background-color: var(--color-background-stronger);

    .wrapper {
      //@include tab-nav-wrapper();

      .title {
        font-size: var(--font-size-large-xl);
        font-weight: var(--font-weight-bold);
      }

      .subtitle {
        font-size: var(--font-size-large-m);
        line-height: var(--font-line-height-tightest);
      }
    }
  }
</style>
