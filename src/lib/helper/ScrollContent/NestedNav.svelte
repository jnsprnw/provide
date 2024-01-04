<script>
  import { getContext } from 'svelte';
  export let sections = [];
  const { index } = getContext('scrollContent');

  // Holds key/values for all open sections
  let openSections = {};

  // To prevent reactive opening when manually closing section
  let preventReset = false;

  // Allow again reactive opening whenever user scrolled past a section
  $: if ($index !== undefined) {
    preventReset = false;
  }

  // Add indexes to sections and subsections to see if section is active
  $: navSections = sections.reduce(
    (acc, section, i) => {
      acc.sections.push({
        ...section,
        index: acc.counter,
        isActive: $index === acc.counter++,
        sections: (section?.sections ?? []).map((s) => ({
          ...s,
          index: acc.counter,
          isActive: $index === acc.counter++,
        })),
      });
      return acc;
    },
    { sections: [], counter: 0 }
  ).sections;

  // Whenever user scrolls past major section, we update the open sections to only
  // have the one open that is currently in view
  $: isMajorSection = navSections.find((s) => s.index === $index);
  $: if (!preventReset && isMajorSection) {
    openSections = { [$index]: true };
  }

  // Final sections take into account whether a child section is active and whether
  // the section is open or not
  $: processedSections = navSections.map((section) => {
    const isActive = section.isActive || !!section.sections.find((s) => s.isActive);
    const isOpen = openSections[section.index];
    return {
      ...section,
      isActive,
      isOpen,
      sections: section.sections.map((s) => (!s.slug || !s.title ? false : s)).filter(Boolean),
    };
  });

  $: toggleSection = (i) => {
    preventReset = true;
    openSections = { ...openSections, [i]: !openSections[i] };
  };
</script>

<nav class="md:flex-col gap-10 hidden md:flex">
  <ul data-index={$index}>
    {#each processedSections as { title, slug, isActive, index, isOpen, sections, content }}
      {#if content || sections[0]?.content}
        <li class="py-2 border-b border-contour-weakest pr-1 last:border-b-0">
          <div aria-expanded={String(isActive)} class:text-theme-base={isActive} class="flex justify-between items-center">
            <a class="font-bold text-lg" href={`#${slug}`}>{title}</a>
            {#if sections.length}
              <button as="button" class="p-1" class:rotate-180={isOpen} on:click={() => toggleSection(index)}>▾</button>
            {/if}
          </div>
          {#if sections.length}
            <ul class:h-0={!isOpen} class="overflow-hidden">
              {#each sections as { slug, title, isActive }}
                <li class="mt-1">
                  <a aria-current={isActive ? 'step' : 'false'} class="inline-block text-md text-contour-weak py-1 leading-5 hover:text-theme-base" class:text-theme-base={isActive} href={`#${slug}`}>
                    {title}
                  </a>
                </li>
              {/each}
            </ul>
          {/if}
        </li>
      {/if}
    {/each}
  </ul>
</nav>
