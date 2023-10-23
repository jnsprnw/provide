<script>
  import { createEventDispatcher } from 'svelte';

  export let uid;
  export let checked;
  export let value;
  export let disabled;

  const dispatch = createEventDispatcher();
  let ref;

  function handleChange() {
    dispatch('change', {
      uid,
    });
    // Enforce checked state so we can have a completely controled checkbox
    ref.checked = checked;
  }
</script>

<input
  type="checkbox"
  {value}
  bind:this={ref}
  id={uid}
  {checked}
  {...$$restProps}
  on:change={handleChange}
  aria-disabled={disabled}
  {disabled}
/>
