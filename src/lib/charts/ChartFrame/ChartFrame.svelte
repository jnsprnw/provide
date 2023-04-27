<script>
  import Template from '$lib/helper/Template.svelte';
  import InfoButton from './InfoButton.svelte';
  import { IS_EMBEDED } from '$stores/state.js';
  import DataDownloadMenu from './DataDownloadMenu.svelte';
  import DownloadGraphMenu from './DownloadGraphMenu.svelte';
  import Tagline from '$lib/helper/Tagline.svelte';

  export let tagline;
  export let title;
  export let description;
  export let downloadBaseParams;
  export let downloadParams;
  export let chartUid;
  export let templateProps;
  export let chartInfo = [];
  export let isLoading;
</script>

<figure
  class:aspect-video={$IS_EMBEDED}
  style:width={$IS_EMBEDED ? '1200px' : undefined}
>
  <header class="mb-4 max-w-2xl">
    <Tagline color="text-foreground-weak">{tagline}</Tagline>
    <h3 class="font-bold text-2xl mb-3">
      <Template template={title} data={templateProps} />
    </h3>
    <p class="leading-relaxed mb-4">
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
  {#if !$IS_EMBEDED}
    <figcaption class="flex justify-end items-center gap-4 mt-2">
      <InfoButton label="About the data" items={chartInfo} />
      <DownloadGraphMenu embedUid={chartUid} graphParams={downloadBaseParams} />
      {#if downloadBaseParams}
        <DataDownloadMenu
          endpoint={chartUid}
          params={downloadParams}
          baseParams={downloadBaseParams}
        />
      {/if}
      <!-- <Menu label="Download" options={downloadOptions} /> -->
    </figcaption>
  {:else}
    <figcaption class="mt-4">
      <span class="font-bold">Hier könnte ihre Werbung stehen.</span>
    </figcaption>
  {/if}
</figure>
