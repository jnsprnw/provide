<script>
  import { page } from '$app/stores';
  import MainControls from './MainControls/MainControls.svelte';
  import { urlToState } from '$utils/url';
  import BigTabs from '$lib/helper/BigTabs.svelte';

  $: urlToState($page.url);

  const tabs = [
    {
      href: '/explore/impacts',
      label: 'Impacts',
      description: 'Select scenarios and explore impacts',
    },
    {
      href: '#',
      label: 'Emission scenarios',
      description: 'Set an impact threshold and explore scenarios',
      disabled: true,
    },
  ];
</script>

<nav class="bg-background-weaker">
  <div class="mx-auto max-w-7xl px-6 pt-8">
    <MainControls />
    <BigTabs {tabs} />
  </div>
</nav>

<slot />
