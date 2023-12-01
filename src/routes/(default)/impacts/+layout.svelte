<script>
  import { page } from '$app/stores';
  import MainControls from './MainControls/MainControls.svelte';
  import { urlToState } from '$utils/url';
  import BigTabs from '$lib/helper/BigTabs.svelte';
  import PageIntro from '$lib/site/PageIntro.svelte';
  import ShareLink from './ShareLink/ShareLink.svelte';

  import { GEOGRAPHY_TYPES_IN_AVOIDING_IMPACTS, PATH_AVOID, PATH_IMPACT, PATH_EXPLORE } from '$config';
  import { CURRENT_GEOGRAPHY } from '$stores/state.js';

  $: urlToState($page.url);

  $: ({ geographyType } = $CURRENT_GEOGRAPHY ?? {});

  $: isAvoidingImpactsAvailable = !geographyType || GEOGRAPHY_TYPES_IN_AVOIDING_IMPACTS.includes(geographyType);

  $: tabs = [
    {
      href: `/${PATH_EXPLORE}/${PATH_IMPACT}`,
      label: 'Future impacts',
      description: 'Select scenarios and explore impacts',
      intro:
        'Explore how different levels of climate action will lead to different climate impacts for countries, cities, and more. See where risk escalates and under what conditions impacts could be avoided.',
    },
    {
      href: `/${PATH_EXPLORE}/${PATH_AVOID}`,
      label: 'Avoiding impacts',
      description: 'Set an impact threshold and explore scenarios',
      disabled: !isAvoidingImpactsAvailable,
      tooltip: !isAvoidingImpactsAvailable ? 'This module is only available for specific geographies' : undefined,
      intro:
        'Explore how different levels of climate action will lead to different climate impacts for countries, cities, and more. See where risk escalates and under what conditions impacts could be avoided.',
    },
  ];

  $: currentTab = tabs.find(({ href }) => href === $page.url.pathname); // TODO: Find a more elegant/robust version
  $: currentTitle = currentTab?.label;
  $: currentIntro = currentTab?.intro;
</script>

<PageIntro>
  <MainControls />
  <BigTabs {tabs} />
  {#if currentTitle && currentIntro}
    <div class="flex flex-col gap-y-1">
      <h1 class="text-3xl font-bold">{currentTitle}</h1>
      <p class="mt-3.5 max-w-xl">{currentIntro}</p>
      <div class="flex justify-between">
        <span>Learn more about X</span>
        <ShareLink />
      </div>
    </div>
  {/if}
</PageIntro>

<slot />
