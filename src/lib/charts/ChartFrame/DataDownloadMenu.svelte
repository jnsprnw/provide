<script>
  import PillGroup from '$lib/controls/PillGroup/PillGroup.svelte';
  import PopoverButton from '$lib/controls/PopoverButton/PopoverButton.svelte';
  import { stringify } from 'qs';
  import { writable } from 'svelte/store';

  export let params;
  export let options = [];
  export let endpoint;

  $: selectedParams = writable(
    options.reduce(
      (memo, param) => ({
        ...memo,
        [param.uid]: param.options[0].uid,
      }),
      {}
    )
  );

  $: queryParameters = { ...params, ...$selectedParams };
  $: query = stringify(queryParameters);
  $: url = new URL(`${import.meta.env.VITE_DATA_API_URL}/${endpoint}/?${query}`);

  $: maxVersions = options.reduce((memo, param) => param.options.length * memo, 1);
</script>

{#if maxVersions > 1}
  <PopoverButton label="Download data">
    <div class="max-w-xs px-3 py-3 flex gap-y-4 flex-col">
      <div class="flex gap-y-2 flex-col">
        {#each options as param}
          <div class="grid pt-2 grid-cols-7 gap-2 border-t items-start border-contour-weakest first:border-none">
            <span class="leading-none col-span-2 text-contour-weak text-sm py-1.5">{param.label}</span>
            <div class="col-span-5 col-start-3">
              {#if param.options.length > 1}
                <PillGroup size="sm" allowWrap={true} options={param.options} bind:currentUid={$selectedParams[param.uid]} />
              {:else}
                <span class="text-sm py-1.5 leading-none px-3 bg-theme-base text-surface-base font-bold rounded-full">{param.options[0].label}</span>
              {/if}
            </div>
          </div>
        {/each}
      </div>
      <a href={url} class="text-center bg-theme-base text-white hover:bg-theme-stronger disabled:text-theme-weaker w-full py-2 text-theme-base text-sm px-3" download>Download data</a>
    </div>
  </PopoverButton>
{:else}
  <a href={url} class="text-theme-base font-bold text-sm flex hover:text-theme-stronger" download>Download data</a>
{/if}
