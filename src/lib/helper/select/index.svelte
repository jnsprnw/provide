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
</script>

<div class="root">
  <label class="control-label" for={selectId}>{label}</label>
  <div class="select-wrapper">
    <select class="select" id={selectId} bind:value on:change={handleChange}>
      {#each options as option}
        <option value={option.uid || option.value}>{option.label}</option>
      {/each}
    </select>
  </div>
</div>

<style lang="scss">
  @import '../../../styles/global.scss';

  .root {
    display: flex;
    font-size: var(--font-size-s);
  }

  .control-label {
    display: inline;
    margin-right: var(--space-xs);
    color: var(--color-light-text-base);
  }

  .select-wrapper {
    display: grid;
    grid-template-areas: 'select';
    align-items: center;

    &:after {
      content: '';
      width: 0.45em;
      height: 0.45em;
      border-right: 1px solid var(--color-light-foreground-base);
      border-bottom: 1px solid var(--color-light-foreground-base);
      transform: rotate(45deg) translate(-0.2em);
      // background-color: var(--color-text-weaker);
      // clip-path: polygon(100% 0%, 0 0%, 50% 100%);
      justify-self: end;
    }

    select,
    &:after {
      grid-area: select;
    }
  }

  .select {
    appearance: none;
    // Additional resets for further consistency
    background-color: transparent;
    border: none;
    padding: 0 1em 0 0;
    margin: 0;
    width: 100%;
    font-family: inherit;
    font-size: inherit;
    cursor: inherit;
    line-height: inherit;
    font-size: var(--font-size-s);
    color: var(--color-light-text-base);
    font-weight: var(--font-font-weight-bold-number);
  }
</style>
