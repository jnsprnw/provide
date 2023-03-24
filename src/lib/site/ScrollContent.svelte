<script>
  import { browser } from '$app/environment';

  export let sections = [];
  let activeSection = null;
  let contentEl;

  $: options = {
    rootMargin: '0px',
    threshold: 0.5,
  };

  $: if (browser && contentEl) {
    const observer = new IntersectionObserver(callback, options);
    Array.from(contentEl.children).map((el) => observer.observe(el));
  }

  function callback(intersections) {
    const intersection = intersections.find(
      (intersection) => intersection.isIntersecting
    );
    if (intersection) activeSection = intersection.target.id || activeSection;
  }

  $: navItems = sections.map((section) => ({
    ...section,
    isActive: activeSection === section.id,
  }));
</script>

<div class="grid grid-cols-12 gap-14 pt-8 mx-auto max-w-7xl px-6">
  <div class="col-span-3">
    <div class="sticky top-0 flex flex-col gap-10 z-[2]">
      <slot name="before-navigation" />

      {#each navItems as { id, label, disabled, description, isActive }}
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
  </div>
  <div class="col-span-9" bind:this={contentEl}>
    {#each sections as section}
      {#if !section.disabled}
        <div id={section.id} class="mb-16">
          <svelte:component this={section.component} />
        </div>
      {/if}
    {/each}
  </div>
</div>
