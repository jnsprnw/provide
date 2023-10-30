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
  {#each items as { uid, label, value }}
    <RadioGroupOption
      value={uid}
      let:checked
    >
      <dl
        class:checked
        class="block flex justify-between gap-x-4 items-center px-4 py-1 cursor-pointer hover:bg-surface-weaker focus:bg-surface-weaker"
      >
        <dt>{label}</dt>
        <dd class="text-xs text-text-weaker">{formatValue(value, 'percent')}</dd>
      </dl>
    </RadioGroupOption>
  {/each}
</RadioGroup>
