<script>
  import Scroller from '@sveltejs/svelte-scroller';
  import { setContext } from 'svelte';
  import { writable } from 'svelte/store';

  export let isFullWidth = false;

  export let query = 'scroll-section';
  export let sections;
  export let navContainerClass = '';

  let count;
  let offset;
  let progress;

  let index = writable(0);

  setContext('scrollContent', {
    query,
    index,
  });
</script>

<!-- Required so scroller gets re executed when sections change -->
{#key sections}
  <div class="grid grid-rows-[auto_auto] grid-cols-1 md:grid-cols-[1fr_2fr] lg:grid-cols-[1fr_3fr] md:grid-rows-1 gap-10 md:gap-6 lg:gap-10 mx-auto max-w-7xl px-6">
    <div class="pt-8 {navContainerClass}">
      <div class="sticky top-8 z-[3]">
        <slot name="navigation" />
      </div>
    </div>
    <div class="md:pt-8">
      <Scroller
        bind:count
        bind:index={$index}
        bind:offset
        bind:progress
        query={`.${query}`}
        threshold={0.1}
      >
        <div slot="foreground" class={isFullWidth ? '' : 'mx-auto max-w-2xl'}>
          <slot {query} />
        </div>
      </Scroller>
    </div>
  </div>
{/key}
