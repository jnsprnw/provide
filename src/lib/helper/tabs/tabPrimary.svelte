<script>
  import { getContext } from "svelte";
  import { isArray } from "lodash-es";

  export let loc = "step";
  export let label = "";
  export let selectedValues = null;
  export let missingValue = 'Select a value';
  export let href = "#"; // TODO
  export let disabled = false;
  export let tabindex = "0";
  export let id = "ccs-" + Math.random().toString(36);
  export let ref = null;
  const { selectedTab, useAutoWidth, add, update, change } = getContext("Tabs");
  add({ id, label, disabled });
  $: selected = $selectedTab === id;

  $: valuesHasMultiple = isArray(selectedValues);
  $: valueMissing = valuesHasMultiple ? selectedValues.length === 0 : !Boolean(selectedValues);
  $: displayedValue = (valuesHasMultiple ? selectedValues[0] : selectedValues) || missingValue;
  $: valuesCounter = valuesHasMultiple && !valueMissing ? selectedValues.length - 1 : 0;
  $: otherValues = valuesCounter > 0 ? selectedValues.slice(1) : [];
</script>

<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<li
  tabindex="-1"
  role="presentation"
  class:tab={ true }
  aria-selected={selected}
  aria-disabled={disabled}
  aria-current={ selected ? loc : 'false' }
  {...$$restProps}
  on:click|preventDefault={() => {
    if (!disabled) {
      update(id);
    }
  }}
  on:keydown={({ key }) => {
    if (!disabled) {
      if (key === 'ArrowRight') {
        change(1);
      } else if (key === 'ArrowLeft') {
        change(-1);
      } else if (key === ' ' || key === 'Enter') {
        update(id);
      }
    }
  }}
>
  {#if label }<label class="text-label" for={id}>{ label }</label>{/if}
  <span
    bind:this="{ref}"
    role="tab"
    tabindex="{disabled ? '-1' : tabindex}"
    aria-selected="{selected}"
    aria-disabled="{disabled}"
    id="{id}"
    class:tabs-link="{true}"
    class:tabs--missing={valueMissing}
  >
    <strong>{ displayedValue }</strong>
    {#if valuesCounter}<small title={otherValues.join(' and ')}>+{ valuesCounter } more</small>{/if}
  </span>
</li>

<style lang="scss">
  @import "../../../styles/global.scss";

  .tab {
    display: flex;
    padding: 0;
    flex-direction: column;
    gap: var(--size-spacer-large-xs);
    cursor: pointer;
    min-width: 170px;
    transition: color 0.3s ease-out;

    span {
      padding: var(--size-space-large-m);
      transition: box-shadow 0.3s ease-out; // TODO
      font-size: var(--font-size-large-l);
      font-weight: var(--font-font-weight-bold);
      border-radius: var(--radius-interactive); // TODO
      box-shadow: inset 0px 0px 0px var(--stroke-default) var(--color-light-blue300); // We use box-shadow to not resize the button on border-size.

      &.tabs--missing {
        * {
          font-style: var(--font-font-weight-regular-italic); // TODO
          font-weight: var(--font-font-weight-regular); // TODO. Why is this not working?
        }
      }
    }

    &[aria-selected="true"] span {
      box-shadow: inset 0px 0px 0px var(--stroke-active) var(--color-functional-accent);
    }

    &[aria-disabled="true"],
    &[aria-disabled="true"]:hover {    
      &, span {
        color: var(--color-light-blue300); // TODO
        cursor: not-allowed;
      }
    }
  }
</style>