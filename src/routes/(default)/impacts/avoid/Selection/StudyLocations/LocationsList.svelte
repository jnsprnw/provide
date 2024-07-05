<script>
  import { RadioGroup, RadioGroupOption } from '@rgossiaux/svelte-headlessui';

  export let items;

  export let selected;
</script>

<RadioGroup
  bind:value={selected}
  class="grid grid-col"
>
  {#each items as { uid, label }}
    <RadioGroupOption
      value={uid}
      let:checked
    >
      <span
        class:checked
        class="block px-4 py-1 cursor-pointer hover:bg-surface-weaker focus:bg-surface-weaker">{label}</span
      >
    </RadioGroupOption>
  {/each}
</RadioGroup>
