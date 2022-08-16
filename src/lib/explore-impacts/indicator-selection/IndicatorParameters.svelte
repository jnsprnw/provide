<script>
  import Select from '$lib/helper/select/index.svelte';
  import { get, compact } from 'lodash-es';
  import {
    CURRENT_INDICATOR_PARAMETERS,
    CURRENT_INDICATOR_OPTION_VALUES,
    CURRENT_INDICATOR,
  } from '$lib/../stores/store.js';

  $: parameters = $CURRENT_INDICATOR_PARAMETERS
    .map((parameter) => {
      let value = get($CURRENT_INDICATOR_OPTION_VALUES, parameter.uid);
      return {
        ...parameter,
        value,
      };
    })
    .filter((d) => d.options.length > 1);

  function handleChange({ detail: { key, value } }) {
    CURRENT_INDICATOR_OPTION_VALUES.update((old) => ({
      ...old,
      [key]: value,
    }));
  }
</script>

<div class="wrapper">
  <div class="label">Options for {$CURRENT_INDICATOR.label}</div>
  <div>
    {#each parameters as parameter}
      <Select {...parameter} on:change={handleChange} />
    {/each}
  </div>
</div>

<style lang="scss">
  .wrapper {
    display: flex;
  }

  .label {
    margin-right: var(--space-m);
  }
</style>
