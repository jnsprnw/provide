<script context="module">
  let instance = 0;
</script>

<script>
  import { KEY_LABEL, KEY_LABEL_LONG, KEY_PARAMETER_INDICATOR_VALUE } from '$src/config.js';
  import { createEventDispatcher } from 'svelte';
  import Chevron from '$lib/helper/icons/Chevron.svelte';
  import Info from '$lib/helper/icons/Info.svelte';
  import { IS_STATIC } from '$stores/state';
  export let options = [];
  export let value;
  export let label;
  export let uid = undefined;
  export let backgroundColor = 'bg-transparent';
  export let labelColor = 'text-theme-base';
  export let disabled = false;
  export let description = undefined;

  const dispatch = createEventDispatcher();

  $: selectId = uid || `select-${instance}`;

  function handleChange() {
    dispatch('change', { key: selectId, value });
  }

  $: isIndicatorValue = uid === KEY_PARAMETER_INDICATOR_VALUE;

  instance++;
</script>

{#if !$IS_STATIC}
  <div
    class="flex gap-2 rounded items-center font-normal transition-colors border-theme-base/10 px-3"
    class:border={isIndicatorValue}
    class:bg-surface-base={isIndicatorValue}
    class:hover:bg-surface-base={!isIndicatorValue}
    class:hover:border-theme-weakest={isIndicatorValue}
  >
    <label class="text-text-weaker text-sm" class:font-bold={isIndicatorValue} class:text-theme-weaker={disabled} for={selectId}>{label}</label>
    {#if description?.length}
      <Info {description} />
    {/if}
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
