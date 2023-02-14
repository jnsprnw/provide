<script>
  import { page } from '$app/stores';
  import { parse } from 'qs';
  import ListLink from '$lib/helper/ListLink.svelte';
  import {
    SECTORS,
    INDICATORS,
    GEOGRAPHY_TYPES,
    GEOGRAPHIES,
    SCENARIOS,
    INDICATOR_PARAMETERS,
    CURRENT_INDICATOR_UID,
    CURRENT_GEOGRAPHY_UID,
    CURRENT_SCENARIOS_UID,
    UNITS,
  } from '$stores/store.js';
  import { browser } from '$app/environment';

  export let data;

  const { meta } = data;

  GEOGRAPHY_TYPES.set(meta.geographyTypes);
  INDICATORS.set(meta);
  SECTORS.set(meta.sectors);
  SCENARIOS.set(meta.scenarios);
  GEOGRAPHIES.set(meta);
  INDICATOR_PARAMETERS.set(meta.indicatorParameters);
  UNITS.set(meta.units);

  $: currentURL = new URL($page.url);

  $: params = parse(currentURL.search.replace(/^\?/, ''));

  $: urlToStateMapping = {
    indicator: CURRENT_INDICATOR_UID,
    geography: CURRENT_GEOGRAPHY_UID,
    scenarios: CURRENT_SCENARIOS_UID,
  };

  $: {
    const { indicator, geography, scenarios } = params;
    let newUrl = currentURL;
    if (indicator) {
      newUrl.searchParams.delete('indicator');
      CURRENT_INDICATOR_UID.set(indicator);
    }
    if (geography) {
      newUrl.searchParams.delete('geography');
      CURRENT_GEOGRAPHY_UID.set(geography);
    }
    if (scenarios) {
      scenarios.forEach((s, i) => {
        newUrl.searchParams.delete(`scenarios[${i}]`);
      });
      CURRENT_SCENARIOS_UID.set(scenarios);
    }
    if (browser) window.history.replaceState(null, null, newUrl.href);
  }

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

<style lang="scss">
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
