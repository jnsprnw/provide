<script>
  import { slugify } from '$src/lib/utils';
  import { getContext } from 'svelte';
  export let sections = [];
  export let contentRef;
  const { index, query } = getContext('scrollContent');

  // Holds key/values for all open sections
  let openSections = {};

  // To prevent reactive opening when manually closing section
  let preventReset = false;

  // Allow again reactive opening whenever user scrolled past a section
  $: if ($index !== undefined) {
    preventReset = false;
  }

  // Takes a flat array of h2/h3 titles and turns them into a hierarchy
  const createHierarchy = (flatItems) => {
    if (!flatItems.length) return [];
    let startLevel = Infinity;

    // Set start level in case it doesn't start at 1
    flatItems.forEach((item) => {
      if (item.level < startLevel) {
        startLevel = item.level;
      }
    });
    const createLevel = (items, level) => {
      if (level > 3) return [];
      const levelIndexes = [];
      for (let i = 0; i < items.length; i += 1) {
        if (items[i].level === level) {
          levelIndexes.push(i);
        }
      }

      // If no subindexes are found
      if (!levelIndexes.length) {
        return level === startLevel ? createLevel(items, level + 1) : items;
      }

      // If there are subindexes, create
      return levelIndexes.map((startIndex, i) => {
        const endIndex = i < levelIndexes.length ? levelIndexes[i + 1] : items.length;
        const subItems = items.slice(startIndex + 1, endIndex);
        const item = {
          ...items[startIndex],
        };
        if (subItems.length) {
          item.sections = createLevel(subItems, level + 1);
        }
        return item;
      });
    };

    return createLevel(flatItems, startLevel);
  };

  // If containerRef is given, query all h2/h3 titles from the given container and turn them
  // into objects for further processing
  $: dynamicNavSections = (() => {
    if (!contentRef) return;
    const headings = contentRef?.querySelectorAll('h2, h3');
    const flatToc = [...headings].map((el, i) => {
      const slug = el.getAttribute('id') || slugify(el.innerText);
      el.setAttribute('id', slug);

      return {
        props: {
          title: el.innerText,
          slug,
        },
        level: parseFloat(el.tagName[1]),
        content: true,
      };
    });

    return createHierarchy(flatToc);
  })();

  // Add indexes to sections and subsections to see if section is active
  $: navSections = (dynamicNavSections || sections).reduce(
    (acc, section) => {
      const children = section?.sections ?? [];
      acc.sections.push({
        title: section.props?.title ?? section.title,
        slug: section.props?.slug ?? section.slug,
        index: acc.counter,
        isActive: $index === acc.counter++,
        hasContent: Boolean(section.content) || children.some(({ props }) => Boolean(props.content)),
        sections: children.map((s) => ({
          title: s.props?.titleShort ?? s.props?.title,
          slug: s.props?.slug,
          index: acc.counter,
          // Highlighting subsections doesn't work when creating the toc dynamically so we
          // only set isActive and increase counter on main sections
          isActive: !dynamicNavSections && $index === acc.counter++,
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
    {#each processedSections as { title, slug, isActive, index, isOpen, sections, hasContent }}
      {#if hasContent}
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
