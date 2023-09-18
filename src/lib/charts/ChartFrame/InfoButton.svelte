<script>
  import {
    Popover,
    PopoverButton,
    PopoverPanel,
  } from '@rgossiaux/svelte-headlessui';
  import { createPopperActions } from 'svelte-popperjs';
  import Chevron from '$lib/helper/icons/Chevron.svelte';

  export let label;
  export let items;
  export let panelPlacement = 'bottom-end';

  const [popperRef, popperContent] = createPopperActions();

  const popperOptions = {
    placement: panelPlacement,
    strategy: 'fixed',
    modifiers: [{ name: 'offset', options: { offset: [0, 10] } }],
  };
</script>

{#if items.length}
  <Popover>
    <PopoverButton
      use={[popperRef]}
      class="font-bold flex text-theme-base hover:text-theme-stronger text-sm items-center"
    >
      <span>{label}</span>
      <Chevron class="pointer-events-none stroke-theme-base" />
    </PopoverButton>

    <PopoverPanel
      use={[[popperContent, popperOptions]]}
      class="bg-surface-base shadow-xl z-10 px-4 py-2"
    >
      <dl>
        {#each items as item}
          <div class="flex text-sm py-1">
            <dt class="text-contour-weak mr-2">{item.label}</dt>
            <dd class="min-w-10">{item.value}</dd>
          </div>
        {/each}
      </dl>
    </PopoverPanel>
  </Popover>
{/if}
