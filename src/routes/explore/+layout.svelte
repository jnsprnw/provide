<script>
  import { page } from '$app/stores';
  import MainControls from './MainControls/MainControls.svelte';
  import {
    SECTORS,
    INDICATORS,
    GEOGRAPHY_TYPES,
    GEOGRAPHIES,
    SCENARIOS,
    INDICATOR_PARAMETERS,
    UNITS,
  } from '$stores/meta.js';
  import { urlToState } from '$utils/url';
  import BigTabs from '$lib/helper/BigTabs.svelte';

  export let data;

  const { meta } = data;

  GEOGRAPHY_TYPES.set(meta.geographyTypes);
  GEOGRAPHIES.set(meta);
  INDICATORS.set(meta);
  SECTORS.set(meta.sectors);
  SCENARIOS.set(meta.scenarios);
  INDICATOR_PARAMETERS.set(meta.indicatorParameters);
  UNITS.set(meta.units);

  $: urlToState($page.url);

  const tabs = [
    {
      href: '/explore/impacts',
      label: 'Impacts',
      description: 'Select scenarios and explore impacts',
    },
    {
      href: '/explore/scenarios',
      label: 'Emission Scenarios',
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
