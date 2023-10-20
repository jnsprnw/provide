<script>
  import ExpandIcon from '$lib/helper/icons/Expand.svelte';
  import { Popover, PopoverButton, PopoverPanel } from '@rgossiaux/svelte-headlessui';
  import { createPopperActions } from 'svelte-popperjs';

  let clazz;
  export { clazz as class };
  export let panelClass;
  export let panelPlacement = 'bottom-start';
  export let buttonClass;
  export let label;
  export let buttonLabel;
  export let size = 'xl';
  export let hasWarning = false;

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

<Popover class={`relative w-full ${clazz}`}>
  <span class="uppercase text-xs tracking-widest font-bold text-contour-weak pl-1 mb-2 inline-block">{label}</span>
  <PopoverButton
    use={[popperRef]}
    let:open
    class={[
      'flex w-full rounded bg-surface-base justify-between overflow-hidden transition-colors',
      classes.button,
      buttonClass,
      hasWarning ? 'border-red-300 text-red-400' : 'text-theme-base', // TODO: Define global warning classes
    ].join(' ')}
  >
    <span class="font-bold whitespace-nowrap overflow-hidden text-ellipsis text-current">{buttonLabel}</span>
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
