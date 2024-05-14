<script>
  export let isCompact = false;
  export let subNavigation;
</script>

<div class="bg-surface-weaker">
  <div class="mx-auto px-2 sm:px-6 flex flex-col gap-y-16 pb-10 {isCompact ? 'max-w-4xl' : 'max-w-7xl'}" class:pt-16={!subNavigation} class:pt-6={subNavigation}>
    {#if subNavigation}
      <nav>
        {#each subNavigation as { href, separator, label, isActive }}
          <a class="px-5 py-3 font-bold rounded-full" class:bg-theme-base={isActive} class:text-theme-base={!isActive} class:text-surface-weaker={isActive} {href}>{label}</a>
          {#if separator}
            <span aria-hidden="true" class="border-theme-weakest border-r mx-3" />
          {/if}
        {/each}
      </nav>
    {/if}
    <slot />
  </div>
</div>
