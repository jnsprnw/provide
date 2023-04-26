<script>
  import Tagline from '$lib/helper/Tagline.svelte';
</script>

<header class="text-center flex justify-center flex-col max-w-4xl mx-auto my-24">
  <span class="font-bold text-lg mb-6">How to start?</span>
  <p class="text-3xl leading-normal">
    The <strong>climate risk dashboard</strong> allows you to explore future impacts from climate
    change as the world warms. Start by picking a mode.
  </p>
</header>
<div class="grid grid-cols-2 gap-x-12 mb-24">
  <section class="p-6 bg-background-weaker">
    <div class="flex flex-col gap-y-2">
      <Tagline>Impacts</Tagline>
      <span class="block text-2xl font-bold"
        >Pick a geography, select one or several scenarios, and explore
        corresponding impacts</span
      >
    </div>
    <figure class="container">
      <img src="/img/impacts.png" />
    </figure>
    <a class="btn btn--big" href="/explore/impacts">Explore</a>
  </section>
  <section class="p-6 bg-background-weaker">
    <div class="flex flex-col gap-y-2">
      <Tagline>Emission scenarios</Tagline>
      <span class="text-2xl font-bold"
        >Select a threshold for a climate impact, explore scenarios under which
        the threshold won't be exceeded
      </span>
    </div>
    <figure class="container">
      <img src="/img/emission-scenarios.png" />
    </figure>
    <span class="btn btn--big" aria-disabled="true">In development</span>
  </section>
</div>
