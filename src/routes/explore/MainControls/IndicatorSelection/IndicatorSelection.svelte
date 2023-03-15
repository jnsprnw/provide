<script>
  import {
    AVAILABLE_INDICATORS,
    CURRENT_INDICATOR,
    CURRENT_INDICATOR_UID,
  } from '$stores/state.js';
  import { SECTORS } from '$stores/meta.js';
  import {
    Tab,
    TabGroup,
    TabList,
    TabPanel,
    TabPanels,
  } from '@rgossiaux/svelte-headlessui';
  import PopoverSelect from '$lib/controls/PopoverSelect/PopoverSelect.svelte';
  import Indicators from './Indicators.svelte';
  import IndicatorParameters from './IndicatorParameters.svelte';

  $: sectors = $SECTORS.map((sector) => {
    const indicators = $AVAILABLE_INDICATORS.filter(
      (indicator) => indicator.sector === sector.uid
    );
    return {
      ...sector,
      disabled: indicators.length === 0,
      indicators,
    };
  });
</script>

<PopoverSelect label="Indicator" buttonLabel={$CURRENT_INDICATOR.label}>
  <TabGroup slot="panel" vertical class="flex">
    <span class="text-label text-bold">Sectors</span>
    <TabList class="flex flex-col">
      {#each sectors as { label, icon, disabled }}
        <Tab>
          {icon}
          {label}
        </Tab>
      {/each}
    </TabList>
    <TabPanels>
      {#each sectors as { indicators }}
        <TabPanel class="flex">
          <Indicators
            items={indicators}
            bind:current={$CURRENT_INDICATOR_UID}
          />
        </TabPanel>
      {/each}
    </TabPanels>
  </TabGroup>
</PopoverSelect>
<div class="indicator-parameters"><IndicatorParameters /></div>
