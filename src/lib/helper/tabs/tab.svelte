<script>
  export let loc = "";
  export let label = "";
  /** Specify the href attribute */
  export let href = "#";
  /** Set to `true` to disable the tab */
  export let disabled = false;
  /** Specify the tabindex */
  export let tabindex = "0";
  /** Set an id for the top-level element */
  export let id = "ccs-" + Math.random().toString(36);
  /** Obtain a reference to the anchor HTML element */
  export let ref = null;
  import { getContext } from "svelte";
  const { selectedTab, useAutoWidth, add, update, change } = getContext("Tabs");
  add({ id, label, disabled });
  $: selected = $selectedTab === id;
</script>

<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<li
  tabindex="-1"
  role="presentation"
  class:tabs__nav-item="{true}"
  class:tabs__nav-item--disabled="{disabled}"
  class:tabs__nav-item--selected="{selected}"
  aria-current={selected ? loc : 'false'}
  {...$$restProps}
  on:click|preventDefault
  on:click|preventDefault="{() => {
    if (!disabled) {
      update(id);
    }
  }}"
  on:mouseover
  on:mouseenter
  on:mouseleave
  on:keydown="{({ key }) => {
    if (!disabled) {
      if (key === 'ArrowRight') {
        change(1);
      } else if (key === 'ArrowLeft') {
        change(-1);
      } else if (key === ' ' || key === 'Enter') {
        update(id);
      }
    }
  }}"
>
  <a
    bind:this="{ref}"
    role="tab"
    tabindex="{disabled ? '-1' : tabindex}"
    aria-selected="{selected}"
    aria-disabled="{disabled}"
    id="{id}"
    href="{href}"
    class:tabs__nav-link="{true}"
    style="{$useAutoWidth ? 'width: auto' : undefined}"
  >
    <slot>{label}</slot>
  </a>
</li>

<style lang="scss">
  .tabs__nav-item {
    display: flex;
    padding: 0;
    cursor: pointer;

    &[aria-current="page"] a, &[aria-current="location"] a, &[aria-current="step"] a {
      font-weight: bold; // TODO
      color: orange; // TODO
    }

    &.tabs__nav-item--disabled,
    &.tabs__nav-item--disabled:hover {    
      &, a {
        color: gray; // TODO
        cursor: not-allowed;
      }
    }
  }
</style>