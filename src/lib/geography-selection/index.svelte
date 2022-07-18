<script>
  import { getContext } from 'svelte';
  import Tabs from "$lib/helper/tabs/tabs.svelte";
  import Tab from "$lib/helper/tabs/tab.svelte";
  import TabContent from "$lib/helper/tabs/tab-content.svelte";
  import Country from "./country/index.svelte";
  import City from "./city/index.svelte";

  const { getGeographyTypes } = getContext('meta');
  const geographyTypes = getGeographyTypes();
</script>

<div class="geography-selection">
  <Tabs>
    <span class="text-label text-label--bold">Geographies</span>
    {#each geographyTypes as { label, emoji }}
    <Tab {label} icon={emoji} />
    {/each}
    <svelte:fragment slot="content">
      {#each geographyTypes as { uid, label }}
      <TabContent>
        {#if uid === 'admin0'}
        <Country />
        {:else if uid === 'cities'}
        <City />
        {:else}
        Other geography: { label }
        {/if}
      </TabContent>
      {/each}
    </svelte:fragment>
  </Tabs>
</div>

<style lang="scss">
  .geography-selection {
    margin-top: 2rem;
    margin-bottom: 2rem;
    display: grid;
    grid-template-columns: 1fr 3fr;
    gap: var(--size-spacer-large-xs); // TODO
  }
</style>