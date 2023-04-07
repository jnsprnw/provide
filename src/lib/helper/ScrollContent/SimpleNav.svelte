<script>
  export let sections = [];
  export let index = 0;

  $: navSections = sections.map((d, i) => ({
    ...d,
    isActive: index === i,
  }));
</script>

{#each navSections as { slug, title, disabled, description, isActive }}
  {#if slug}
    <a
      {disabled}
      href={`#${slug}`}
      class="inline-block w-48 pl-3 border-l-3"
      class:border-theme-base={isActive}
      class:border-transparent={!isActive}
    >
      <div
        class="font-bold mb-1 -mt-1 leading-tight"
        class:text-theme-base={isActive}
      >
        {title}
      </div>
      <div
        class="text-foreground-weak leading-tight text-sm -mb-1"
        class:text-theme-weaker={isActive}
      >
        {description}
      </div>
    </a>
  {/if}
{/each}
