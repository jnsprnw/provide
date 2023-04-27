<script>
  import Tagline from '$lib/helper/Tagline.svelte';
</script>

<header class="border-b border-b-foreground-weaker pb-14 justify-center flex-col max-w-4xl mx-auto my-14 gap-x-12 grid md:grid-cols-2">
  <div>
    <span class="block font-bold text-xl mb-2">How to start?</span>
    <p class="text-base leading-normal">
      The <strong>climate risk dashboard</strong> allows you to explore future impacts from climate
      change as the world warms. Start by picking a mode.
    </p>
  </div>
</header>
<div class="grid md:grid-cols-2 gap-y-12 gap-x-12 mb-24 max-w-4xl mx-auto">
  <section class="grid grid-rows-[1fr_auto_auto]">
    <div class="flex flex-col gap-y-2">
      <Tagline>Impacts</Tagline>
      <span class="block text-base font-bold">
        Pick a geography, select one or several scenarios, and explore corresponding impacts
      </span>
    </div>
    <figure class="bg-background-weaker p-4 my-4">
      <img src="/img/impacts.png" alt="One scenario and many resulting impacts" />
    </figure>
    <a class="bg-theme-base text-white p-3 text-center block" href="/explore/impacts">Explore</a>
  </section>
  <section class="opacity-50 grid grid-rows-[1fr_auto_auto]">
    <div class="flex flex-col gap-y-2">
      <Tagline>Emission scenarios</Tagline>
      <span class="block text-base font-bold">
        Select a threshold for a climate impact, explore scenarios under which
        the threshold won't be exceeded
      </span>
    </div>
    <figure class="bg-background-weaker p-4 my-4">
      <img src="/img/emission-scenarios.png" alt="Many compatible scenarios and one impact threshold" />
    </figure>
    <span class="bg-theme-weaker text-white p-3 text-center block" aria-disabled="true">In development</span>
  </section>
</div>
