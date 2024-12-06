<script>
  import { browser } from '$app/environment';
  import { onDestroy } from 'svelte';
  import Carousel from 'svelte-carousel';
  import Tabs from './Tabs.svelte';

  let _stories;
  export { _stories as stories };

  let stories = _stories;
  let carousel;

  let currentIndex = 0;
  $: currentStory = stories[currentIndex];

  function manualSelect({ detail }) {
    // The stories are numbered while the tabs use the geography type
    currentIndex = stories.findIndex(({ id }) => id === detail.id);
    carousel.goTo(currentIndex);
  }

  $: images = stories.map((story) => `/img/carousel/${story.id}.png`);
  const carouselHeight = 'h-[70vh] sm:h-[75vh] min-h-[400px] md:min-h-[600px] max-h-[750px]';
</script>

<header class="{carouselHeight} grid grid-rows-6 gap-x-6 gap-y-6 grid-cols-5 overflow-hidden bg-theme-stronger relative">
  <div class="col-start-1 col-span-6 absolute w-full h-full">
    {#if browser}
      <Carousel bind:this={carousel} dots={false} arrows={false} initialPageIndex={currentIndex} autoplay={true} let:loaded on:pageChange={(e) => (currentIndex = e.detail)}>
        {#each images as src, imageIndex (src)}
          <figure aria-hidden role="presentation" class={carouselHeight}>
            {#if loaded.includes(imageIndex)}
              <img {src} alt="nature" class="object-cover h-full w-full" />
            {/if}
          </figure>
        {/each}
      </Carousel>
    {/if}
  </div>

  <div class="col-span-5 row-start-1 row-span-6 col-start-1 z-20 h-1/2 self-end bg-gradient-to-t from-theme-stronger/90" aria-hidden role="presentation" />
  <div class="col-span-5 row-start-1 row-span-6 col-start-1 z-30 flex">
    <div class="w-full max-w-6xl mx-auto mt-[10vh] xs:mt-[5vh] md:mt-[7vh] lg:mt-[10vh] px-3 sn:px-8 md:px-12 flex flex-col justify-between">
      <header class="col-start-1 col-span-6 sm:col-span-5 md:col-span-5 lg:col-span-4 text-white max-w-3xl">
        <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 leading-none drop-shadow-ladingpage">A database for global-to-local climate impacts</h1>
        <p class="text-xl drop-shadow-ladingpage">Explore data across scales and sectors</p>
      </header>
      <div class="col-span-6 md:col-span-5 sm:col-span-5 lg:col-span-4 sm:col-start-2 md:col-start-2 lg:col-start-3 py-4 px-0 md:px-6 self-end max-w-3xl">
        <Tabs on:select={manualSelect} {currentStory} {stories} />
      </div>
    </div>
  </div>
</header>
