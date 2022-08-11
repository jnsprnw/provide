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

<div>
  <label for={selectId}>{label}</label>
  <select id={selectId} bind:value on:change={handleChange}>
    {#each options as option}
      <option value={option.uid || option.value}>{option.label}</option>
    {/each}
  </select>
</div>
