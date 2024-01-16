<script>
  import PageIntro from '$lib/site/PageIntro.svelte';
  export let title;
  export let intro;
  export let isCompact = false;
</script>

<PageIntro {isCompact}>
  <div class="flex flex-col gap-y-3.5">
    <h1 class="text-4xl font-bold">{title}</h1>
    <span class="max-w-xl">{intro}</span>
  </div>
</PageIntro>
