<script>
  import Menu from '$lib/controls/Menu/Menu.svelte';
  import PillGroup from '$lib/controls/PillGroup/PillGroup.svelte';
  import PopoverButton from '$lib/controls/PopoverButton/PopoverButton.svelte';
  import { map, sortBy } from 'lodash-es';
  import { stringify } from 'qs';
  import { writable } from 'svelte/store';

  export let baseParams;
  export let params = [];
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

  $: maxVersions = params.reduce(
    (memo, param) => param.options.length * memo,
    1
  );
</script>

{#if maxVersions > 1}
  <PopoverButton label="Download data">
    <div class="max-w-xs px-4">
      {#each params as param}
        <div
          class="py-2.5 grid grid-cols-7 gap-2 border-b items-center border-foreground-weakest last:border-none"
        >
          <span class="col-span-2 text-foreground-weak text-sm"
            >{param.label}</span
          >

          <div class="col-span-5 col-start-3">
            {#if param.options.length > 1}
              <PillGroup
                size="sm"
                options={param.options}
                bind:currentUid={$selectedParams[param.uid]}
              />
            {:else}
              <span class="text-sm">{param.options[0].label}</span>
            {/if}
          </div>
        </div>
      {/each}
    </div>
    <div class="bg-background-weaker text-center py-3">
      <a href={url} class="text-theme-base font-bold" download>Download data</a>
    </div>
  </PopoverButton>
{:else}
  <a href={url} class="text-theme-base font-bold text-sm flex" download
    >Download data</a
  >
{/if}
