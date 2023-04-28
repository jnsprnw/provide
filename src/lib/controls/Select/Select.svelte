<script context="module">
  let instance = 0;
</script>

<script>
  import { KEY_LABEL, KEY_LABEL_LONG } from '$src/config.js';
  import { createEventDispatcher } from 'svelte';
  import Chevron from '$lib/helper/icons/Chevron.svelte';
  import { IS_STATIC } from '$stores/state';
  export let options = [];
  export let value;
  export let label;
  export let uid;
  export let borderColor = 'border-foreground-weakest';
  export let backgroundColor = 'bg-transparent';
  export let labelColor = 'text-theme-base';

  const dispatch = createEventDispatcher();

  function handleChange() {
    dispatch('change', { key: uid, value });
  }

  $: selectId = uid || `select-${instance}`;

  $: currentOption = options.find((d) => d.uid === value || d.value === value);

  $: console.log(value, options);

  instance++;
</script>

{#if !$IS_STATIC}
  <div class="flex gap-2 items-center">
    <label class="text-foreground-weak text-sm" for={selectId}>{label}</label>
    <div class={`border rounded overflow-hidden flex relative ${borderColor}`}>
      <select
        class={`py-1.5 pl-2 pr-8 text-sm font-bold appearance-none ${backgroundColor} ${labelColor}`}
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

      <Chevron class="absolute right-1 pointer-events-none stroke-theme-base" />
    </div>
  </div>
{/if}
