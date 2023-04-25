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

  const [popperRef, popperContent] = createPopperActions();

  const popperOptions = {
    placement: panelPlacement,
    strategy: 'fixed',
    modifiers: [{ name: 'offset', options: { offset: [0, 10] } }],
  };
</script>

<Popover class={`relative w-full ${clazz}`}>
  <PopoverButton
    use={[popperRef]}
    let:open
    class={`flex w-full text-sm text-theme-base ${buttonClass}`}
  >
    <span class="font-bold">{label}</span>
  </PopoverButton>

  <PopoverPanel
    use={[[popperContent, popperOptions]]}
    class={`${panelClass} bg-background-base shadow-xl z-50 relative`}
    let:open
  >
    <slot />
  </PopoverPanel>
</Popover>
