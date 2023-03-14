<script>
  /**
   * @event {boolean} check
   */
  /**
   * Specify the value of the checkbox
   * @type {any}
   */
  export let value = '';
  /** Specify whether the checkbox is checked */
  export let checked = false;
  /**
   * Specify the bound group
   * @type {ReadonlyArray<any>}
   */
  export let maxSelectableItems = 3;
  export let minSelectableItems = 1;

  export let group = undefined;
  /** Specify whether the checkbox is indeterminate */
  export let indeterminate = false;
  /** Set to `true` to mark the field as required */
  export let required = false;
  /** Set to `true` for the checkbox to be read-only */
  export let readonly = false;
  /** Set to `true` to disable the checkbox */
  // export let disabled = false;
  /** Specify the label text */
  export let labelText = '';
  /** Set a name for the input element */
  export let name = '';
  /**
   * Specify the title attribute for the label element
   * @type {string}
   */
  export let title = undefined;
  /** Set an id for the input label */
  export let id = 'ccs-' + Math.random().toString(36);
  /** Obtain a reference to the input HTML element */
  export let ref = null;
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
  $: isFull = group.length >= maxSelectableItems;
  $: useGroup = Array.isArray(group);
  $: checked = useGroup ? group.includes(value) : checked;
  $: position = group.indexOf(value);
  $: dispatch('check', checked);
  let refLabel = null;
  $: isTruncated = refLabel?.offsetWidth < refLabel?.scrollWidth;
  $: title = !title && isTruncated ? refLabel?.innerText : title;
  $: disabled = isFull && !checked;
</script>

<!-- svelte-ignore a11y-mouse-events-have-key-events -->

<div
  class:form-item={true}
  class:checkbox-wrapper={true}
  {...$$restProps}
  on:click
  on:mouseover
  on:mouseenter
  on:mouseleave
>
  <input
    bind:this={ref}
    type="checkbox"
    {value}
    {checked}
    {disabled}
    {id}
    {indeterminate}
    {name}
    {required}
    {readonly}
    class:checkbox={true}
    on:change={() => {
      if (useGroup) {
        if (group.includes(value)) {
          const filtered = group.filter((item) => item !== value);
          group = filtered.length >= minSelectableItems ? filtered : group;
        } else if (!isFull) {
          group = [...group, value];
        }
      } else {
        checked = !checked;
      }
    }}
    on:change
    on:blur
  />
  <label
    for={id}
    {title}
    class:checkbox-label={true}
    aria-disabled={disabled}
    class={checked ? `checked-${position}` : ''}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="icon checkbox"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <rect
        x="4"
        y="4"
        width="16"
        height="16"
        rx="2"
        class="box"
        stroke="currentColor"
        fill={checked ? 'currentColor' : 'none'}
        stroke-width="1"
      />
      {#if checked}
        <path
          d="M9 12l2 2l4 -4"
          class="mark"
          stroke="currentColor"
          fill="none"
          stroke-width="2"
        />
      {/if}
    </svg>
    <div bind:this={refLabel} class:checkbox-label-text={true}>
      {labelText}
    </div>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="icon color-indicator"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      stroke-width="2"
      stroke="none"
      fill="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <circle cx="12" cy="12" r="5" />
    </svg>
  </label>
</div>

<style lang="postcss">
  // @import '../../../styles/global.scss';

  // input {
  //   @include visually-hidden();
  // }

  // .checkbox-label {
  //   @include tab();

  //   display: grid;
  //   grid-template-columns: auto 1fr auto;
  //   grid-gap: 1rem; // TODO
  //   align-items: end;
  //   justify-content: space-between;
  //   transition: color var(--transition-duration-base) ease-out;

  //   .color-indicator {
  //     color: transparent;
  //     transition: color var(--transition-duration-base) ease-out;
  //   }

  //   .mark {
  //     color: #fff; // TODO
  //     transition: color var(--transition-duration-base) ease-out;
  //   }

  //   .box {
  //     color: var(--color-foreground-weaker); // TODO
  //     transition: color var(--transition-duration-base) ease-out;
  //   }
  // }
  // input:checked + label {
  //   .box {
  //     color: var(--color-functional-accent);
  //   }
  // }
</style>
