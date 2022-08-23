<script>
  import Tabs from '$lib/helper/tabs/Tabs.svelte';
  import Tab from '$lib/helper/tabs/Tab.svelte';
  import TabContent from '$lib/helper/tabs/TabContent.svelte';
  import Countries from './Countries.svelte';
  import {
    CURRENT_GEOGRAPHY_TYPE_INDEX,
    GEOGRAPHY_TYPES,
  } from '$lib/../stores/store.js';
</script>

<div class="geography-selection">
  <span class="intro">
    Select a type of geography and a geography for which you would like to
    explore impacts
  </span>
  <Tabs bind:selected={$CURRENT_GEOGRAPHY_TYPE_INDEX}>
    <span class="text-label text-label--bold">Geographies</span>
    {#each $GEOGRAPHY_TYPES as { label, emoji, isAvailable }}
      <Tab {label} icon={emoji} disabled={!isAvailable} />
    {/each}
    <svelte:fragment slot="content">
      {#each $GEOGRAPHY_TYPES as { uid, label }}
        <TabContent>
          {#if uid === 'admin0'}
            <Countries />
          {:else}
            Other geography: {label}
          {/if}
        </TabContent>
      {/each}
    </svelte:fragment>
  </Tabs>
</div>

<style lang="scss">
  @import '../../../styles/global.scss';

  .geography-selection {
    @include selection-panel();
  }
</style>
