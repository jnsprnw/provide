<script>
  import Scroller from '@sveltejs/svelte-scroller';
  import { setContext } from 'svelte';
  import { writable } from 'svelte/store';

  export let query = 'scroll-section';
  let count;
  let offset;
  let progress;

  let index = writable(0);

  setContext('scrollContent', {
    query,
    index,
  });
</script>

<div class="grid grid-cols-12 gap-10 pt-8 mx-auto max-w-7xl px-6">
  <div class="col-span-3">
    <div class="sticky top-0 z-[3]">
      <slot name="navigation" />
    </div>
  </div>
  <div class="col-start-4 col-span-9">
    <Scroller
      bind:count
      bind:index={$index}
      bind:offset
      bind:progress
      query={`.${query}`}
      threshold={0.1}
    >
      <div slot="foreground">
        <slot {query} />
      </div>
    </Scroller>
  </div>
</div>
