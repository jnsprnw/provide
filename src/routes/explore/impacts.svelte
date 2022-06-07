<script>
	import Tabs from "$lib/helper/tabs/tabs.svelte";
	import Tab from "$lib/helper/tabs/tab.svelte";
	import TabContent from "$lib/helper/tabs/tab-content.svelte";
	import Sectors from "$lib/explore-impacts/sectors/index.svelte";
	import ImpactAnalysis from "$lib/explore-impacts/impact-analysis/index.svelte";
	import MitigationBenefits from "$lib/explore-impacts/mitigation-benefits/index.svelte";
	import Reversibility from "$lib/explore-impacts/reversibility/index.svelte";
	import GeographySelection from "$lib/geography-selection/index.svelte";
	import ScenarioSelection from "$lib/scenario-selection/index.svelte";
</script>

<svelte:head>
	<title>Explore Impacts</title>
</svelte:head>

<h1>Explore Impacts</h1>

<Tabs>
  <Tab label="Geography selection" />
  <Tab label="Scenarios selection" />
  <svelte:fragment slot="content">
    <TabContent>
    	<GeographySelection />
    </TabContent>
    <TabContent>
    	<ScenarioSelection />
    </TabContent>
  </svelte:fragment>
</Tabs>

<Tabs>
  <Tab label="Impact analysis" />
  <Tab label="Mitigation benefits" />
  <Tab label="Reversibility" />
  <svelte:fragment slot="content">
    <TabContent>
    	<Sectors sectors={['terrestrial-climate', 'agriculture']} />
    	<ImpactAnalysis />
    </TabContent>
    <TabContent>
    	<Sectors sectors={['terrestrial-climate', 'marine-climate-and-chemistry', 'agriculture']} />
    	<MitigationBenefits />
    </TabContent>
    <TabContent>
    	<Sectors sectors={['marine-climate-and-chemistry', 'agriculture', 'freshwater-availability', 'terrestrial-ecosystems', 'marine-ecosystems']} />
    	<Reversibility />
    </TabContent>
  </svelte:fragment>
</Tabs>

<style lang="scss">
	@import '../../styles/global.scss';

	span {
		display: block;
	}
</style>