<script context="module">
  let instance = 0;
</script>

<script>
  import { KEY_LABEL, KEY_LABEL_LONG } from '$src/config.js';
  import { createEventDispatcher } from 'svelte';
  export let options = [];
  export let value;
  export let label;
  export let uid;
  export let borderColor = 'border-transparent';
  export let backgroundColor = 'bg-transparent';
  export let labelColor = 'text-theme-base';

  const dispatch = createEventDispatcher();

  function handleChange() {
    dispatch('change', { key: uid, value });
  }

  $: selectId = uid || `select-${instance}`;

  instance++;
</script>

<div class="flex gap-1 items-center">
  <label class="text-foreground-weak text-sm" for={selectId}>{label}</label>
  <select
    class={`p-0 text-sm font-bold border py-1.5 px-5 after:content-['▾'] appearance-none ${backgroundColor} ${borderColor} ${labelColor}`}
    id={selectId}
    bind:value
    on:change={handleChange}
  >
    {#each options as option}
      <option value={option.uid || option.value}
        >{option[KEY_LABEL_LONG] || option[KEY_LABEL]}</option
      >
    {/each}
  </select>
</div>
