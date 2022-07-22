<script>
  export let type = 'list';
  export let selected = 0;
  import { createEventDispatcher, afterUpdate, setContext, tick } from "svelte";
  import { writable, derived } from "svelte/store";
  const dispatch = createEventDispatcher();
  const tabs = writable([]);
  const tabsById = derived(tabs, (_) =>
    _.reduce((a, c) => ({ ...a, [c.id]: c }), {})
  );
  const selectedTab = writable(undefined);
  const content = writable([]);
  const contentById = derived(content, (_) =>
    _.reduce((a, c) => ({ ...a, [c.id]: c }), {})
  );
  const selectedContent = writable(undefined);
  let refTabList = null;
  setContext("Tabs", {
    type,
    tabs,
    contentById,
    selectedTab,
    selectedContent,
    add: (data) => {
      tabs.update((_) => [..._, { ...data, index: _.length }]);
    },
    addContent: (data) => {
      content.update((_) => [..._, { ...data, index: _.length }]);
    },
    update: (id) => {
      currentIndex = $tabsById[id].index;
    },
    change: async (direction) => {
      let index = currentIndex + direction;
      if (index < 0) {
        index = $tabs.length - 1;
      } else if (index >= $tabs.length) {
        index = 0;
      }
      let disabled = $tabs[index].disabled;
      while (disabled) {
        index = index + direction;
        if (index < 0) {
          index = $tabs.length - 1;
        } else if (index >= $tabs.length) {
          index = 0;
        }
        disabled = $tabs[index].disabled;
      }
      currentIndex = index;
      await tick();
      const activeTab =
        refTabList?.querySelectorAll("[role='tab']")[currentIndex];
      activeTab?.focus();
    },
  });
  afterUpdate(() => {
    selected = currentIndex;
    if (prevIndex > -1 && prevIndex !== currentIndex) {
      dispatch("change", currentIndex);
    }
    prevIndex = currentIndex;
  });
  let currentIndex = selected;
  let prevIndex = -1;
  $: currentIndex = selected;
  $: currentTab = $tabs[currentIndex] || undefined;
  $: currentContent = $content[currentIndex] || undefined;
  $: {
    if (currentTab) {
      selectedTab.set(currentTab.id);
    }
    if (currentContent) {
      selectedContent.set(currentContent.id);
    }
  }
</script>
<div
  {...$$restProps}
  role="navigation"
  class:tabs="{true}"
  class={`tabs-type-${type}`}
>
  <ul
    bind:this="{refTabList}"
    role="tablist"
    class:tabs__nav="{true}"
  >
    <slot />
  </ul>
</div>
<slot name="content" />

<style lang="scss">
  @import '../../../styles/global.scss';

  .tabs {
    .tabs__nav {
      padding: 0;
      margin: 0;
      list-style: none;
      display: flex;
    }

    &.tabs-type-nav {
      // Explore Navigation und Impacts Navigation
      @include tab-nav-wrapper();
    }

    &.tabs-type-list {
      // Geography-, Scenario-, und Sector-Liste
      .tabs__nav {
        flex-direction: column; // Vertical
        row-gap: var(--size-space-large-xxs); // Vertical spacing
      }
    }

    &.tabs-type-menu {
      // Geography-, Scenario- und Indicator-Selection
      .tabs__nav {
        flex-direction: row; // Horizontal
        column-gap: var(--size-space-large-l); // Horizontal spacing
      }
    }
  }
</style>