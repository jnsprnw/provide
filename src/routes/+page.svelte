<script>
  import Paths from '$lib/landing-page/Paths.svelte';
  import Stories from '$lib/landing-page/Stories.svelte';

  export let data;

  $: ({ stories } = data);
</script>

<svelte:head>
  <title>Provide Project</title>
</svelte:head>

<Stories {stories} />

<div class="paths container">
  <div class="wrapper grid">
    <Paths />
  </div>
</div>

<style lang="postcss">
  .paths {
    margin: var(--space-l) 0;
  }
</style>
