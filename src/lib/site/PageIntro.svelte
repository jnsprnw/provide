<script>
  import SideScrollIndicator from '../helper/SideScrollIndicator.svelte';

  export let isCompact = false;
  export let subNavigation = undefined;
  export let subNavigationLabel = undefined;
  export let backLink = undefined;

  let widthContent = 0;
  let widthLabel = 0;
</script>

<div class="bg-surface-weaker max-w-[100vw] overflow-hidden">
  <div class:pb-14={!subNavigation} class:gap-y-16={!subNavigation} class:pt-20={!backLink} class=" mx-auto px-2 sm:px-6 flex flex-col pt-20 {isCompact ? 'max-w-4xl' : 'max-w-7xl'}">
    {#if backLink}<a href={backLink.href} class="text-theme-base font-bol text-sm pt-3 mb-16 flex gap-1.5 font-bold"><span class="font-normal">←</span> {backLink.label}</a>{/if}
    <slot />
    {#if subNavigation}
      <div class="mt-20 border-t border-contour-weakest">
        <SideScrollIndicator widthOfContent={widthContent + widthLabel}>
          <div class="py-5 flex gap-8 items-start">
            {#if subNavigationLabel}
              <span bind:clientWidth={widthLabel} class="uppercase text-xs tracking-widest font-bold mb-4 mt-4 text-text-weaker whitespace-nowrap">{subNavigationLabel}</span>
            {/if}

            <nav class="flex gap-10" bind:clientWidth={widthContent}>
              {#each subNavigation as { href, abstract, label, isActive }}
                <a {href} class="max-w-60 min-w-48 hover:bg-surface-weakest px-3 py-2.5 rounded-sm" class:bg-surface-weakest={isActive}
                  ><h4 class="font-bold text-theme-base mb-2">{label}</h4>
                  {#if abstract}
                    <p class="text-text-weake text-sm" class:text-text-weaker={!isActive}>{abstract}</p>
                  {/if}
                </a>
              {/each}
            </nav>
          </div>
        </SideScrollIndicator>
      </div>
    {/if}
  </div>
</div>
