<script>
  import { CURRENT_INDICATOR, CURRENT_INDICATOR_UID } from '$stores/state.js';
  import { SECTORS, INDICATORS } from '$stores/meta.js';
  import PopoverSelect from '$lib/controls/PopoverSelect/PopoverSelect.svelte';
  import InteractiveListItem from '$lib/controls/InteractiveListItem.svelte';
  import { RadioGroup, RadioGroupOption } from '@rgossiaux/svelte-headlessui';
  import Tagline from '$lib/helper/Tagline.svelte';

  $: sectors = $SECTORS.filter(
    (sector) =>
      $INDICATORS.filter((indicator) => indicator.sector === sector).length
  );

  let hoveredIndicator = null;
  $: detailsIndicator =
    $INDICATORS.find((d) => d.uid === hoveredIndicator) || $CURRENT_INDICATOR;

  let currentSectorUid = $CURRENT_INDICATOR.sector;
  $: availableIndicators = $INDICATORS.filter(
    (indicator) => indicator.sector === currentSectorUid
  );
</script>

<PopoverSelect
  label="Indicator"
  buttonLabel={$CURRENT_INDICATOR.label}
  panelClass="w-screen max-w-3xl"
  filters={sectors}
  filterKey="sector"
>
  <div class="p-4 bg-background-weaker border-foreground-weakest">
    <Tagline class="mb-2">Sectors</Tagline>
    <RadioGroup
      value={currentSectorUid}
      on:change={(e) => (currentSectorUid = e.detail)}
      class="overflow-scroll flex gap-1.5 flex-wrap"
    >
      {#each sectors as sector}
        <RadioGroupOption value={sector} let:checked>
          <span
            class="bg-background-base px-3 py-1 rounded-full inline-block"
            class:bg-theme-base={checked}
            class:text-background-base={checked}
            class:text-theme-base={!checked}
            class:font-bold={checked}>{sector.label}</span
          >
        </RadioGroupOption>
      {/each}
    </RadioGroup>
  </div>
  <div class="flex grid-flow-col h-80">
    <div class="overflow-scroll border-r border-foreground-weakest w-1/4">
      <Tagline class="mt-4 mb-2 px-5">Indicators</Tagline>
      <RadioGroup
        value={$CURRENT_INDICATOR_UID}
        on:change={(e) => ($CURRENT_INDICATOR_UID = e.detail)}
      >
        {#each availableIndicators as item}
          <RadioGroupOption value={item.uid} let:checked>
            <InteractiveListItem
              {...item}
              bind:hovered={hoveredIndicator}
              selected={checked}
            />
          </RadioGroupOption>
        {/each}
      </RadioGroup>
    </div>

    <div class="p-4 w-3/4">
      <h3 class="font-bold mb-2">{detailsIndicator.label}</h3>
      <p class="text-foreground-weak">{detailsIndicator.description || ''}</p>
    </div>
  </div>
</PopoverSelect>
