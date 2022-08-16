<script>
  /**
   * Specify the selected tile value
   * @type {string}
   */
  export let selected = undefined;
  /** Set to `true` to disable the tile group */
  export let disabled = false;
  /** Specify the legend text */
  export let legend = "";
  import { createEventDispatcher, setContext } from "svelte";
  import { writable } from "svelte/store";
  const dispatch = createEventDispatcher();
  const selectedValue = writable(selected);
  setContext("TileGroup", {
    selectedValue,
    add: ({ checked, value }) => {
      if (checked) {
        selectedValue.set(value);
      }
    },
    update: (value) => {
      selectedValue.set(value);
      dispatch("select", value);
    },
  });
  $: selected = $selectedValue;
  $: selectedValue.set(selected);
</script>

<fieldset disabled="{disabled}" class:tile-group="{true}" {...$$restProps}>
  <legend class:text-label="{true}" class:text-label--bold={true}>{legend}</legend>
  <div class="tile-group-content">
    <slot />
  </div>
</fieldset>

<style lang="scss">
  @import "../../../styles/global.scss";

  .tile-group {
    legend {
      margin-bottom: var(--size-space-large-xxxs); // I don't know why flex or grid gap is not working here.
    }

    @include unstyle-fieldset();

    .tile-group-content {
      display: grid;
      flex-direction: column;
      grid-auto-flow: column;
      row-gap: var(--size-space-large-xxxs);
      grid-template-rows: auto 1fr;
      height: 100%;
    }
  }
</style>