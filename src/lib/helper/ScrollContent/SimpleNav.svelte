<script>
  export let sections = [];
  export let index = 0;

  $: navSections = sections.map((d, i) => ({
    ...d,
    isActive: index === i,
  }));
</script>

<div class="flex flex-col gap-10">
  {#each navSections as { id, label, disabled, description, isActive }}
    {#if id}
      <a
        {disabled}
        href={`#${id}`}
        class="inline-block w-48 pl-3 border-l-3"
        class:border-theme-base={isActive}
        class:border-transparent={!isActive}
      >
        <div
          class="font-bold mb-1 -mt-1 leading-tight"
          class:text-theme-base={isActive}
        >
          {label}
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
</div>
