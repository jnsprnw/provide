<script>
  import Select from '$lib/helper/select/index.svelte';
  import {
    CURRENT_INDICATOR_PARAMETERS,
    CURRENT_INDICATOR_OPTION_VALUES,
  } from '$stores/state.js';

  $: parameters = $CURRENT_INDICATOR_PARAMETERS
    .map((parameter) => ({
      ...parameter,
      value: $CURRENT_INDICATOR_OPTION_VALUES[parameter.uid],
    }))
    .filter((d) => d.options.length > 1);

  $: handleChange = ({ detail: { key, value } }) =>
    ($CURRENT_INDICATOR_OPTION_VALUES = {
      ...$CURRENT_INDICATOR_OPTION_VALUES,
      [key]: value,
    });
</script>

<div class="flex">
  {#each parameters as parameter}
    <Select {...parameter} on:change={handleChange} />
  {/each}
</div>
