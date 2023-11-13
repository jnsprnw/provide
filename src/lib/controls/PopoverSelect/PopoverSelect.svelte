<script>
  import ExpandIcon from '$lib/helper/icons/Expand.svelte';
  import { Popover, PopoverButton, PopoverPanel } from '@rgossiaux/svelte-headlessui';
  import { createPopperActions } from 'svelte-popperjs';

  export let panelClass = '';
  export let panelPlacement = 'bottom-start';
  export let buttonClass = '';
  export let label;
  export let buttonLabel;
  export let size = 'xl';
  export let warning = undefined;
  export let placeholder = undefined;
  export let disabled = undefined;
  export let category = undefined;

  const sizeClasses = {
    xl: {
      button: 'text-xl p-5',
    },
    md: {
      button: 'text-md p-3',
    },
  };

  $: classes = sizeClasses[size] || {};

  const [popperRef, popperContent] = createPopperActions();

  $: popperOptions = {
    placement: panelPlacement,
    strategy: 'fixed',
    modifiers: [{ name: 'offset', options: { offset: [0, 10] } }],
  };
</script>

<Popover class={`relative w-full ${$$restProps.class}`}>
  <span class="uppercase text-xs tracking-widest font-bold text-contour-weak pl-1 mb-2 inline-block">{label}</span>
  <PopoverButton
    use={[popperRef]}
    let:open
    aria-invalid={Boolean(warning)}
    aria-disabled={Boolean(disabled)}
    disabled={Boolean(disabled)}
    class={[
      'flex w-full rounded bg-surface-base justify-between overflow-hidden transition-colors aria-expanded:border-theme-base/60 aria-invalid:border-red-300 text-theme-base aria-invalid:text-red-300 aria-disabled:cursor-not-allowed',
      classes.button,
      buttonClass,
      placeholder || disabled ? 'text-theme-weaker' : '', // TODO: Define global warning classes
    ].join(' ')}
  >
    <span
      class="whitespace-nowrap overflow-hidden text-ellipsis text-current flex gap-x-2 items-end"
      class:font-bold={!placeholder}
    >
      {#if disabled || warning || placeholder}
        <span class="leading-none">{disabled ?? warning ?? placeholder}</span>
      {:else}
        {#if category}
          <span class="text-theme-weaker text-sm leading-none pb-0.5 font-normal">{category}</span>
        {/if}
        <span class="leading-none">{buttonLabel}</span>
      {/if}
    </span>
    <ExpandIcon
      class="min-w-[20px] grow-1 stroke-current"
      isOpen={open}
    />
  </PopoverButton>

  <PopoverPanel
    use={[[popperContent, popperOptions]]}
    class={`${panelClass} bg-surface-base rounded overflow-hidden border-theme-base/20 border shadow-xl z-50 relative`}
    let:open
  >
    <slot />
  </PopoverPanel>
</Popover>
