<script>
  import { RadioGroup, RadioGroupOption } from '@rgossiaux/svelte-headlessui';
  import tooltip from '$lib/utils/tooltip';
  export let currentUid;
  export let options;
  export let size = 'md';
  export let disabledMessage = 'Option not available';

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
  bind:value={currentUid}
  on:change={(e) => (currentUid = e.detail)}
  class="flex flex-wrap {classes.group}"
>
  {#each options as { uid, disabled, label, tooltip: individualDisabledMessage }}
    <RadioGroupOption
      value={uid}
      let:checked
      {disabled}
      class="whitespace-nowrap overflow-hidden rounded-full"
    >
      <span
        use:tooltip={{ content: disabled ? individualDisabledMessage ?? disabledMessage : undefined }}
        class="w-full overflow-hidden text-ellipsis block transition-colors {classes.button}"
        class:bg-theme-base={checked}
        class:text-surface-base={checked}
        class:text-theme-base={!checked}
        class:cursor-not-allowed={disabled}
        class:opacity-50={disabled}
        class:font-bold={checked}
        class:hover:bg-surface-base={!disabled && !checked}
      >
        {label}
      </span>
    </RadioGroupOption>
  {/each}
</RadioGroup>
