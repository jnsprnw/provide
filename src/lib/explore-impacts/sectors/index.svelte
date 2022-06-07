<script>
	import { CURRENT_SECTOR } from '$lib/../stores/store.js';
	import { SECTORS_LABELS } from '$lib/../config.js';
	import Tabs from "$lib/helper/tabs/tabs.svelte";
	import Tab from "$lib/helper/tabs/tab.svelte";
	import TabContent from "$lib/helper/tabs/tab-content.svelte";
	import Indicators from "../indicators/indicators.svelte";

	export let sectors = [];

	$: options = sectors.map(value => {
		return {
			value,
			label: SECTORS_LABELS[value]?.label || value,
			indicators: SECTORS_LABELS[value]?.indicators || []
		}
	})
</script>

<div class="sector-selection">
	<span>Sectors:</span>
	<Tabs>
		{#each options as { label }}
	  <Tab {label} />
	  {/each}
	  <svelte:fragment slot="content">
	  	{#each options as { indicators }}
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