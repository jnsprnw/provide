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
  /** @type {String|undefined} Holds a warning text that is conditionally displayed */
  export let warning = undefined;
  /** @type {String|undefined} Holds a palceholder text that is conditionally displayed */
  export let placeholder = undefined;
  /** @type {string|undefined} Holds a disabled text that is conditionally displayed. This can happen if the user needs to select another option first */
  export let disabled = undefined;
  export let category = undefined;

  $: isDisabled = Boolean(disabled);

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
    aria-invalid={!isDisabled && Boolean(warning)}
    aria-disabled={isDisabled}
    aria-label={disabled ?? warning ?? placeholder ?? `${category ? `${category}:` : ''}${buttonLabel}`}
    disabled={isDisabled}
    class={[
      'flex w-full rounded bg-surface-base justify-between overflow-hidden transition-colors hover:border-theme-base/40 aria-expanded:border-theme-base/60 aria-invalid:border-red-300 text-theme-base aria-invalid:text-red-300 aria-disabled:cursor-not-allowed',
      classes.button,
      buttonClass,
      placeholder || isDisabled ? 'text-theme-weaker' : '', // TODO: Define global warning classes
    ].join(' ')}
  >
    <span
      class="flex items-center whitespace-nowrap overflow-hidden text-ellipsis"
      class:font-bold={!placeholder}
    >
      {#if disabled || warning || placeholder}
        <span class="leading-none whitespace-nowrap overflow-hidden text-ellipsis">{disabled ?? warning ?? placeholder}</span>
      {:else if category}
        <div class="flex items-end gap-x-2">
          <span class="text-theme-weaker text-sm leading-none pb-0.5 font-normal">{category}</span>
          <span class="leading-none whitespace-nowrap overflow-hidden text-ellipsis">{buttonLabel}</span>
        </div>
      {:else}
        <span class="leading-none whitespace-nowrap overflow-hidden text-ellipsis">{buttonLabel}</span>
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
