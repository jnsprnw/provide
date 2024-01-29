<script>
  import Select from '$lib/controls/Select/Select.svelte';
  import { sortBy } from 'lodash-es';
  import { CURRENT_INDICATOR_PARAMETERS, CURRENT_INDICATOR_OPTION_VALUES, IS_COMBINATION_AVAILABLE_INDICATOR } from '$stores/state.js';
  import { KEY_PARAMETER_INDICATOR_VALUE } from '$config';

  $: parameters = $CURRENT_INDICATOR_PARAMETERS
    .map((parameter) => ({
      ...parameter,
      value: $CURRENT_INDICATOR_OPTION_VALUES[parameter.uid],
    }))
    .filter((d) => d.options.length > 1);

  // Some indicators have a special parameter that determines their specific value
  // This parameter should be listed first
  $: parametersSorted = sortBy(parameters, ({ uid }) => uid !== KEY_PARAMETER_INDICATOR_VALUE);

  $: handleChange = ({ detail: { key, value } }) =>
    ($CURRENT_INDICATOR_OPTION_VALUES = {
      ...$CURRENT_INDICATOR_OPTION_VALUES,
      [key]: value,
    });
</script>

<div class="flex gap-4 flex-wrap" id="indicator-parameters">
  {#each parametersSorted as parameter}
    <Select disabled={!$IS_COMBINATION_AVAILABLE_INDICATOR} {...parameter} labelColor="text-theme-base" on:change={handleChange} />
  {/each}
</div>
