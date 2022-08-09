<script>
  import Option from './option.svelte';
  import { get, compact, find } from 'lodash-es';
  import {
    CURRENT_INDICATOR_OPTIONS,
    CURRENT_INDICATOR_OPTIONS_SELECTION,
    CURRENT_INDICATOR_OPTIONS_KEYS,
  } from '$lib/../stores/store.js';

  let options_list;
  CURRENT_INDICATOR_OPTIONS.subscribe((value) => {
    options_list = value;
  });

  let options_selection;
  CURRENT_INDICATOR_OPTIONS_SELECTION.subscribe((value) => {
    options_selection = value;
  });

  $: console.log(
    $CURRENT_INDICATOR_OPTIONS,
    $CURRENT_INDICATOR_OPTIONS_SELECTION,
    $CURRENT_INDICATOR_OPTIONS_KEYS
  );

  $: options_element = compact(
    options_list.map(({ options, key }) => {
      // Let’s first see, if we find a default value
      // If not, set it to the first value in the options list.
      let selected = get(options_selection, key);
      if (!selected) {
        console.warn(
          `Default option was not found for »${key}«. Check default value and list of options.`
        );
        selected = get(options, [0, 'value']);
      }
      // If selected is unset (because the list of options is empty, we don’t want the option listed)
      if (!find(options, { value: selected })) {
        console.warn(
          `Could not find value »${selected}« for »${key}«. Check list of options. Will hide the option.`
        );
        return false;
      }
      return {
        options,
        key,
        selected,
      };
    })
  );

  function handleChange({ detail }) {
    CURRENT_INDICATOR_OPTIONS_SELECTION.update((old) => ({
      ...old,
      ...detail,
    }));
  }
</script>

<!-- <h3>{ JSON.stringify($CURRENT_INDICATOR_OPTIONS_SELECTION) }</h3>
<h3>{ JSON.stringify($CURRENT_INDICATOR_OPTIONS) }</h3>
<h3>{ JSON.stringify($CURRENT_INDICATOR_OPTIONS_KEYS) }</h3> -->

{#each options_element as { options, key, selected }}
  <Option {options} {key} {selected} on:change={handleChange} />
{/each}
