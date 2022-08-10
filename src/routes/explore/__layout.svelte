<script context="module">
  import { loadFromAPI } from '$lib/../routes/api/utils.js';

  export const load = async ({ fetch }) => {
    const meta = await loadFromAPI('/api/meta', '', fetch);
    return {
      props: {
        meta,
      },
    };
  };
</script>

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
  } from '$lib/../stores/store.js';

  export let meta;

  GEOGRAPHY_TYPES.set(meta.geographyTypes);
  INDICATORS.set(meta);
  SECTORS.set(meta.sectors);
  SCENARIOS.set(meta.scenarios);
  GEOGRAPHIES.set(meta);
  INDICATOR_PARAMETERS.set(meta.indicatorParameters);

  $: params = parse(new URL($page.url).search.replace(/^\?/, ''));

  $: {
    const { indicator, geography, scenario } = params;
    if (indicator) {
      CURRENT_INDICATOR_UID.set(indicator);
    }
    if (geography) {
      CURRENT_GEOGRAPHY_UID.set(geography);
    }
    if (scenario) {
      CURRENT_SCENARIOS_UID.set([scenario]);
    }
  }

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
