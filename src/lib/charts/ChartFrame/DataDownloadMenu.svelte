<script>
  import Menu from '$lib/controls/Menu/Menu.svelte';
  import PillGroup from '$lib/controls/PillGroup/PillGroup.svelte';
  import PopoverButton from '$lib/controls/PopoverButton/PopoverButton.svelte';
  import { map } from 'lodash-es';
  import { stringify } from 'qs';
  import { writable } from 'svelte/store';

  export let baseParams;
  export let params;
  export let endpoint;

  let selectedParams = writable(
    params.reduce(
      (memo, param) => ({
        ...memo,
        [param.uid]: param.options[0].uid,
      }),
      {}
    )
  );

  $: queryParameters = { ...baseParams, ...$selectedParams };
  $: query = stringify(queryParameters);
  $: url = new URL(
    `${import.meta.env.VITE_DATA_API_URL}/${endpoint}/?${query}`
  );
</script>

<PopoverButton label="Download data">
  <div class="grid grid-cols-6">
    {#each params as param}
      <div class="col-span-2">{param.label}</div>
      <div class="col-span-4 col-start-3">
        <PillGroup
          options={param.options}
          bind:currentUid={$selectedParams[param.uid]}
        />
      </div>
    {/each}
    <a href={url} download>Download</a>
  </div>
</PopoverButton>
