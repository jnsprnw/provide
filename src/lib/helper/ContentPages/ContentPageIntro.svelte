<script>
  import PageIntro from '$lib/site/PageIntro.svelte';
  export let title;
  export let intro = undefined;
  export let isCompact = false;
  export let subNavigation;
  export let isCaseStudy;
  export let tag;
  export let subNavigationLabel;
  export let backLink;
</script>

<PageIntro {subNavigationLabel} {isCompact} {backLink} {subNavigation} bgColor={isCaseStudy && 'bg-theme-base'}>
  <div class="flex flex-col gap-y-3.5" class:text-surface-base={isCaseStudy}>
    {#if tag}
      <p class="uppercase text-xs tracking-widest font-bold pt-3 text-theme-base">{tag}</p>
    {/if}
    {#if title}
      <h1 class="text-5xl font-bold max-w-2xl">{title}</h1>
    {/if}
    {#if intro}<span class="max-w-xl text-lg">{intro}</span>{/if}
  </div>
</PageIntro>
