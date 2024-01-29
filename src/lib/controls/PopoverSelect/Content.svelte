<script>
  import InteractiveListItem from '$lib/controls/InteractiveListItem.svelte';
  import { RadioGroup, RadioGroupOption } from '@rgossiaux/svelte-headlessui';
  import Tagline from '$lib/helper/Tagline.svelte';
  import { onMount } from 'svelte';
  import PillGroup from '../PillGroup/PillGroup.svelte';

  export let filters = undefined;
  export let filterKey;
  export let filterLabel;
  export let items = [];
  export let itemsLabel = undefined;
  export let currentUid; // Either string or array of strings
  export let currentFilterUid;
  export let disabledMessage = undefined;
  export let allowWrap = false;

  let hoveredItem = null;

  $: current = items.find((d) => d.uid === currentUid || (currentUid ?? []).includes(d.uid));

  // Since we don't have external state that keeps track of which filter was selected
  // we defer the selected filter from the currently selected items
  onMount(() => {
    if (typeof filters !== 'undefined') {
      // Some basic drop downs like the location selection don’t have filters
      if (current) {
        // If there is a currently selected item (indicator, …)
        // We try to get the currentFilterUid from that item from the filter key
        currentFilterUid = current[filterKey];
      }
      if ((current && !currentFilterUid) || !current) {
        // For some reason, the above did not work and we still could not find the currentFilterUid
        // We loop through the list of filters and select the first one that is not disabled
        currentFilterUid = filters.find(({ disabled }) => !disabled)?.uid;
      }
      if (!currentFilterUid) {
        console.warn(`Could not find any item in list of filters.`);
      }
    }
  });

  $: detailsItem = items.find((d) => d.uid === hoveredItem) || current;

  $: availableItems = currentFilterUid ? items.filter((item) => item[filterKey] === currentFilterUid) : items;
</script>

{#if filters}
  <div class="p-4 bg-surface-weaker border-contour-weakest flex items-center justify-between">
    <div>
      <Tagline class="mb-2">{filterLabel}</Tagline>
      <PillGroup bind:currentUid={currentFilterUid} options={filters} {disabledMessage} {allowWrap} />
    </div>
    <slot name="header-link" />
  </div>
{/if}
<slot name="items" items={availableItems} {currentFilterUid}>
  <div class="grid grid-cols-1 md:grid-cols-[1fr_3fr] min-h-[20rem]">
    <div class="md:border-r border-contour-weakest">
      {#if itemsLabel}<Tagline class="mt-4 mb-2 px-5">{itemsLabel}</Tagline>{/if}
      <RadioGroup bind:value={currentUid} on:change={(e) => (currentUid = e.detail)}>
        {#if availableItems.length}
          {#each availableItems as { icon, uid, label }}
            <RadioGroupOption value={uid} let:checked>
              <InteractiveListItem {icon} {uid} {label} bind:hovered={hoveredItem} selected={checked} />
            </RadioGroupOption>
          {/each}
        {:else}
          <span class="text-xs py-1 px-5 block text-text-weaker" role="status">No indicators are available for this sector and geography.</span>
        {/if}
      </RadioGroup>
    </div>
    {#if detailsItem}
      <div class="p-4 hidden md:block">
        <h3 class="font-bold mb-2">{detailsItem.label}</h3>
        <p class="text-contour-weak">{@html detailsItem.description || ''}</p>
      </div>
    {/if}
  </div>
</slot>
