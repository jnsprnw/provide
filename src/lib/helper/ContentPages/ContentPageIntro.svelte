<script>
  import PageIntro from '$lib/site/PageIntro.svelte';
  export let title;
  export let intro = undefined;
  export let isCompact = false;
  export let subNavigation;
</script>

<PageIntro {isCompact} {subNavigation}>
  <div class="flex flex-col gap-y-3.5">
    <h1 class="text-4xl font-bold">{title}</h1>
    {#if intro}<span class="max-w-xl">{intro}</span>{/if}
  </div>
</PageIntro>
