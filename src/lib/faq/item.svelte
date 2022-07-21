<script>
  // Adapted from by https://github.com/carbon-design-system/carbon-components-svelte/blob/master/src/Accordion/AccordionItem.svelte
  /** Set to `true` to open the first accordion item */
  export let open = false;
  /** Set to `true` to disable the accordion item */
  export let disabled = false;
  /** Specify the ARIA label for the accordion item chevron icon */
  export let iconDescription = "Expand/Collapse";
  import { onMount, getContext } from "svelte";
  // import Chevron from "../Icons/Chevron.svelte";
  let initialDisabled = disabled;
  // const ctx = getContext("Accordion");
  // const unsubscribe = ctx.disableItems.subscribe((value) => {
  //   if (!value && initialDisabled) return;
  //   disabled = value;
  // });
  let animation = undefined;
  onMount(() => {
    return () => {
      unsubscribe();
    };
  });
</script>

<div
  itemscope
  itemprop="mainEntity"
  itemtype="https://schema.org/Question"
  class="question"
  class:accordion__item="{true}"
  class:accordion__item--active="{open}"
  class:accordion__item--disabled="{disabled}"
  class:accordion__item--expanding="{animation === 'expanding'}"
  class:accordion__item--collapsing="{animation === 'collapsing'}"
  {...$$restProps}
  on:animationend
  on:animationend="{() => {
    animation = undefined;
  }}">
    <button
      type="button"
      class:accordion__heading="{true}"
      title="{iconDescription}"
      aria-expanded="{open}"
      disabled="{disabled}"
      on:click
      on:click="{() => {
        open = !open;
        animation = open ? 'expanding' : 'collapsing';
      }}"
      on:mouseover
      on:mouseenter
      on:mouseleave
      on:keydown
      on:keydown="{({ key }) => {
        if (open && key === 'Escape') {
          open = false;
        }
      }}"
      itemprop="name"
    >
      <div class:accordion__title="{true}">
        <slot name="term" />
      </div>
    </button>
  <div
    itemscope
    itemprop="acceptedAnswer"
    itemtype="https://schema.org/Answer"
    class:accordion__content="{true}">
    <div itemprop="text">
      <slot name="description" />
    </div>
  </div>
</div>

<style lang="scss">
  .question {
    grid-column: 7 / span 6;
  }
</style>