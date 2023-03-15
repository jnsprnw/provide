<script>
  import Entrypoints from './landing-page/Entrypoints.svelte';
  import Stories from './landing-page/Stories.svelte';

  export let data;

  $: ({ stories } = data);
</script>

<Stories {stories} />

<div class="mx-auto max-w-7xl px-6">
  <Entrypoints />
</div>

<style lang="postcss">
  .paths {
    margin: var(--space-l) 0;
  }
</style>
