<script lang="ts">
  import { createProgress, melt } from '@melt-ui/svelte';
  import { writable } from 'svelte/store';

  export let current: number;

  const value = writable(0);

  $: {
    value.set(Math.max(Math.min(100, current ?? 0), 0));
  }

  const {
    elements: { root },
    options: { max },
  } = createProgress({
    value,
    max: 100,
  });
</script>

<div use:melt={$root} class="relative h-1 w-full overflow-hidden rounded-full bg-theme-weakest">
  <div class="h-full w-full bg-theme-weaker" style={`transform: translateX(-${100 - (100 * ($value ?? 0)) / ($max ?? 1)}%)`} />
</div>
