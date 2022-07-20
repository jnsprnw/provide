<script>
  /**
   * Set the selected radio button value
   * @type {string}
   */
  export let selected = undefined;
  /** Set to `true` to disable the radio buttons */
  export let disabled = false;
  /** Specify the legend text */
  export let legendText = "";
  /** Set to `true` to visually hide the legend */
  export let hideLegend = false;
  /**
   * Set an id for the container div element
   * @type {string}
   */
  export let id = undefined;
  import {
    beforeUpdate,
    createEventDispatcher,
    onMount,
    setContext,
  } from "svelte";
  import { writable } from "svelte/store";
  const dispatch = createEventDispatcher();
  const selectedValue = writable(selected);
  setContext("RadioButtonGroup", {
    selectedValue,
    add: ({ checked, value }) => {
      if (checked) {
        selectedValue.set(value);
      }
    },
    update: (value) => {
      selected = value;
    },
  });
  onMount(() => {
    $selectedValue = selected;
  });
  beforeUpdate(() => {
    $selectedValue = selected;
  });
  selectedValue.subscribe((value) => {
    selected = value;
    dispatch("change", value);
  });
</script>

<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<div
  id="{id}"
  class:form-item="{true}"
  {...$$restProps}
  on:click
  on:mouseover
  on:mouseenter
  on:mouseleave
>
  <fieldset class="radio-button-group">
    <legend class="label text-label text-label--bold">
      { legendText }
    </legend>
    <slot />
  </fieldset>
</div>

<style lang="scss">
  .radio-button-group {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem; // TODO

    .label {
      grid-column-start: 0;
      grid-column-end: 3;
    }
  }
</style>