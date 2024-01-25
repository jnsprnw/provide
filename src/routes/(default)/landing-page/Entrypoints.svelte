<script>
  import { PATH_IMPACT, PATH_AVOID } from '$config';
  import Entrypoint from './Entrypoint.svelte';
</script>

<header class="py-20 justify-center flex-col max-w-7xl mx-auto gap-x-12 grid md:grid-cols-2">
  <div>
    <span class="block font-bold text-3xl mb-3">Explore risks of climate overshoots across scales</span>
    <p class="leading-normal text-xl mb-5">The PROVIDE Climate risk dashboard allows you to explore future impacts and (un)avoidable risks from climate change from cities to the global scale.</p>
    <p class="leading-normal text-xl">
      It allows you to explore future impacts and (un)avoidable risks from climate change under scenarios of global warming. Alternatively, start local and explore what action is needed on climate to
      avoid a specific climate impact threshold.
    </p>
  </div>
</header>
<div class="grid md:grid-cols-2 gap-y-6 gap-x-24 max-w-7xl mx-auto">
  <Entrypoint
    path={PATH_IMPACT}
    title="Explore future impacts"
    audience={['Climate scientists (terrestrial, marine and urban)', 'Experts working on climate risks', 'Climate litigation experts', 'Science communicators', 'National policy makers']}
  >
    <div slot="intro">
      <p class="mb-5">
        This mode allows you to explore different climate futures and how they will affect the environment and people.: Choose your geography type from cities, countries and marine environments, and
      </p>
      <p>then the impact drivers/indicator to explore how future climate impacts will develop under various emission scenarios.</p>
    </div>
    <img slot="image" src="/img/impacts.png" alt="One scenario and many resulting impacts" />
  </Entrypoint>
  <Entrypoint path={PATH_AVOID} title="Avoid future impacts" audience={['Urban planners, policy makers and climate adaptation experts', 'Science communicators', 'Experts working on climate risks']}>
    <div slot="intro">
      <p class="mb-5">In this mode, you can explore how we can avoid undesirable levels of climate impacts in urban areas.</p>
      <p>
        You can choose a city and an urban heat indicator. Then, choose the level of impact, for example, a number of heatwave days per year, and explore when your chosen amount would be reached. You
        can then explore under which scenario, and what climate action pathway, might help your city avoid this climate impact level.
      </p>
    </div>
    <img slot="image" src="/img/emission-scenarios.png" alt="One scenario and many resulting impacts" />
  </Entrypoint>
</div>
<div class="py-20 justify-center flex-col max-w-7xl mx-auto gap-x-12 grid md:grid-cols-2">
  <div>
    <span class="block font-bold text-3xl mb-3">The PROVIDE project</span>
    <p class="leading-normal text-xl">
      The PROVIDE project is a Horizon Europe funded consortium of scientists and policy experts, working to develop new, faster ways to project climate impacts, and ultimately, provide information on
      how we can avoid them. The project, aside from developing new scientific methods, aims to provide more clarity on how climate impacts might develop after peak temperatures, in so-called
      ‘overshoot scenarios’, and if they can be reversed.
    </p>
  </div>
</div>
