<script>
  import { page } from '$app/stores';
  import { checkCurrentLink } from '$utils/url.js';
  import MainControls from './MainControls/MainControls.svelte';
  import { urlToState } from '$utils/url';
  import BigTabs from '$lib/helper/BigTabs.svelte';
  import PageIntro from '$lib/site/PageIntro.svelte';
  import ShareLink from './ShareLink/ShareLink.svelte';

  import { LABEL_FUTURE_IMPACTS, LABEL_AVOID_IMPACTS, GEOGRAPHY_TYPES_IN_AVOIDING_IMPACTS, PATH_AVOID, PATH_IMPACT, PATH_EXPLORE, PATH_DOCUMENTATION } from '$config';
  import { CURRENT_GEOGRAPHY } from '$stores/state.js';

  $: urlToState($page.url);

  $: ({ geographyType } = $CURRENT_GEOGRAPHY ?? {});

  $: isAvoidingImpactsAvailable = !geographyType || GEOGRAPHY_TYPES_IN_AVOIDING_IMPACTS.includes(geographyType);

  $: tabs = [
    {
      href: `/${PATH_EXPLORE}/${PATH_IMPACT}`,
      label: LABEL_FUTURE_IMPACTS,
      title: 'Future impacts',
      description: 'Select scenarios and explore impacts',
      intro:
        'Explore how different levels of climate action will lead to different climate impacts for countries, cities, and more. See where risk escalates and under what conditions impacts could be avoided.',
    },
    {
      href: `/${PATH_EXPLORE}/${PATH_AVOID}`,
      label: LABEL_AVOID_IMPACTS,
      title: 'Avoiding future impacts in cities',
      description: 'Set an impact level and explore scenarios',
      disabled: !isAvoidingImpactsAvailable,
      tooltip: !isAvoidingImpactsAvailable ? 'This module is only available for specific geographies' : undefined,
      intro: 'Explore which scenarios minimise the risk from certain impacts in cities and their rural surroundings. Understand the likelihood of exceeding the impact levels you would like to avoid.',
    },
  ];

  $: currentTab = tabs.find(({ href }) => checkCurrentLink(href, $page));
  $: currentTitle = currentTab?.title;
  $: currentIntro = currentTab?.intro;

  $: console.log(import.meta.env.VITE_MAPBOX_STYLE_SATELLITE, import.meta.env.VITE_MAPBOX_STYLE_GLOBE, import.meta.env.VITE_MAPBOX_STYLE_LIGHT, import.meta.env.VITE_MAPBOX_STYLE_STUDY_LOCATIONS);
</script>

<PageIntro>
  <MainControls />
  <BigTabs {tabs} />
  {#if currentTitle && currentIntro}
    <div class="flex flex-col gap-y-1">
      <h1 class="text-3xl font-bold">{currentTitle}</h1>
      <p class="text-lg mt-3.5 max-w-xl mb-8">{currentIntro}</p>
      <div class="flex justify-between items-center">
        <a href={`/${PATH_DOCUMENTATION}`} class="text-sm font-bold text-theme-base hover:underline">Learn more about the methodology</a>
        <ShareLink />
      </div>
    </div>
  {/if}
</PageIntro>

<slot />
