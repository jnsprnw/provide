<script>
  import Option from './option.svelte';
  import { get, compact, find } from 'lodash-es';
  import {
    CURRENT_INDICATOR_PARAMETERS,
    CURRENT_INDICATOR_OPTIONS,
  } from '$lib/../stores/store.js';

  $: parameters = compact(
    $CURRENT_INDICATOR_PARAMETERS.map((parameter) => {
      // Let’s first see, if we find a default value
      // If not, set it to the first value in the options list.
      let selected = get($CURRENT_INDICATOR_OPTIONS, parameter.uid);
      // TODO: Check's not needed anymore since we get default values from CA. Right?
      // if (!selected) {
      //   console.warn(
      //     `Default option was not found for »${uid}«. Check default value and list of options.`
      //   );
      //   selected = get(options, [0, 'value']);
      // }
      // // If selected is unset (because the list of options is empty, we don’t want the option listed)
      // if (!find(options, { value: selected })) {
      //   console.warn(
      //     `Could not find value »${selected}« for »${uid}«. Check list of options. Will hide the option.`
      //   );
      //   return false;
      // }
      return {
        ...parameter,
        selected,
      };
    })
  );

  function handleChange({ detail }) {
    CURRENT_INDICATOR_OPTIONS.update((old) => ({
      ...old,
      ...detail,
    }));
  }
</script>

{#each parameters as parameter}
  <Option {...parameter} on:change={handleChange} />
{/each}
