<script>
  import { getContext } from 'svelte';
  import { isArray } from 'lodash-es';
  import Accordion from '$lib/helper/icons/Accordion.svelte';

  export let loc = 'step';
  export let label = '';
  export let selectedValues = null;
  export let missingValue = 'Select a value';
  export let disabled = false;
  export let tabindex = '0';
  export let id = 'ccs-' + Math.random().toString(36);
  export let ref = null;
  const { selectedTab, useAutoWidth, add, update, change } = getContext('Tabs');
  add({ id, label, disabled });
  $: selected = $selectedTab === id;

  $: valuesHasMultiple = isArray(selectedValues);
  $: valueMissing = valuesHasMultiple
    ? selectedValues.length === 0
    : !Boolean(selectedValues);
  $: displayedValue =
    (valuesHasMultiple ? selectedValues[0] : selectedValues) || missingValue;
  $: valuesCounter =
    valuesHasMultiple && !valueMissing ? selectedValues.length - 1 : 0;
  $: otherValues = valuesCounter > 0 ? selectedValues.slice(1) : [];
</script>

<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<li
  tabindex="-1"
  role="presentation"
  class:tab={true}
  aria-selected={selected}
  aria-disabled={disabled}
  aria-current={selected ? loc : 'false'}
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
  {#if label}<label class="text-label" for={id}>{label}</label>{/if}
  <span
    bind:this={ref}
    role="tab"
    tabindex={disabled ? '-1' : tabindex}
    aria-selected={selected}
    aria-disabled={disabled}
    {id}
    class:tabs-link={true}
    class:tabs--missing={valueMissing}
    class:hasMoreItems={valuesCounter}
  >
    <strong>{displayedValue}</strong>
    {#if valuesCounter}<small title={otherValues.join(' and ')}
        >+{valuesCounter} more</small
      >{/if}
    <Accordion isOpen={selected} />
  </span>
</li>

<style lang="postcss">
  @import '../../../styles/global.scss';

  .tab {
    display: flex;
    padding: 0;
    flex-direction: column;
    gap: var(--space-xs);
    cursor: pointer;
    min-width: 170px;
    transition: color var(--transition-duration-base) ease-out;
    line-height: 1.2;

    span {
      padding: var(--space-m);
      transition: box-shadow var(--transition-duration-base) ease-out;
      font-size: var(--font-size-l);
      border-radius: var(--radius-interactive-l);
      box-shadow: inset 0px 0px 0px var(--stroke-default)
        var(--color-foreground-weaker); // We use box-shadow to not resize the button on border-size.
      display: grid;
      grid-template-columns: repeat(2, auto);
      grid-gap: var(--space-s);
      align-items: end;
      justify-content: space-between;
      background-color: var(--color-background-base);
      color: var(--color-brand-stronger);

      &.hasMoreItems {
        grid-template-columns: repeat(3, auto);
      }

      strong {
        font-weight: var(--font-weight-extrabold);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 240px;
      }

      small {
        display: block;
        font-weight: var(--font-weight-regular);
        margin-left: var(--space-s);
      }

      &.tabs--missing {
        * {
          font-style: var(--font-font-weight-regular-italic); // TODO
          font-weight: var(
            --font-weight-regular
          ); // TODO. Why is this not working?
        }
      }
    }

    &:hover,
    &:focus {
      span {
        box-shadow: inset 0px 0px 0px var(--stroke-default)
          var(--color-foreground-base);
      }
    }

    &[aria-selected='true'] {
      span {
        box-shadow: inset 0px 0px 0px var(--stroke-active)
          var(--color-functional-accent);
      }
    }

    &[aria-disabled='true'],
    &[aria-disabled='true']:hover {
      &,
      span {
        cursor: not-allowed;
      }
    }
  }
</style>
