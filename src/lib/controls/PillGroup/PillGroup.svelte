<script>
  import { RadioGroup, RadioGroupOption } from '@rgossiaux/svelte-headlessui';
  export let currentUid;
  export let options;
  export let size = 'md';

  $: classes = {
    md: {
      group: 'gap-1.5',
      button: 'px-3 py-1.5 text-md',
    },
    sm: {
      group: 'gap-1',
      button: 'px-3 py-1 text-sm',
    },
  }[size];
</script>

<RadioGroup
  value={currentUid}
  on:change={(e) => (currentUid = e.detail)}
  class="overflow-scroll flex flex-wrap {classes.group}"
>
  {#each options as option}
    <RadioGroupOption value={option.uid} let:checked disabled={option.disabled}>
      <span
        class="bg-background-base rounded-full inline-block {classes.button}"
        class:bg-theme-base={checked}
        class:text-background-base={checked}
        class:text-theme-base={!checked}
        class:cursor-not-allowed={option.disabled}
        class:opacity-50={option.disabled}
        class:font-bold={checked}>{option.label}</span
      >
    </RadioGroupOption>
  {/each}
</RadioGroup>
