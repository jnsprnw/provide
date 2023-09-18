<script>
  import {
    Menu,
    MenuButton,
    MenuItems,
    MenuItem,
  } from '@rgossiaux/svelte-headlessui';
  import { createPopperActions } from 'svelte-popperjs';

  export let label;
  export let options;
  export let panelPlacement = 'bottom-end';

  const [popperRef, popperContent] = createPopperActions();

  const popperOptions = {
    placement: panelPlacement,
    strategy: 'fixed',
    modifiers: [{ name: 'offset', options: { offset: [0, 10] } }],
  };
</script>

<Menu class="relative">
  <MenuButton use={[popperRef]} class="text-theme-base font-bold text-sm"
    >{label}</MenuButton
  >
  <MenuItems
    use={[[popperContent, popperOptions]]}
    class="absolute z-10 bg-surface-base shadow-xl"
  >
    {#each options as option}
      {#if option.options}
        <div
          class="flex flex-col items-stretch [&:not(:last-child)]:border-b border-contour-weakest"
        >
          {#each option.options as option}
            <MenuItem
              class="px-4 py-2 hover:bg-surface-weaker  text-sm inline-block"
              href={option.href}
            >
              {option.label}
            </MenuItem>
          {/each}
        </div>
      {:else}
        <MenuItem>
          <a href={option.href}>{option.label}</a>
        </MenuItem>
      {/if}
    {/each}
  </MenuItems>
</Menu>
