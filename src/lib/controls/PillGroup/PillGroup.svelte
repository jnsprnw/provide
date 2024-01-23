<script>
  import { RadioGroup, RadioGroupOption } from '@rgossiaux/svelte-headlessui';
  import Info from '$lib/helper/icons/Info.svelte';
  import tooltip from '$lib/utils/tooltip';
  export let currentUid;
  export let options;
  export let size = 'md';
  export let disabledMessage = 'Option not available';
  export let allowWrap = false;

  $: classes = {
    md: {
      group: 'gap-1.5',
      button: 'py-2 px-4 text-md',
    },
    sm: {
      group: 'gap-1',
      button: 'px-3 py-1.5 text-sm',
    },
  }[size];
</script>

<RadioGroup bind:value={currentUid} on:change={(e) => (currentUid = e.detail)} class="flex {allowWrap ? 'flex-wrap' : ''} {classes.group}">
  {#each options as { uid, disabled, label, tooltip: individualDisabledMessage, count, description }}
    <RadioGroupOption value={uid} let:checked {disabled} class="whitespace-nowrap overflow-hidden rounded-full">
      <div
        use:tooltip={{ content: disabled ? individualDisabledMessage ?? disabledMessage : undefined }}
        class="w-full flex gap-x-3 leading-none items-center transition-colors {classes.button}"
        class:bg-theme-base={checked}
        class:text-surface-base={checked}
        class:text-theme-base={!checked}
        class:cursor-not-allowed={disabled}
        class:opacity-50={disabled}
        class:font-bold={checked}
        class:hover:bg-surface-base={size === 'md' && !disabled && !checked}
        class:hover:bg-surface-weaker={size === 'sm' && !disabled && !checked}
        class:pr-4={count}
      >
        <span class="truncate" title={size === 'sm' ? label : undefined}>{label}</span>
        {#if count}<small class="text-xs font-normal">{count}</small>{/if}
        {#if description}
          <Info isInverted={checked} {description} />
        {/if}
      </div>
    </RadioGroupOption>
  {/each}
</RadioGroup>
