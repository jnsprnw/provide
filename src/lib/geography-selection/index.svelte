<script>
  import Tabs from "$lib/helper/tabs/tabs.svelte";
  import Tab from "$lib/helper/tabs/tab.svelte";
  import TabContent from "$lib/helper/tabs/tab-content.svelte";
  import Country from "./country/index.svelte";
  import City from "./city/index.svelte";
</script>

<div class="geography-selection">
  <Tabs>
    <Tab label="Countries" />
    <Tab label="Cities" />
    <Tab label="Key regions" />
    <Tab label="Glaciers" />
    <Tab label="Other" />
    <svelte:fragment slot="content">
      <TabContent>
      	<Country />
      </TabContent>
      <TabContent>
      	<City />
      </TabContent>
      <TabContent>
        Key regions
      </TabContent>
      <TabContent>
        Glaciers
      </TabContent>
      <TabContent>
        Other
      </TabContent>
    </svelte:fragment>
  </Tabs>
</div>

<style lang="scss">
  .geography-selection {
    margin-top: 2rem;
    margin-bottom: 2rem;
  }
</style>