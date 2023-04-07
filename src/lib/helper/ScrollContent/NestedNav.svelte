<script>
  export let sections = [];
  export let index = 0;

  // Holds key/values for all open sections
  let openSections = {};

  // To prevent reactive opening when manually closing section
  let preventReset = false;

  // Allow again reactive opening whenever user scrolled past a section
  $: if (index !== undefined) {
    preventReset = false;
  }

  // Add indexes to sections and subsections to see if section is active
  $: navSections = sections.reduce(
    (acc, section, i) => {
      acc.sections.push({
        ...section,
        index: acc.counter,
        isActive: index === acc.counter++,
        sections: section.sections.map((s) => ({
          ...s,
          index: acc.counter,
          isActive: index === acc.counter++,
        })),
      });
      return acc;
    },
    { sections: [], counter: 0 }
  ).sections;

  // Whenever user scrolls past major section, we update the open sections to only
  // have the one open that is currently in view
  $: isMajorSection = navSections.find((s) => s.index === index);
  $: if (!preventReset && isMajorSection) {
    openSections = { [index]: true };
  }

  // Final sections take into account whether a child section is active and whether
  // the section is open or not
  $: processedSections = navSections.map((section) => {
    const isActive =
      section.isActive || !!section.sections.find((s) => s.isActive);
    const isOpen = openSections[section.index];
    return {
      ...section,
      isActive,
      isOpen,
    };
  });

  $: toggleSection = (i) => {
    preventReset = true;
    openSections = { ...openSections, [i]: !openSections[i] };
  };
</script>

<nav class="flex flex-col gap-10">
  <ul>
    {#each processedSections as { title, slug, isActive, index, isOpen, sections, content }}
      {#if content || sections[0]?.content}
        <li class="py-2 border-b border-foreground-weakest pr-1">
          <div class:text-theme-base={isActive} class="flex justify-between">
            <a class="font-bold text-lg" href={`#${slug}`}>{title}</a>
            <button
              as="button"
              class:rotate-180={isOpen}
              on:click={() => toggleSection(index)}>▾</button
            >
          </div>
          <ul class:h-0={!isOpen} class="overflow-hidden">
            {#each sections as { slug, title, isActive }}
              <li
                class="text-md text-foreground-weak py-1"
                class:text-theme-base={isActive}
              >
                <a href={`#${slug}`}>{title}</a>
              </li>
            {/each}
          </ul>
        </li>
      {/if}
    {/each}
  </ul>
</nav>
