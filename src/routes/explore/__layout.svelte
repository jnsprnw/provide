<script context="module">
	export const load = async ({ fetch }) => {
		const res = await fetch("/api/meta");
		const data = await res.json();
		// console.log(data)
		return {
			props: {
				meta: data
			}
		}
	}
</script>

<script>
  import { page } from '$app/stores';
  import ListLink from "$lib/helper/ListLink.svelte";
  import { setContext } from 'svelte';
  import { SECTORS, INDICATORS, GEOGRAPHY_TYPES } from '$lib/../stores/store.js';

  export let meta;

  GEOGRAPHY_TYPES.set(meta.geographyTypes);
	INDICATORS.set(meta.indicators);
	SECTORS.set(meta.sectors);

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
		getIndicators: () => meta.indicators
	});

  $: currentPath = $page.routeId || '';
</script>

<nav class="explore-menu container">
  <div class="wrapper">
    <span class="explore-caption">Explore</span>
    <ul>
      <ListLink {currentPath} link="explore/impacts" loc="location" type="primary">
        <h2 class="explore-title">Explore Impacts</h2>
        <span class="explore-subtitle">Select scenarios and explore impacts</span>
      </ListLink>
      <ListLink {currentPath} link="explore/scenarios" loc="location" disabled={true} type="primary">
        <h2>Explore Scenarios</h2>
        <span>Set an impact threshold and explore scenarios</span>
      </ListLink>
    </ul>
  </div>
</nav>

<slot />

<style lang="scss">
	.explore-caption {
    font-size: var(--font-size-large-s);
    text-transform: var(--font-text-case-uppercase);
    letter-spacing: var(--font-letter-spacing-looser);
    color: var(--color-light-blue600);
  }

  .explore-title {
    font-size: var(--font-size-large-xl);
    font-weight: var(--font-font-weight-bold);
  }

  .explore-subtitle {
    font-size: var(--font-size-large-m);
    line-height: var(--font-line-height-tightest);
  }

  nav ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .explore-menu {
    padding-top: 2rem; // TODO
    background-color: var(--color-light-blue100);

    ul {
      display: flex;
      gap: var(--font-size-large-l);
    }
  }

  // .page-main {
  //   padding-top: 2rem; // TODO
  // }

  .explore-menu {
    .wrapper {
      border-bottom: 1px solid var(--color-light-blue300); // TODO
    }
  }
</style>