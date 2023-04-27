<script>
  import Chevron from '$lib/helper/icons/Chevron.svelte';
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

  const [popperRef, popperContent] = createPopperActions();

  const popperOptions = {
    placement: panelPlacement,
    strategy: 'fixed',
    modifiers: [{ name: 'offset', options: { offset: [0, 10] } }],
  };
</script>

<Popover class={`relative ${clazz}`}>
  <PopoverButton
    use={[popperRef]}
    let:open
    class={`flex items-center w-full text-sm text-theme-base hover:text-theme-stronger ${buttonClass}`}
  >
    <span class="font-bold">{label}</span>
    <Chevron class="pointer-events-none stroke-theme-base" />
  </PopoverButton>

  <PopoverPanel
    use={[[popperContent, popperOptions]]}
    class={`${panelClass} bg-background-base shadow-xl z-50 relative`}
    let:open
  >
    <slot />
  </PopoverPanel>
</Popover>
