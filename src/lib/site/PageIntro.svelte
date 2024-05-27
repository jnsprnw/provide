<script>
  export let isCompact = false;
  export let subNavigation;
  export let subNavigationLabel;
  export let backLink;
</script>

<div class="bg-surface-weaker">
  <div class:pb-14={!subNavigation} class:gap-y-16={!subNavigation} class:pt-20={!backLink} class=" mx-auto px-2 sm:px-6 flex flex-col pt-20 {isCompact ? 'max-w-4xl' : 'max-w-7xl'}">
    {#if backLink}<a href={backLink.href} class="text-theme-base font-bol text-sm pt-3 mb-16 flex gap-1.5 font-bold"><span class="font-normal">←</span> {backLink.label}</a>{/if}
    <slot />
    {#if subNavigation}
      <div class="border-t border-contour-weakest py-5 mt-20 flex gap-10 items-ceter">
        {#if subNavigationLabel}
          <p class="uppercase text-xs tracking-widest font-bold mb-4 mt-4 text-text-weaker">{subNavigationLabel}</p>
        {/if}
        <nav class="flex gap-10">
          {#each subNavigation as { href, separator, abstract, label, isActive }}
            <a {href} class="max-w-60 hover:bg-surface-weakest px-3 py-2.5 rounded-sm" class:bg-surface-weakest={isActive}
              ><h4 class="font-bold text-theme-base mb-2">{label}</h4>
              <p class="text-text-weake text-sm" class:text-text-weaker={!isActive}>{abstract}</p></a
            >
          {/each}
        </nav>
      </div>
    {/if}
  </div>
</div>
