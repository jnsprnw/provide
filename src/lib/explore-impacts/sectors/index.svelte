<script>
	import { getContext } from 'svelte';
	import { CURRENT_SECTOR_INDEX, AVAILABLE_INDICATOR_GROUPS } from '$lib/../stores/store.js';
	import Tabs from "$lib/helper/tabs/tabs.svelte";
	import Tab from "$lib/helper/tabs/tab.svelte";
	import TabContent from "$lib/helper/tabs/tab-content.svelte";
	import Indicators from "../indicators/indicators.svelte";

	// const { getSectors, getIndicators } = getContext('meta');
 //  const sectors = getSectors();
 //  const all_indicators = getIndicators();

	// $: options = sectors.map(sector => {
	// 	const indicators = all_indicators.filter(({ sector: s }) => s === sector.uid); // Move this to impacts.svelte?
	// 	return {
	// 		...sector,
	// 		indicators
	// 	}
	// })
</script>

<div class="sector-selection">
	<span>Sectors:</span>
	<Tabs bind:selected={$CURRENT_SECTOR_INDEX}>
		{#each $AVAILABLE_INDICATOR_GROUPS as { sector }}
	  <Tab label={sector.label} icon={sector.icon} />
	  {/each}
	  <svelte:fragment slot="content">
	  	{#each $AVAILABLE_INDICATOR_GROUPS as { indicators }}
	    <TabContent>
	    	<Indicators {indicators} />
	    </TabContent>
	    {/each}
	  </svelte:fragment>
	</Tabs>
</div>

<style lang="scss">
	.sector-selection {
		margin-top: 2rem;
	}
</style>