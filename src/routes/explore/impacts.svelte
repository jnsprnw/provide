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
	import { setContext } from 'svelte';
	import Tabs from "$lib/helper/tabs/tabs.svelte";
	import Tab from "$lib/helper/tabs/tab.svelte";
	import TabPrimary from "$lib/helper/tabs/tabPrimary.svelte";
	import TabContent from "$lib/helper/tabs/tab-content.svelte";
	import Sectors from "$lib/explore-impacts/sectors/index.svelte";
	import ImpactAnalysis from "$lib/explore-impacts/impact-analysis/index.svelte";
	import MitigationBenefits from "$lib/explore-impacts/mitigation-benefits/index.svelte";
	import Reversibility from "$lib/explore-impacts/reversibility/index.svelte";
	import GeographySelection from "$lib/geography-selection/index.svelte";
	import ScenarioSelection from "$lib/scenario-selection/index.svelte";
	import { CURRENT_GEOGRAPHY, CURRENT_SCENARIOS, CURRENT_INDICATOR, GEOGRAPHY_TYPES } from '$lib/../stores/store.js';

	export let meta;

	GEOGRAPHY_TYPES.set(meta.geographyTypes);

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
</script>

<svelte:head>
	<title>Explore Impacts</title>
</svelte:head>

<div class="impacts-header container">
	<div class="wrapper">
		<div class="explore-intro">
			<p class="explore-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
		</div>
	</div>
</div>

<div class="impacts-selection container">
	<div class="wrapper">
		<Tabs class="impact-tabs">
		  <TabPrimary label="Geography" selectedValues={$CURRENT_GEOGRAPHY} missingValue="Select a geography" />
		  <TabPrimary label="Scenarios" selectedValues={$CURRENT_SCENARIOS} missingValue="Select at least one scenario" disabled={$CURRENT_GEOGRAPHY === null} />
		  <TabPrimary label="Indicator" selectedValues={$CURRENT_INDICATOR} missingValue="Select an indicator" disabled={Boolean($CURRENT_SCENARIOS)} />
		  <svelte:fragment slot="content">
		    <TabContent>
		    	<GeographySelection />
		    </TabContent>
		    <TabContent>
		    	<ScenarioSelection />
		    </TabContent>
		    <TabContent>
		    	<Sectors />
		    </TabContent>
		  </svelte:fragment>
		</Tabs>
	</div>
</div>

<div class="impacts-analysis container">
	<div class="wrapper">

		{#if $CURRENT_GEOGRAPHY === null || $CURRENT_SCENARIOS === []}
			<p>Please select a geography and a scenario</p>
		{:else}
		<Tabs class="analysis-tabs">
		  <Tab label="Impact analysis" />
		  <Tab label="Mitigation benefits" />
		  <Tab label="Reversibility" />
		  <svelte:fragment slot="content">
		    <TabContent>
		    	<ImpactAnalysis />
		    </TabContent>
		    <TabContent>
		    	<MitigationBenefits />
		    </TabContent>
		    <TabContent>
		    	<Reversibility />
		    </TabContent>
		  </svelte:fragment>
		</Tabs>
		{/if}
	</div>
</div>

<style lang="scss">
	@import '../../styles/global.scss';

	span {
		display: block;
	}

	.impacts-header {
		background-color: var(--color-light-blue100);
		padding: 2rem 0; // TODO
	}

	.impacts-selection {
		border-bottom: 1px solid var(--color-light-blue200);
	}

	.explore-description {
		font-size: var(--font-size-large-l);
		line-height: var(--font-line-height-base);
		color: var(--color-light-blue700);
	}
</style>