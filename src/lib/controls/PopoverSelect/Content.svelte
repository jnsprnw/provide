<script>
  import InteractiveListItem from '$lib/controls/InteractiveListItem.svelte';
  import { RadioGroup, RadioGroupOption } from '@rgossiaux/svelte-headlessui';
  import Tagline from '$lib/helper/Tagline.svelte';
  import { onMount } from 'svelte';
  import PillGroup from '../PillGroup/PillGroup.svelte';

  export let filters;
  export let filterKey;
  export let filterLabel;
  export let items;
  export let itemsLabel;
  export let currentUid; // Either string or array of strings
  export let currentFilterUid;

  $: current = items.find(
    (d) => d.uid === currentUid || currentUid.includes(d.uid)
  );

  // Since we don't have external state that keeps track of which filter was selected
  // we defer the selected filter from the currently selected items
  onMount(() => {
    currentFilterUid = current?.[filterKey] || filters[0].uid;
  });

  let hoveredItem = null;
  $: detailsItem = items.find((d) => d.uid === hoveredItem) || current;

  $: availableItems = items.filter(
    (item) => item[filterKey] === currentFilterUid
  );
</script>

{#if filters.length > 1}
  <div
    class="p-4 bg-background-weaker border-foreground-weakest flex items-center justify-between"
  >
    <div>
      <Tagline class="mb-2">{filterLabel}</Tagline>
      <PillGroup bind:currentUid={currentFilterUid} options={filters} />
    </div>
    <slot name="header-link" />
  </div>
{/if}
<slot name="items" items={availableItems} {currentFilterUid}>
  <div class="grid grid-cols-1 md:grid-cols-[1fr_3fr] min-h-[20rem]">
    <div class="overflow-scroll md:border-r border-foreground-weakest">
      {#if itemsLabel}<Tagline class="mt-4 mb-2 px-5">{itemsLabel}</Tagline
        >{/if}
      <RadioGroup value={currentUid} on:change={(e) => (currentUid = e.detail)}>
        {#each availableItems as item}
          <RadioGroupOption value={item.uid} let:checked>
            <InteractiveListItem
              {...item}
              bind:hovered={hoveredItem}
              selected={checked}
            />
          </RadioGroupOption>
        {/each}
      </RadioGroup>
    </div>

    <div class="p-4 hidden md:block">
      <h3 class="font-bold mb-2">{detailsItem.label}</h3>
      <p class="text-foreground-weak">{detailsItem.description || ''}</p>
    </div>
  </div>
</slot>
