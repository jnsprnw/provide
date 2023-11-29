<script context="module">
  let instance = 0;
</script>

<script>
  import { KEY_LABEL, KEY_LABEL_LONG, KEY_PARAMETER_INDICATOR_VALUE } from '$src/config.js';
  import { createEventDispatcher } from 'svelte';
  import Chevron from '$lib/helper/icons/Chevron.svelte';
  import { IS_STATIC } from '$stores/state';
  export let options = [];
  export let value;
  export let label;
  export let uid;
  export let backgroundColor = 'bg-transparent';
  export let labelColor = 'text-theme-base';
  export let disabled = false;

  const dispatch = createEventDispatcher();

  function handleChange() {
    dispatch('change', { key: uid, value });
  }

  $: selectId = uid || `select-${instance}`;

  $: isIndicatorValue = uid === KEY_PARAMETER_INDICATOR_VALUE;

  instance++;
</script>

{#if !$IS_STATIC}
  <div class="flex gap-2 items-center font-normal transition-colors border border-transparent"
      class:rounded={isIndicatorValue}
      class:bg-surface-base={isIndicatorValue}
      class:px-3={isIndicatorValue}
      class:border-theme-weakest={isIndicatorValue}>
    <label
      class="text-text-weaker text-sm"
      class:text-theme-weaker={disabled}
      for={selectId}>{label}</label
    >
    <div class={`rounded overflow-hidden flex gap-x-1 border-0`}>
      <select
        class={`py-1.5 px-2 pr-4 text-right text-sm font-bold appearance-none aria-disabled:cursor-not-allowed ${backgroundColor} ${labelColor}`}
        aria-disabled={disabled}
        class:text-theme-weaker={disabled}
        id={selectId}
        {disabled}
        bind:value
        on:change={handleChange}
      >
        {#each options as option}
          <option value={option.uid || option.value}>{option[KEY_LABEL_LONG] || option[KEY_LABEL]}</option>
        {/each}
      </select>
      <Chevron class={`-ml-5 pointer-events-none ${disabled ? 'stroke-theme-weaker' : 'stroke-theme-base'}`} />
    </div>
  </div>
{/if}
