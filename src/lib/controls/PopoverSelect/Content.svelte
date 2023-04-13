<script>
  import InteractiveListItem from '$lib/controls/InteractiveListItem.svelte';
  import { RadioGroup, RadioGroupOption } from '@rgossiaux/svelte-headlessui';
  import Tagline from '$lib/helper/Tagline.svelte';

  export let filters;
  export let filterKey;
  export let filtersLabel;
  export let itemsLabel;
  export let currentUid;
  export let items;

  $: current = items.find((d) => d.uid === currentUid);
  let currentFilterUid = current[filterKey];
  let hoveredItem = null;
  $: detailsItem = items.find((d) => d.uid === hoveredItem) || current;

  $: availableItems = items.filter(
    (item) => item[filterKey] === currentFilterUid
  );
</script>

<div class="p-4 bg-background-weaker border-foreground-weakest">
  <Tagline class="mb-2">{filtersLabel}</Tagline>
  <RadioGroup
    value={currentFilterUid}
    on:change={(e) => (currentFilterUid = e.detail)}
    class="overflow-scroll flex gap-1.5 flex-wrap"
  >
    {#each filters as filter}
      <RadioGroupOption value={filter.uid} let:checked>
        <span
          class="bg-background-base px-3 py-1 rounded-full inline-block"
          class:bg-theme-base={checked}
          class:text-background-base={checked}
          class:text-theme-base={!checked}
          class:font-bold={checked}>{filter.label}</span
        >
      </RadioGroupOption>
    {/each}
  </RadioGroup>
</div>
<div class="flex grid-flow-col h-80">
  <div class="overflow-scroll border-r border-foreground-weakest w-1/4">
    <Tagline class="mt-4 mb-2 px-5">{itemsLabel}</Tagline>
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

  <div class="p-4 w-3/4">
    <h3 class="font-bold mb-2">{detailsItem.label}</h3>
    <p class="text-foreground-weak">{detailsItem.description || ''}</p>
  </div>
</div>
