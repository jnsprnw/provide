<script>
  import Menu from '$lib/controls/Menu/Menu.svelte';
  import Template from '$lib/helper/Template.svelte';
  import InfoButton from './InfoButton.svelte';
  import { URL } from '$stores/state.js';

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

<div class="mb-4">
  <h3 class="font-bold text-2xl mb-3">
    <Template template={title} data={templateProps} />
  </h3>
  <p class="max-w-xl">
    <Template template={description} data={templateProps} />
  </p>

  <slot name="controls" />
</div>
<slot />
<div class="flex justify-end gap-4">
  <InfoButton label="About the data" items={chartInfo} />
  <Menu label="Download" options={downloadOptions} />
</div>
