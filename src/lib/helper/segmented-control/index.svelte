<script context="module">
  let instance = 0;
</script>

<script>
  import { createEventDispatcher } from 'svelte';
  export let options = [];
  export let value;
  export let label;
  export let uid;

  const dispatch = createEventDispatcher();

  function handleChange() {
    dispatch('change', { key: uid, value });
  }

  $: selectId = uid || `select-${instance}`;

  instance++;
  $: console.log(value, options);
</script>

<!--     <SegmentedControl
      label="Show"
      options={[
        { label: 'Difference', value: 'difference' },
        { label: 'Side by side', value: 'side-by-side' },
      ]}
      bind:value={view}
    /> -->
<div class="root">
  <legend class="control-label" for={selectId}>{label}</legend>
  <fieldset role="radiogroup" class="segments" id={selectId}>
    {#each options as option}
      <div class="segment">
        <input
          type="radio"
          class="segment-button"
          class:is-checked={value === option.value}
          id={option.uid || option.value}
          value={option.uid || option.value}
          bind:group={value}
          on:change={() => console.log('changed')}
        />
        <label class="segment-label" for={option.uid || option.value}
          >{option.label}</label
        >
      </div>
    {/each}
  </fieldset>
</div>

<style lang="scss">
  @import '../../../styles/global.scss';

  .root {
    display: flex;
  }
  .control-label {
    display: inline;
  }
  .segments {
    display: flex;
  }
  .segment {
    cursor: pointer;
  }
  .segment-button {
    @include visually-hidden();

    &:checked {
      & + .segment-label {
        font-weight: var(--font-font-weight-bold);
        box-shadow: inset 0 -3px 0 var(--color-functional-accent);
      }
    }

    &:focus + .segment-label {
      outline: auto;
    }
  }
  .segment-label {
    font-size: var(--font-size-s);
    color: var(--color-text-base);
    padding: 0.4em;
    box-shadow: inset 0 -1px 0 var(--color-foreground-weakest);
  }
</style>
