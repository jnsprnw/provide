<script>
  import { getContext } from 'svelte';
  import Tabs from "$lib/helper/tabs/tabs.svelte";
  import Tab from "$lib/helper/tabs/tab.svelte";
  import TabContent from "$lib/helper/tabs/tab-content.svelte";
  import Country from "./country/index.svelte";
  import { CURRENT_GEOGRAPHY_TYPE_INDEX } from '$lib/../stores/store.js';

  const { getGeographyTypes } = getContext('meta');
  const geographyTypes = getGeographyTypes();
</script>

<div class="geography-selection">
  <Tabs bind:selected={$CURRENT_GEOGRAPHY_TYPE_INDEX}>
    <span class="text-label text-label--bold">Geographies</span>
    {#each geographyTypes as { label, emoji, isAvailable }}
    <Tab {label} icon={emoji} disabled={!isAvailable} />
    {/each}
    <svelte:fragment slot="content">
      {#each geographyTypes as { uid, label }}
      <TabContent>
        {#if uid === 'admin0'}
        <Country />
        {:else}
        Other geography: { label }
        {/if}
      </TabContent>
      {/each}
    </svelte:fragment>
  </Tabs>
</div>

<style lang="scss">
  @import "../../styles/global.scss";

  .geography-selection {
    @include selection-panel();
  }
</style>