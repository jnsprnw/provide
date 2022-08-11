<script>
  import Select from '$lib/helper/select/index.svelte';
  import { get, compact } from 'lodash-es';
  import {
    CURRENT_INDICATOR_PARAMETERS,
    CURRENT_INDICATOR_OPTIONS,
  } from '$lib/../stores/store.js';

  $: parameters = $CURRENT_INDICATOR_PARAMETERS
    .map((parameter) => {
      let value = get($CURRENT_INDICATOR_OPTIONS, parameter.uid);
      return {
        ...parameter,
        value,
      };
    })
    .filter((d) => d.options.length > 1);

  function handleChange({ detail: { key, value } }) {
    CURRENT_INDICATOR_OPTIONS.update((old) => ({
      ...old,
      [key]: value,
    }));
  }
</script>

{#each parameters as parameter}
  <Select {...parameter} on:change={handleChange} />
{/each}
