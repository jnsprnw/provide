<script>
	import { CURRENT_INDICATOR } from '$lib/../stores/store.js';
	import Tabs from "$lib/explore-impacts/tabs/tabs.svelte";
	import Tab from "$lib/explore-impacts/tabs/tab.svelte";
	import TabContent from "$lib/explore-impacts/tabs/tab-content.svelte";
	import Sectors from "$lib/explore-impacts/sectors/sectors.svelte";
</script>

<svelte:head>
	<title>Explore Impacts</title>
</svelte:head>

<h1>Explore Impacts</h1>

<Tabs>
  <Tab label="Impact analysis" />
  <Tab label="Mitigation benefits" />
  <Tab label="Reversibility" />
  <svelte:fragment slot="content">
    <TabContent>
    	<Sectors sectors={['terrestrial-climate', 'agriculture']} />
    	<!-- Impact analysis -->
    </TabContent>
    <TabContent>
    	<Sectors sectors={['terrestrial-climate', 'marine-climate-and-chemistry', 'agriculture']} />
    	<!-- Mitigation benefits -->
    </TabContent>
    <TabContent>
    	<Sectors sectors={['marine-climate-and-chemistry', 'agriculture', 'freshwater-availability', 'terrestrial-ecosystems', 'marine-ecosystems']} />
    	<!-- Reversibility -->
    </TabContent>
  </svelte:fragment>
</Tabs>

<span>Indicator: { $CURRENT_INDICATOR }</span>

<style lang="scss">
	@import '../../styles/global.scss';

	span {
		display: block;
	}
</style>