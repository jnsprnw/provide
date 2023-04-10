<script>
  import InteractiveListItem from '$lib/controls/InteractiveListItem.svelte';
  import { RadioGroup, RadioGroupOption } from '@rgossiaux/svelte-headlessui';

  export let current;
  export let items;

  let hoveredItem = null;
</script>

<RadioGroup
  value={current}
  on:change={(e) => (current = e.detail)}
  class="h-96 overflow-scroll"
>
  {#each items as item}
    <RadioGroupOption value={item.uid} let:checked class="overflow-hidden">
      <InteractiveListItem
        {...item}
        bind:hovered={hoveredItem}
        selected={checked}
      />
    </RadioGroupOption>
  {/each}
</RadioGroup>
