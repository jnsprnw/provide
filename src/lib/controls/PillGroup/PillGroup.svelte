<script>
  import { RadioGroup, RadioGroupOption } from '@rgossiaux/svelte-headlessui';
  export let currentUid;
  export let options;
</script>

<RadioGroup
  value={currentUid}
  on:change={(e) => (currentUid = e.detail)}
  class="overflow-scroll flex gap-1.5 flex-wrap"
>
  {#each options as option}
    <RadioGroupOption value={option.uid} let:checked>
      <span
        class="bg-background-base px-3 py-1 rounded-full inline-block"
        class:bg-theme-base={checked}
        class:text-background-base={checked}
        class:text-theme-base={!checked}
        class:font-bold={checked}>{option.label}</span
      >
    </RadioGroupOption>
  {/each}
</RadioGroup>
