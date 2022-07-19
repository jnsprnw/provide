<script>
	import { getContext } from 'svelte';
	import { CURRENT_SECTOR_INDEX, AVAILABLE_INDICATOR_GROUPS } from '$lib/../stores/store.js';
	import Tabs from "$lib/helper/tabs/tabs.svelte";
	import Tab from "$lib/helper/tabs/tab.svelte";
	import TabContent from "$lib/helper/tabs/tab-content.svelte";
	import Indicators from "../indicators/indicators.svelte";
</script>

<div class="sector-selection">
	<Tabs bind:selected={$CURRENT_SECTOR_INDEX}>
		<span class="text-label text-label--bold">Sectors</span>
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
	@import "../../../styles/global.scss";

	.sector-selection {
		@include selection-panel();
	}
</style>