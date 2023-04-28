<script>
  import ExpandIcon from '$lib/helper/icons/Expand.svelte';
  import {
    Popover,
    PopoverButton,
    PopoverPanel,
  } from '@rgossiaux/svelte-headlessui';
  import { createPopperActions } from 'svelte-popperjs';

  let clazz;
  export { clazz as class };
  export let panelClass;
  export let panelPlacement = 'bottom-start';
  export let buttonClass;
  export let label;
  export let buttonLabel;
  export let size = 'xl';

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
  <span
    class="uppercase text-xs tracking-widest font-bold text-foreground-weak pl-1 mb-2 inline-block"
    >{label}</span
  >
  <PopoverButton
    use={[popperRef]}
    let:open
    class={`flex w-full rounded bg-background-base justify-between text-theme-base overflow-hidden ${classes.button} ${buttonClass} transition-colors`}
  >
    <span class="font-bold whitespace-nowrap overflow-hidden text-ellipsis"
      >{buttonLabel}</span
    >
    <ExpandIcon class="min-w-[20px] grow-1" isOpen={open} />
  </PopoverButton>

  <PopoverPanel
    use={[[popperContent, popperOptions]]}
    class={`${panelClass} bg-background-base rounded overflow-hidden border-theme-base/20 border shadow-xl z-50 relative`}
    let:open
  >
    <slot />
  </PopoverPanel>
</Popover>
