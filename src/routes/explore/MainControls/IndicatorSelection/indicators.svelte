<script>
  import { RadioGroup, RadioGroupOption } from '@rgossiaux/svelte-headlessui';

  export let current;
  export let items;

  let hoveredItem = null;
</script>

<div>
  <RadioGroup
    value={current}
    on:change={(e) => (current = e.detail)}
    class="h-96 overflow-scroll"
  >
    {#each items as item}
      <RadioGroupOption value={item.uid} let:checked>
        <div
          class:text-theme-base={checked}
          on:focus={() => (hoveredItem = item?.uid)}
          on:mouseover={() => (hoveredItem = item?.uid)}
          on:mouseleave={() => (hoveredItem = undefined)}
        >
          {item.label}
        </div>
      </RadioGroupOption>
    {/each}
  </RadioGroup>
</div>
