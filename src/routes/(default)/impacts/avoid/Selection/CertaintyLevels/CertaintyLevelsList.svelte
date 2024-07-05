<script>
  import { RadioGroup, RadioGroupOption } from '@rgossiaux/svelte-headlessui';
  import { formatValue } from '$lib/utils/formatting';

  export let items;

  export let selected;
</script>

<RadioGroup
  bind:value={selected}
  class="grid grid-col"
>
  {#each items as { uid, value }}
    <RadioGroupOption
      value={uid}
      let:checked
    >
      <span
        class:checked
        class="block px-4 py-1 cursor-pointer hover:bg-surface-weaker focus:bg-surface-weaker"
      >
        {formatValue(value, 'percent')}
      </span>
    </RadioGroupOption>
  {/each}
</RadioGroup>
