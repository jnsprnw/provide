<script>
  import PreviewChart from "../preview-chart/preview-chart.svelte";

  // https://github.com/carbon-design-system/carbon-components-svelte/blob/master/src/RadioButton/RadioButton.svelte

  /** Specify the value of the radio button */
  export let value = "";
  /** Set to `true` to check the radio button */
  export let checked = false;
  /** Set to `true` to disable the radio button */
  export let disabled = false;
  /** Set to `true` to mark the field as required */
  export let required = false;
  /**
   * Specify the label position
   * @type {"right" | "left"}
   */
  export let labelPosition = "right";
  /** Specify the label text */
  export let labelText = "";
  /** Set to `true` to visually hide the label text */
  export let hideLabel = false;
  /** Set an id for the input element */
  export let id = "ccs-" + Math.random().toString(36);
  /** Specify a name attribute for the radio button input */
  export let name = "";
  /** Obtain a reference to the input HTML element */
  export let ref = null;
  import { getContext } from "svelte";
  import { writable } from "svelte/store";
  const ctx = getContext("RadioButtonGroup");
  const selectedValue = ctx
    ? ctx.selectedValue
    : writable(checked ? value : undefined);
  if (ctx) {
    ctx.add({ id, checked, disabled, value });
  }
  $: checked = $selectedValue === value;
</script>

<div
  class:radio-button-wrapper="{true}"
  class:radio-button-wrapper--label-left="{labelPosition === 'left'}"
  {...$$restProps}
>
  <input
    bind:this="{ref}"
    type="radio"
    id="{id}"
    name="{name}"
    checked="{checked}"
    disabled="{disabled}"
    required="{required}"
    value="{value}"
    class:radio-button="{true}"
    on:change
    on:change="{() => {
      if (ctx) {
        ctx.update(value);
      }
    }}"
  />
  <label
    class:radio-button__label="{true}"
    class:radio-button--is-selected={checked}
    for="{id}">
    <span>{labelText}</span>
    <PreviewChart indicator={value} />
  </label>
</div>

<style lang="scss">
  @import "../../../styles/global.scss";

  input {
    @include visually-hidden();
  }

  .radio-button__label {
    @include tab();

    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 0.5rem; // TODO
  }
</style>