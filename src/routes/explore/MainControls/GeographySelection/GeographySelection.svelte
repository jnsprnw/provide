<script>
  import Geographies from './Geographies.svelte';
  import {
    CURRENT_GEOGRAPHY_TYPE_INDEX,
    CURRENT_GEOGRAPHY_UID,
    CURRENT_GEOGRAPHY,
    CURRENT_GEOGRAPHIES,
  } from '$stores/state.js';
  import { GEOGRAPHY_TYPES } from '$stores/meta.js';

  import {
    Tab,
    TabGroup,
    TabList,
    TabPanel,
    TabPanels,
  } from '@rgossiaux/svelte-headlessui';
  import PopoverSelect from '$lib/controls/PopoverSelect/PopoverSelect.svelte';
</script>

<PopoverSelect label="Geography" buttonLabel={$CURRENT_GEOGRAPHY.label}>
  <TabGroup
    slot="panel"
    vertical
    class="flex"
    on:change={(e) => ($CURRENT_GEOGRAPHY_TYPE_INDEX = e.detail)}
  >
    <TabList class="flex flex-col p-6">
      {#each $GEOGRAPHY_TYPES as { label, emoji, isAvailable }}
        <Tab class="flex">
          {emoji}
          {label}
        </Tab>
      {/each}
    </TabList>
    <TabPanels>
      {#each $GEOGRAPHY_TYPES as { uid, label }}
        <TabPanel class="flex bg-background-weaker p-6">
          {#if uid === 'admin0'}
            <Geographies
              items={$CURRENT_GEOGRAPHIES}
              bind:current={$CURRENT_GEOGRAPHY_UID}
            />
          {:else}
            Other geography: {label}
          {/if}
        </TabPanel>
      {/each}
    </TabPanels>
  </TabGroup>
</PopoverSelect>
