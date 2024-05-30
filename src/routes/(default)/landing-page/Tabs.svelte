<script>
  import { createTabs, melt } from '@melt-ui/svelte';
  import { cubicInOut } from 'svelte/easing';
  import { crossfade } from 'svelte/transition';
  import { createEventDispatcher } from 'svelte';
  import { PATH_ADAPTATION } from '$config';
  import Em from './Em.svelte';
  import Link from './Link.svelte';
  const dispatch = createEventDispatcher();

  export let currentStory = {};

  $: {
    value.set(currentStory.id);
  }

  const {
    elements: { root, list, content, trigger },
    states: { value },
  } = createTabs({
    defaultValue: 'admin0',
  });

  let className = '';
  export { className as class };

  const triggers = [
    { id: `explore-admin0`, title: 'Terrestrial Climate' },
    { id: `explore-eez`, title: 'Marine Climate' },
    { id: `explore-cities`, title: 'Urban Climate' },
    { id: `adaptation-cities`, title: 'Adaptation case studies' },
  ];

  const [send, receive] = crossfade({
    duration: 250,
    easing: cubicInOut,
  });

  function selectTab(id) {
    dispatch('select', {
      id,
    });
  }

  // const CLASSES_CASE = 'bg-white rounded-lg text-black px-3 py-2';

  const active_class = 'text-white';
  const inactive_class = 'text-white/80';
</script>

<div use:melt={$root} class="flex w-full flex-col overflow-hidden {className}">
  <div use:melt={$list} class="flex shrink-0 overflow-x-auto text-white flex-row justify-between">
    {#each triggers as triggerItem}
      <button use:melt={$trigger(triggerItem.id)} on:click={() => selectTab(triggerItem.id)} class="trigger relative py-2 text-lg leading-tight font-bold">
        <span class="drop-shadow-lg transition-colors hover:text-white {$value === triggerItem.id ? active_class : inactive_class}">{triggerItem.title}</span>
        {#if $value === triggerItem.id}
          <div in:send={{ key: 'trigger' }} out:receive={{ key: 'trigger' }} class="absolute bottom-1 left-1/2 h-[1px] w-12 -translate-x-1/2 rounded-full bg-white/70" />
        {/if}
      </button>
    {/each}
  </div>
  <div use:melt={$content('explore-admin0')} class="grow pt-5 text-white text-xl">
    <p class="mb-5 leading-tight text-base drop-shadow-lg">
      Learn more about how climate change will impact temperatures, soil moisture and fire weather. We cover data for most countries in the world.
    </p>
    <Link href={currentStory.url}>
      <span
        >Explore, for example, how the <Em>{currentStory.indicator.labelWithinSentence}</Em> in <Em>{currentStory.geography.label}</Em> will change over time in a <Em
          >{currentStory.scenarios[0].label}</Em
        > scenario.</span
      >
    </Link>
  </div>
  <div use:melt={$content('explore-eez')} class="grow pt-5 text-white">
    <p class="mb-5 leading-tight text-base">
      Learn more about how climate change will impact the habitability of the oceans for ecosystems. We cover data for most countries with access to the sea in the world.
    </p>

    <Link href={currentStory.url}>
      <span
        >Explore, for example, how the <Em>{currentStory.indicator.labelWithinSentence}</Em> will change over time in the Exclusive Economic Zone of <Em>{currentStory.geography.label}</Em> in a <Em
          >{currentStory.scenarios[0].label}</Em
        > scenario.</span
      >
    </Link>
  </div>
  <div use:melt={$content('explore-cities')} class="grow pt-5 text-white">
    <p class="mb-5 leading-tight text-base">Learn more about how climate change will impact heat stress in cities. We cover data for 140 cities around the world.</p>

    <Link href={currentStory.url}>
      <span>
        Explore, for example, how <Em>{currentStory.indicator.labelWithinSentence}</Em> will change over time in <Em>{currentStory.geography.label}</Em> in a <Em>{currentStory.scenarios[0].label}</Em>
        scenario.
      </span>
    </Link>
  </div>
  <div use:melt={$content('adaptation-cities')} class="grow pt-5 text-white">
    <p class="mb-5 leading-tight text-base">Real world examples of how to use the Dashboard in adaptation projects</p>

    <Link href={`/${PATH_ADAPTATION}`}>
      <span> General guidance on how to use climate information for robust adaptation planning </span>
    </Link>
  </div>
</div>
