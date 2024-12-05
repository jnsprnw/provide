<script lang="ts">
  import { createTabs, melt, type CreateTabsProps } from '@melt-ui/svelte';
  import { cubicInOut } from 'svelte/easing';
  import { crossfade } from 'svelte/transition';
  import { createEventDispatcher } from 'svelte';
  import { sortBy } from 'lodash-es';
  import { PATH_ADAPTATION } from '$config';
  import Em from './Em.svelte';
  import Link from './Link.svelte';
  const dispatch = createEventDispatcher();

  export let stories;
  export let currentStory = {};

  $: {
    value.set(currentStory.id);
  }

  const tabChange: CreateTabsProps['onValueChange'] = ({ next }) => {
    dispatch('select', {
      id: next,
    });
    return next;
  };

  const {
    elements: { root, list, content, trigger },
    states: { value },
  } = createTabs({
    onValueChange: tabChange,
  });

  let className = '';
  export { className as class };

  const [send, receive] = crossfade({
    duration: 250,
    easing: cubicInOut,
  });

  const case_class = 'py-0 text-base rounded-full text-theme-base px-3 py-1';

  const case_active_class = 'bg-white';
  const case_inactive_class = 'bg-white/90';

  const default_class = 'text-lg py-2';

  const active_class = 'text-white';
  const inactive_class = 'text-white/80 hover:text-white';
</script>

<div use:melt={$root} class="flex w-full flex-col overflow-hidden {className}">
  <div use:melt={$list} class="flex shrink-0 gap-x-4 overflow-x-auto text-white flex-row items-center justify-between">
    {#each sortBy(stories, 'order') as triggerItem}
      {@const isAdaptation = triggerItem.id.startsWith('adaptation')}
      {@const isActive = $value === triggerItem.id}
      <button
        use:melt={$trigger(triggerItem.id)}
        class="trigger transition-colors relative leading-tight font-bold {isActive
          ? isAdaptation
            ? case_active_class
            : active_class
          : isAdaptation
            ? case_inactive_class
            : inactive_class} {isAdaptation ? case_class : default_class}"
      >
        <span class:drop-shadow-ladingpage={!isAdaptation} class="transition-colors">{triggerItem.title}</span>
        {#if $value === triggerItem.id}
          <div in:send={{ key: 'trigger' }} out:receive={{ key: 'trigger' }} class="absolute bottom-1 left-1/2 h-[1px] w-12 -translate-x-1/2 rounded-full bg-white/70" />
        {/if}
      </button>
    {/each}
  </div>
  <div use:melt={$content('explore-admin0')} class="grow pt-5 text-white text-xl">
    <p class="mb-5 leading-tight text-base drop-shadow-ladingpage">
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
    <p class="mb-5 leading-tight text-base drop-shadow-ladingpage">
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
    <p class="mb-5 leading-tight text-base drop-shadow-ladingpage">Learn more about how climate change will impact heat stress in cities. We cover data for 140 cities around the world.</p>

    <Link href={currentStory.url}>
      <span>
        Explore, for example, how <Em>{currentStory.indicator.labelWithinSentence}</Em> will change over time in <Em>{currentStory.geography.label}</Em> in a <Em>{currentStory.scenarios[0].label}</Em>
        scenario.
      </span>
    </Link>
  </div>
  <div use:melt={$content('adaptation-cities')} class="grow pt-5 text-white">
    <p class="mb-5 leading-tight text-base drop-shadow-ladingpage">Real world examples of how to use the Dashboard in adaptation projects</p>

    <Link href={`/${PATH_ADAPTATION}`}>
      <span> General guidance on how to use climate information for robust adaptation planning </span>
    </Link>
  </div>
</div>
