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

  const popperOptions = {
    placement: panelPlacement,
    strategy: 'fixed',
    modifiers: [{ name: 'offset', options: { offset: [0, 10] } }],
  };
</script>

<Popover class={`relative w-full ${clazz}`}>
  <label
    class="uppercase text-xs tracking-widest text-foreground-weak pl-1 mb-1 inline-block"
    >{label}</label
  >
  <PopoverButton
    use={[popperRef]}
    let:open
    class={`flex w-full  bg-background-base justify-between text-theme-base ${classes.button} ${buttonClass}`}
  >
    <span class="font-bold">{buttonLabel}</span>
    <ExpandIcon isOpen={open} />
  </PopoverButton>

  <PopoverPanel
    use={[[popperContent, popperOptions]]}
    class={`${panelClass} bg-background-base shadow-xl z-50`}
    let:open
  >
    <slot />
  </PopoverPanel>
</Popover>
