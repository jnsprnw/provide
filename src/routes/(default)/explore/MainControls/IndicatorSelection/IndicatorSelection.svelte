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
  import InteractiveListItem from '$lib/controls/InteractiveListItem.svelte';
  import { RadioGroup, RadioGroupOption } from '@rgossiaux/svelte-headlessui';

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

  let hoveredIndicator = null;
  $: detailsIndicator =
    $AVAILABLE_INDICATORS.find((d) => d.uid === hoveredIndicator) ||
    $CURRENT_INDICATOR;
</script>

<PopoverSelect
  label="Indicator"
  buttonLabel={$CURRENT_INDICATOR.label}
  panelPlacement="bottom-end"
  panelClass="flex"
>
  <TabGroup vertical class="flex">
    <div class=" p-4">
      <span class="uppercase tracking-widest text-xs text-theme-weaker"
        >Sectors</span
      >
      <TabList class="flex items-stretch flex-col">
        {#each sectors as sector}
          <Tab class="flex items-stretch" let:selected>
            <InteractiveListItem {...sector} {selected} />
          </Tab>
        {/each}
      </TabList>
    </div>

    <TabPanels>
      {#each sectors as { indicators }}
        <TabPanel
          class="flex bg-background-weaker p-4 border-r border-foreground-weakest"
        >
          <RadioGroup
            value={$CURRENT_INDICATOR_UID}
            on:change={(e) => ($CURRENT_INDICATOR_UID = e.detail)}
            class="h-96 overflow-scroll"
          >
            {#each indicators as item}
              <RadioGroupOption
                value={item.uid}
                let:checked
                class="overflow-hidden"
              >
                <InteractiveListItem
                  {...item}
                  bind:hovered={hoveredIndicator}
                  selected={checked}
                />
              </RadioGroupOption>
            {/each}
          </RadioGroup>
        </TabPanel>
      {/each}
    </TabPanels>
  </TabGroup>
  <div class="bg-background-weaker p-4 w-96">
    <h3 class="font-bold mb-2">{detailsIndicator.label}</h3>
    <p class="text-foreground-weak">{detailsIndicator.description || ''}</p>
  </div>
</PopoverSelect>
