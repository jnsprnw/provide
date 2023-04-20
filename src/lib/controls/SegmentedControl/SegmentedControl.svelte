<script context="module">
  let instance = 0;
</script>

<script>
  import { createEventDispatcher } from 'svelte';
  export let options = [];
  export let value;
  export let label;
  export let uid;

  $: selectId = uid || `select-${instance}`;

  instance++;
</script>

<div class="flex">
  {#if label}
    <legend class="control-label" for={selectId}>{label}</legend>
  {/if}
  <fieldset role="radiogroup" class="flex" id={selectId}>
    {#each options as option}
      <div
        class:text-theme-base={option.uid === value}
        class:font-bold={option.uid === value}
        class="cursor-pointer border px-3 py-1 border-foreground-weakest first:border-r-0 flex items-center first:rounded-l last:rounded-r"
      >
        <input
          type="radio"
          class="appearance-none"
          id={option.uid}
          value={option.uid}
          bind:group={value}
        />
        <label class="cursor-pointer" for={option.uid}>{option.label}</label>
      </div>
    {/each}
  </fieldset>
</div>
