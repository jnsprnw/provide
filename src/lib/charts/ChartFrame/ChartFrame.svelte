<script>
  import Template from '$lib/helper/Template.svelte';
  import InfoButton from './InfoButton.svelte';
  import { IS_EMBEDED } from '$stores/state.js';
  import DataDownloadMenu from './DataDownloadMenu.svelte';
  import DownloadGraphMenu from './DownloadGraphMenu.svelte';
  import Tagline from '$lib/helper/Tagline.svelte';
  import { IS_STATIC } from '$stores/state';
  import InfoList from './InfoList.svelte';

  export let tagline;
  export let title;
  export let description;
  export let dataDownloadParams;
  export let dataDownloadOptions;
  export let graphDownloadParams;
  export let graphDownloadSettings;
  export let chartUid;
  export let templateProps;
  export let chartInfo = [];
  export let isLoading;
</script>

<figure>
  <header class="mb-4 max-w-2xl">
    {#if tagline}<Tagline color="text-foreground-weak">{tagline}</Tagline>{/if}
    <h3 class="font-bold text-2xl mb-3">
      <Template template={title} data={templateProps} />
    </h3>
    <p class="leading-relaxed mb-6">
      <Template template={description} data={templateProps} />
    </p>
    <slot name="controls" />
  </header>
  <div
    class:opacity-40={isLoading}
    class:animate-pulse={isLoading}
    class:grayscale-80={isLoading}
  >
    <slot />
  </div>
  {#if !$IS_STATIC}
    <figcaption class="flex justify-end items-center gap-4 mt-2 mb-2">
      <InfoButton label="About the data" items={chartInfo} />
      <DownloadGraphMenu
        embedUid={chartUid}
        {...graphDownloadSettings}
        graphParams={graphDownloadParams}
      />
      <DataDownloadMenu
        endpoint={chartUid}
        options={dataDownloadOptions}
        params={dataDownloadParams}
      />
    </figcaption>
  {:else}
    <InfoList items={chartInfo} />
  {/if}
</figure>
