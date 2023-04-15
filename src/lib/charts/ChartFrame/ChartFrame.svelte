<script>
  import Menu from '$lib/controls/Menu/Menu.svelte';
  import Template from '$lib/helper/Template.svelte';
  import InfoButton from './InfoButton.svelte';
  import { URL, IS_EMBEDED } from '$stores/state.js';

  export let title;
  export let description;
  export let templateProps;
  export let chartInfo = [];

  $: downloadOptions = [
    { options: [{ label: 'Download data as CSV', href: '#' }] },
    {
      options: [
        { label: 'Download graph as PNG', href: `http://localhost:5173/download/impact-time/?${$URL}&format=png` },
        { label: 'Download graph as PDF', href: `http://localhost:5173/download/impact-time/?${$URL}&format=pdf` },
      ],
    },
  ];
</script>

<figure class:aspect-video={$IS_EMBEDED} style:width={$IS_EMBEDED ? '1200px' : undefined}>
  <header class="mb-4">
    <h3 class="font-bold text-2xl mb-3">
      <Template template={title} data={templateProps} />
    </h3>
    <p class="max-w-xl">
      <Template template={description} data={templateProps} />
    </p>

    <slot name="controls" />
  </header>
  <slot />
  {#if !$IS_EMBEDED}
  <figcaption class="flex justify-end gap-4">
    <InfoButton label="About the data" items={chartInfo} />
    <Menu label="Download" options={downloadOptions} />
  </figcaption>
  {:else}
  <figcaption class="mt-4">
    <span class="font-bold">Hier könnte ihre Werbung stehen.</span>
  </figcaption>
  {/if}
</figure>