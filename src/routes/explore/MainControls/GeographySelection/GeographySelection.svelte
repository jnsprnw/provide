<script>
  // import Tabs from '$lib/helper/tabs/Tabs.svelte';
  // import Tab from '$lib/helper/tabs/Tab.svelte';
  // import TabContent from '$lib/helper/tabs/TabContent.svelte';
  import Geographies from './Geographies.svelte';
  import {
    CURRENT_GEOGRAPHY_TYPE_INDEX,
    CURRENT_GEOGRAPHY_UID,
    CURRENT_GEOGRAPHY,
    CURRENT_GEOGRAPHIES,
  } from '$stores/state.js';
  import { GEOGRAPHY_TYPES } from '$stores/meta.js';

  import {
    Popover,
    PopoverButton,
    PopoverPanel,
  } from '@rgossiaux/svelte-headlessui';
  import { createPopperActions } from 'svelte-popperjs';

  import {
    Tab,
    TabGroup,
    TabList,
    TabPanel,
    TabPanels,
  } from '@rgossiaux/svelte-headlessui';

  const [popperRef, popperContent] = createPopperActions();

  const popperOptions = {
    placement: 'bottom-start',
    strategy: 'fixed',
    modifiers: [{ name: 'offset', options: { offset: [0, 10] } }],
  };
</script>

<Popover style="position: relative;">
  <!-- TODO: How to bind label to select button? -->
  <label>Geography</label>
  <PopoverButton use={[popperRef]}>
    <span>{$CURRENT_GEOGRAPHY.label}</span>
  </PopoverButton>

  <PopoverPanel use={[[popperContent, popperOptions]]}>
    <div class="bg-background-base">
      <TabGroup
        vertical
        class="flex"
        on:change={(e) => ($CURRENT_GEOGRAPHY_TYPE_INDEX = e.detail)}
      >
        <TabList class="flex flex-col">
          {#each $GEOGRAPHY_TYPES as { label, emoji, isAvailable }}
            <Tab>
              {emoji}
              {label}
            </Tab>
          {/each}
        </TabList>
        <TabPanels>
          {#each $GEOGRAPHY_TYPES as { uid, label }}
            <TabPanel class="flex">
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
    </div>
  </PopoverPanel>
</Popover>
