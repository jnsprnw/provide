<script>
  import { PATH_IMPACT, PATH_AVOID } from '$config';
  import EntrypointExplore from './EntrypointExplore.svelte';
  import EntrypointAdaptation from './EntrypointAdaptation.svelte';
  export let caseStudies;

  export let videos = [];
</script>

<header class="py-20 justify-center flex-col max-w-7xl mx-auto gap-x-4 lg:gap-x-24 grid lg:grid-cols-2">
  <div>
    <span class="block font-bold text-3xl mb-3">Explore risks of climate overshoots</span>
    <p class="leading-normal text-base sm:text-lg mb-5">
      The PROVIDE Climate risk dashboard allows you to explore future climate change impacts and (un)avoidable risks from cities to the global scale.
    </p>
    <p class="leading-normal text-base sm:text-lg">Alternatively, start local and explore what action is needed on climate to avoid climate impacts in your city.</p>
  </div>
</header>
<div class="grid md:grid-cols-2 gap-y-6 gap-x-4 lg:gap-x-24 lg:gap-y-24 max-w-7xl mx-auto">
  <EntrypointExplore
    path={PATH_IMPACT}
    title="Explore future impacts"
    audience={['Climate scientists (terrestrial, marine and urban)', 'Experts working on climate risks', 'Climate litigation experts', 'Science communicators', 'National policy makers']}
  >
    <div slot="intro">
      <p class="mb-5">This mode allows you to explore different climate futures and how they will affect the environment and people.</p>
      <p>Choose your geography type and choose an indicator to explore how future climate impacts will develop under various emission scenarios.</p>
    </div>
    <img slot="image" src="/img/impacts.png" alt="One scenario and many resulting impacts" />
  </EntrypointExplore>
  <EntrypointExplore
    path={PATH_AVOID}
    title="Avoiding future impacts"
    audience={['Urban planners, policy makers and climate adaptation experts', 'Science communicators', 'Experts working on climate risks']}
  >
    <div slot="intro">
      <p class="mb-5">In this mode you can explore how we can avoid reaching undesirable climate impact levels in urban areas.</p>
      <p>
        You can choose a city, an urban heat indicator and the level of impact, and see when your selected level of impact will be exceeded. You can then explore which climate action pathway might
        help your city avoid this impact level.
      </p>
    </div>
    <img slot="image" src="/img/emission-scenarios.png" alt="One scenario and many resulting impacts" />
  </EntrypointExplore>
  <EntrypointAdaptation class="md:col-span-2" path={PATH_AVOID} title="Adaptation: Case studies" {caseStudies}>
    <div slot="intro">
      <p class="mb-5">In this module, we guide you through some case studies.</p>
      <p>With our models, we can explore how we can adapt to reaching undesirable climate impact levels in urban areas.</p>
    </div>
  </EntrypointAdaptation>
</div>
<div class="py-20 justify-center flex-col max-w-7xl mx-auto gap-x-4 lg:gap-x-24 grid lg:grid-cols-2">
  <div>
    <span class="block font-bold text-3xl mb-3">The PROVIDE project</span>
    <p class="leading-normal text-base sm:text-lg">
      The PROVIDE project is a Horizon Europe funded consortium of scientists and policy experts, working to develop new, faster ways to project climate impacts, and ultimately, provide information on
      how we can avoid them. The project, aside from developing new scientific methods, aims to provide more clarity on how climate impacts might develop after peak temperatures, in so-called
      ‘overshoot scenarios’, and if they can be reversed.
    </p>
  </div>
</div>
{#if videos.length}
  <div class="py-20 justify-center flex-col max-w-7xl mx-auto gap-x-4 lg:gap-x-24 grid lg:grid-cols-2">
    <div>
      <span class="block font-bold text-3xl mb-3">Want to learn more about the Climate risk dashboard?</span>
      <p class="leading-normal text-base sm:text-lg">Watch the tutorial or interviews with the tool’s developers to learn how to use the tool and the scientific concepts behind the tool.</p>
    </div>
    <div class="grid gap-8 col-span-2 mt-4 md:grid-cols-2">
      {#each videos as { title, video }}
        <iframe
          class="w-full aspect-video"
          src={`https://www.youtube.com/embed/${video}?modestbranding=1&rel=0`}
          {title}
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
      {/each}
    </div>
  </div>
{/if}
