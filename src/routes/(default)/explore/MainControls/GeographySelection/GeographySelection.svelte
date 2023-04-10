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
  import InteractiveListItem from '$lib/controls/InteractiveListItem.svelte';
</script>

<PopoverSelect label="Geography" buttonLabel={$CURRENT_GEOGRAPHY.label}>
  <TabGroup
    vertical
    class="flex"
    bind:selectedIndex={$CURRENT_GEOGRAPHY_TYPE_INDEX}
  >
    <TabList class="flex items-stretch flex-col p-4">
      {#each $GEOGRAPHY_TYPES as type}
        <Tab class="flex items-stretch" let:selected>
          <InteractiveListItem {...type} icon={type.emoji} {selected} />
        </Tab>
      {/each}
    </TabList>
    <TabPanels>
      {#each $GEOGRAPHY_TYPES as { uid, label }}
        <TabPanel class="flex bg-background-weaker">
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
