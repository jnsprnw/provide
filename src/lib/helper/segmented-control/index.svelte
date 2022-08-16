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

  // function handleChange() {
  //   dispatch('change', { key: uid, value });
  // }

  $: selectId = uid || `select-${instance}`;

  instance++;
</script>

<div class="root">
  {#if label}
    <legend class="control-label" for={selectId}>{label}</legend>
  {/if}
  <fieldset role="radiogroup" class="segments" id={selectId}>
    {#each options as option}
      <div class="segment">
        <input
          type="radio"
          class="segment-button"
          id={option.uid || option.value}
          value={option.uid || option.value}
          bind:group={value}
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
    font-size: var(--font-size-m);
  }
  .control-label {
    display: inline;
    margin-right: var(--space-xs);
    color: var(--color-text-weaker);
  }
  .segments {
    display: flex;
  }
  .segment {
    cursor: pointer;

    &:first-child .segment-label {
      padding-left: 0;
    }
    &:last-child .segment-label {
      padding-right: 0;
    }
  }
  .segment-button {
    @include visually-hidden();

    &:checked {
      & + .segment-label {
        font-weight: var(--font-font-weight-bold);
        box-shadow: inset 0 -2px 0 var(--color-functional-accent);
      }
    }

    &:focus + .segment-label {
      outline: auto;
    }
  }
  .segment-label {
    color: var(--color-text-base);
    padding: 0.4em 0.3em;
    box-shadow: inset 0 -2px 0 var(--color-foreground-weakest);
  }
</style>
