<script>
  import { createEventDispatcher } from 'svelte';
  export let uid;
  export let options;
  export let selected;
  export let label;

  const dispatch = createEventDispatcher();

  function handleChange() {
    dispatch('change', { [uid]: selected });
  }
</script>

<label for={uid}>{label}</label>
<select id={uid} bind:value={selected} on:change={handleChange}>
  {#each options as { value, label }}
    <option {value}>
      {label}
    </option>
  {/each}
</select>
