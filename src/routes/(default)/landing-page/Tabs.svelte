<script>
  import { createTabs, melt } from '@melt-ui/svelte';
  import { cubicInOut } from 'svelte/easing';
  import { crossfade } from 'svelte/transition';
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  const ID_PREFIX = 'tab-';

  export let currentIndex = 1;

  $: {
    value.set(`${ID_PREFIX}${currentIndex + 1}`);
  }

  const {
    elements: { root, list, content, trigger },
    states: { value },
  } = createTabs({
    defaultValue: `${ID_PREFIX}1`,
  });

  let className = '';
  export { className as class };

  const triggers = [
    { id: `${ID_PREFIX}1`, title: 'Terrestrial Climate' },
    { id: `${ID_PREFIX}2`, title: 'Marine Climate' },
    { id: `${ID_PREFIX}3`, title: 'Urban Climate' },
  ];

  const [send, receive] = crossfade({
    duration: 250,
    easing: cubicInOut,
  });

  function selectTab(id) {
    dispatch('select', {
      id: parseInt(id.replace(ID_PREFIX, '')) - 1,
    });
  }
</script>

<div use:melt={$root} class="flex w-full flex-col overflow-hidden {className}">
  <div use:melt={$list} class="flex shrink-0 overflow-x-auto text-white flex-row justify-between">
    {#each triggers as triggerItem}
      <button use:melt={$trigger(triggerItem.id)} on:click={() => selectTab(triggerItem.id)} class="trigger relative py-2 text-xl">
        {triggerItem.title}
        {#if $value === triggerItem.id}
          <div in:send={{ key: 'trigger' }} out:receive={{ key: 'trigger' }} class="absolute bottom-1 left-1/2 h-0.5 w-12 -translate-x-1/2 rounded-full bg-white/50" />
        {/if}
      </button>
    {/each}
  </div>
  <div use:melt={$content('tab-1')} class="grow py-5 text-white">
    <p class="mb-5 leading-normal">Learn more about how climate change will impact temperatures, soil moisture and fire weather.</p>
    <p class="mb-5 leading-normal">We cover data for most countries in the world. Explore, for example, how the fire season in Italy will change over time in a Delayed climate action scenario.</p>
  </div>
  <div use:melt={$content('tab-2')} class="grow py-5 text-white">
    <p class="mb-5 leading-normal">Learn more about how climate change will impact the habitability of the oceans for ecosystems.</p>
    <p class="mb-5 leading-normal">
      We cover data for most countries with access to the sea in the world. Explore, for example, how the oxygen content dissolved in the sea water will change over time in the Exclusive Economic Zone
      of Brasil in a 2020 climate targets scenario.
    </p>
  </div>
  <div use:melt={$content('tab-3')} class="grow py-5 text-white">
    <p class="mb-5 leading-normal">Learn more about how climate change will impact heat stress in cities.</p>
    <p class="mb-5 leading-normal">
      We cover data for 140 cities around the world. Explore, for example, how days with extreme heat stress will change over time in Barcelona in a 2020 climate policies scenario.
    </p>
  </div>
</div>
