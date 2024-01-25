<script>
  import { createTabs, melt } from '@melt-ui/svelte';
  import { cubicInOut } from 'svelte/easing';
  import { crossfade } from 'svelte/transition';
  import { createEventDispatcher } from 'svelte';
  import Em from './Em.svelte';
  const dispatch = createEventDispatcher();

  export let currentStory = {};

  $: {
    value.set(currentStory.geographyType);
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
    { id: `admin0`, title: 'Terrestrial Climate' },
    { id: `eez`, title: 'Marine Climate' },
    { id: `cities`, title: 'Urban Climate' },
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
</script>

<div use:melt={$root} class="flex w-full flex-col overflow-hidden {className}">
  <div use:melt={$list} class="flex shrink-0 overflow-x-auto text-white flex-row justify-between">
    {#each triggers as triggerItem}
      <button use:melt={$trigger(triggerItem.id)} on:click={() => selectTab(triggerItem.id)} class="trigger relative py-2 text-base">
        {triggerItem.title}
        {#if $value === triggerItem.id}
          <div in:send={{ key: 'trigger' }} out:receive={{ key: 'trigger' }} class="absolute bottom-1 left-1/2 h-0.5 w-12 -translate-x-1/2 rounded-full bg-white/50" />
        {/if}
      </button>
    {/each}
  </div>
  <div use:melt={$content('admin0')} class="grow py-5 text-white text-xl">
    <p class="mb-5 leading-normal text-lg">Learn more about how climate change will impact temperatures, soil moisture and fire weather.</p>

    <p class="mb-5 leading-normal text-lg">
      We cover data for most countries in the world. Explore, for example, how the <Em>{currentStory.indicator.labelWithinSentence}</Em> in <Em>{currentStory.geography.label}</Em> will change over time
      in a <Em>{currentStory.scenarios[0].label}</Em> scenario.
    </p>
  </div>
  <div use:melt={$content('eez')} class="grow py-5 text-white">
    <p class="mb-5 leading-normal text-lg">Learn more about how climate change will impact the habitability of the oceans for ecosystems.</p>

    <p class="mb-5 leading-normal text-lg">
      We cover data for most countries with access to the sea in the world. Explore, for example, how the <Em>{currentStory.indicator.labelWithinSentence}</Em> will change over time in the Exclusive Economic
      Zone of <Em>{currentStory.geography.label}</Em> in a <Em>{currentStory.scenarios[0].label}</Em> scenario.
    </p>
  </div>
  <div use:melt={$content('cities')} class="grow py-5 text-white">
    <p class="mb-5 leading-normal text-lg">Learn more about how climate change will impact heat stress in cities.</p>

    <p class="mb-5 leading-normal text-lg">
      We cover data for 140 cities around the world. Explore, for example, how <Em>{currentStory.indicator.labelWithinSentence}</Em> will change over time in <Em>{currentStory.geography.label}</Em> in
      a <Em>{currentStory.scenarios[0].label}</Em> scenario.
    </p>
  </div>
</div>
